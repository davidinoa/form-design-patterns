const homeView = () => {
  document.body.innerHTML = /*html*/ `
    <main id="home">
      <h1 class="text-4xl font-bold">Home</h1>
      <p class="text-xl">Welcome to Form Design Patterns!</p>
      <nav class="grid gap-4">
        <a href="/registration-form" data-link class="text-blue-500">Registration form</a>
        <a href="/checkout-form" data-link class="text-blue-500">Checkout form</a>
      </nav>
    </main>
  `
}

export default homeView
