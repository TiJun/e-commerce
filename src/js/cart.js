const cartButton = document.querySelector('.header__cart-button')
const cartBackButton = document.querySelector('.cart__button')
const cart = document.querySelector('.cart')
const showCart = () => {
	cart.classList.add('cart-active')
}
const hideCart = () => {
	cart.classList.remove('cart-active')
}
cartButton.addEventListener('click', showCart)
cartBackButton.addEventListener('click', hideCart)