const API_URL = 'https://fakestoreapi.com/products'
let products
const cartButton = document.querySelector('.header__cart-button')
const cartBackButton = document.querySelector('.cart__button')
const productCounter = document.querySelector('.header__cart-counter')
const cart = document.querySelector('.cart')
let productCounterAmount = 0
productCounter.textContent = productCounterAmount
fetch(API_URL)
	.then(res => res.json())
	.then(products => products)
	.then(products => {
		products = products.map(product => {
			return {
				name: product.title,
				price: product.price,
				image: product.image,
				category: product.category,
			}
		})
		console.log(products)
		renderProducts(products)
	})
const createFavoriteElement = () => {
	const favoriteElement = document.createElement('svg')
	favoriteElement.setAttribute('class', 'favorite-icon')
	return favoriteElement
}
const productContainer = product => {
	const productContainer = document.createElement('div')
	productContainer.setAttribute('class', 'product-container')
	productContainer.innerHTML =
		'<button class="favorite-button"><svg class="favorite-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>'
	productContainer.append(createPurchaseButton(product))
	return productContainer
}
const createPriceElement = product => {
	const priceElement = document.createElement('p')
	priceElement.setAttribute('class', 'product-price')
	priceElement.textContent = product.price + '$'
	return priceElement
}
const createPurchaseButton = product => {
	const purchaseButton = document.createElement('button')
	purchaseButton.setAttribute('class', 'purchase-button')
	purchaseButton.textContent = 'ADD TO CART'
	return purchaseButton
}
const createTitleElement = product => {
	const productName = document.createElement('p')
	productName.setAttribute('class', 'product-name')
	productName.textContent = product.name.toUpperCase()
	return productName
}
const createImageElement = product => {
	const imageElement = document.createElement('img')
	imageElement.src = product.image
	imageElement.setAttribute('class', 'product-image')
	return imageElement
}
const createProductListItem = products => {
	const productListItem = document.createElement('li')
	productListItem.setAttribute('class', 'product-list-item')
	productListItem.append(
		createImageElement(products),
		createTitleElement(products),
		createPriceElement(products),
		productContainer(products)
	)
	return productListItem
}
const createProductsList = products => {
	const productsList = document.createElement('ul')
	productsList.setAttribute('class', 'products-list')
	products.forEach(product => {
		productsList.append(createProductListItem(product))
	})
	return productsList
}
const renderProducts = products => {
	const main = document.querySelector('#main')
	main.append(createProductsList(products))
	const favoriteButtons = document.querySelectorAll('.favorite-button')
	const favoriteIcons = document.querySelectorAll('.favorite-icon')
	favoriteButtons.forEach(button => {
		button.addEventListener('click', fillFavoriteIcon)
	})
	const purchaseButtons = document.querySelectorAll('.purchase-button')
	purchaseButtons.forEach(button => {
		button.addEventListener('click', countUp)
	})
	return main
}
const fillFavoriteIcon = e => {
	const icon = e.target.closest('button').firstChild
	icon.classList.toggle('favorite-icon-clicked')
}
const showCart = () => {
	cart.classList.add('cart-active')
}
const hideCart = () => {
	cart.classList.remove('cart-active')
}
const countUp = e => {
	if (e.target.textContent === 'ADD TO CART') {
		productCounter.classList.add('count-up')
		setTimeout(removeAnim, 250)
		productCounterAmount++
		productCounter.textContent = productCounterAmount
	}
}
const removeAnim = () => {
	productCounter.classList.remove('count-up')
}
cartButton.addEventListener('click', showCart)
cartBackButton.addEventListener('click', hideCart)
