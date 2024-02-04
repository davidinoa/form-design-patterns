import checkoutFormView from './pages/checkout-form/checkout-form'
import homeView from './pages/home'
import registrationFormView from './pages/registration-form/registration-form'
import Router from './router/router'
import './style.css'

const router = new Router()
router.addRoute('/', homeView)
router.addRoute('/registration-form', registrationFormView)
router.addRoute('/checkout-form', checkoutFormView)
router.resolve()

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return

    if (event.target.matches('[data-link]')) {
      event.preventDefault()
      const href = event.target.getAttribute('href')
      if (!href) return
      router.navigate(href)
    }
  })
})
