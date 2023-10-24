const cartButton = document.querySelector('.header__cart-button')
const cartBackButton = document.querySelector('.cart__button')
const productCounter = document.querySelector('.header__cart-counter')
const cart = document.querySelector('.cart')
const showCart = () => {
	cart.classList.add('cart-active')
}
const hideCart = () => {
	cart.classList.remove('cart-active')
}
cartButton.addEventListener('click', showCart)
cartBackButton.addEventListener('click', hideCart)
console.log(favoriteButtons);