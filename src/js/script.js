const API_URL = 'https://dummyjson.com/products/category/smartphones'
let products
fetch(API_URL)
	.then(res => res.json())
	.then(productsRaw => {
		console.log(productsRaw.products)
		products = productsRaw.products.map(products => {
			return {
				name: products.title,
				category: products.category,
				price: products.price,
				
			}
		})
		console.log(products)
	})
const cartButton = document.querySelector('.header__cart-button')
const cartBackButton = document.querySelector('.cart__button')
const cart = document.querySelector('.cart')
const activeCart = () => {
	cart.classList.add('cart-active')
}
const hideCart = () => {
	cart.classList.remove('cart-active')
}
cartButton.addEventListener('click', activeCart)
cartBackButton.addEventListener('click', hideCart)
