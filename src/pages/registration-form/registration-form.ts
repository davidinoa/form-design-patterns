import template from './registration-form.html?raw'

class PasswordReveal {
  input: HTMLInputElement
  button: HTMLButtonElement | null = null

  constructor(input: HTMLInputElement) {
    this.input = input
    this.createButton()
  }

  createButton() {
    this.button = document.createElement('button')
    this.button.setAttribute('type', 'button')
    this.button.innerHTML = 'Show'
    this.button.classList.add('bg-black', 'text-white', 'p-2')
    this.button.addEventListener('click', this.onButtonClick.bind(this))

    this.input.parentNode?.appendChild(this.button)
  }

  onButtonClick() {
    this.input.type = this.input.type === 'password' ? 'text' : 'password'
    this.button!.innerHTML = this.input.type === 'password' ? 'Show' : 'Hide'
  }
}

type Rule = {
  method: (input: HTMLInputElement) => boolean
  message: string
}

type Validator = {
  fieldName: string
  rules: Rule[]
  field: HTMLInputElement
}

class FormValidator {
  form: HTMLFormElement
  summary: HTMLDivElement
  originalTitle = document.title
  validators: Validator[] = []

  constructor(form: HTMLFormElement, summary: HTMLDivElement) {
    this.form = form
    this.form.addEventListener('submit', this.onSubmit.bind(this))
    this.form.elements

    this.summary = summary
  }

  addValidator(fieldName: string, rules: Rule[]) {
    const field = this.form.elements.namedItem(fieldName)
    if (field instanceof HTMLInputElement) {
      this.validators.push({ fieldName, rules, field })
    }
  }

  onSubmit(event: SubmitEvent) {
    this.removeInlineErrors()
    this.hideSummary()
    this.resetPageTitle()
    if (!this.validate()) {
      event.preventDefault()
      this.updatePageTitle()
      this.showSummary()
      this.showInlineErrors()
    }
  }

  showInlineErrors() {
    throw new Error('Method not implemented.')
  }

  removeInlineErrors() {
    // Remove any existing error messages
    this.form
      .querySelectorAll('.field-error')
      .forEach((fieldError) => fieldError.remove())

    // Reset aria-invalid attributes
    this.form.querySelectorAll('[aria-invalid]').forEach((input) => {
      input.setAttribute('aria-invalid', 'false')
    })
  }

  hideSummary() {
    this.summary.classList.add('hidden')
    this.summary.removeAttribute('aria-labelledby')
  }

  resetPageTitle() {
    document.title = this.originalTitle
  }

  updatePageTitle() {
    document.title = `Error - ${this.originalTitle}`
  }

  validate() {
    return true
  }

  showSummary() {
    this.summary.innerHTML = this.getSummaryHtml()
    this.summary.classList.remove('hidden')
    this.summary.setAttribute('aria-labelledby', 'error-summary-heading')
    this.summary.focus()
  }

  getSummaryHtml() {
    return `<h2>There is a problem</h2>`
  }

  onErrorClick(event: MouseEvent) {
    event.preventDefault()
    const href = (event.target as HTMLAnchorElement).href
    const id = href.split('#')[1]
    const input = document.getElementById(id) as HTMLInputElement
    input.focus()
  }
}

const registrationFormView = () => {
  document.body.innerHTML = template
  const passwordInput = document.querySelector('#password') as HTMLInputElement
  const form = document.querySelector('form') as HTMLFormElement
  const summary = document.querySelector('#error-summary') as HTMLDivElement
  const formValidator = new FormValidator(form, summary)
  formValidator.addValidator('email', [
    {
      method: (input) => input.value.length > 0,
      message: 'Please enter a value',
    },
  ])
  formValidator.showSummary()
  new PasswordReveal(passwordInput)
  return formValidator
}

export default registrationFormView
