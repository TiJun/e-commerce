const cartCounter = document.querySelector('.header__cart-counter')
const cartButton = document.querySelector('.header__cart-button')
const cart = document.querySelector('.cart')
const cartBackButton = document.querySelector('.cart__button')
let counter = 0
cartCounter.textContent = counter
const createFavoriteButton = () => {
	const favButton = document.createElement('button')
	favButton.classList.add('favorite-button')
	favButton.innerHTML =
		'<svg class="favorite-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>'
	return favButton
}
const createButtonsContainer = () => {
	const buttonsContainer = document.createElement('div')
	buttonsContainer.classList.add('buttons-container')
	buttonsContainer.append(createPurchaseButton(), createFavoriteButton())
	return buttonsContainer
}
const createPurchaseButton = () => {
	const purchaseButton = document.createElement('button')
	purchaseButton.classList.add('purchase-button')
	purchaseButton.textContent = 'ADD TO CART'
	return purchaseButton
}
const createProductPrice = products => {
	const productPrice = document.createElement('p')
	productPrice.classList.add('product-price')
	productPrice.textContent = products.price + '$'
	return productPrice
}
const createProductName = products => {
	const productName = document.createElement('p')
	productName.classList.add('product-name')
	productName.textContent = products.name
	return productName
}
const createProductImage = products => {
	const productImage = document.createElement('img')
	productImage.classList.add('product-image')
	productImage.setAttribute('src', products.image)
	return productImage
}
const createProductListItem = products => {
	const productListItem = document.createElement('li')
	productListItem.classList.add('product-list-item')
	productListItem.append(
		createProductImage(products),
		createProductName(products),
		createProductPrice(products),
		createButtonsContainer()
	)
	return productListItem
}
const createProductsList = products => {
	const productList = document.createElement('ul')
	productList.classList.add('products-list')
	products.forEach(product => {
		productList.append(createProductListItem(product))
	})
	return productList
}
const renderProducts = products => {
	const main = document.querySelector('#main')
	main.append(createProductsList(products))
	return main
}
renderProducts(products)
const countProductInBasket = () => {
	const purchaseButtons = document.querySelectorAll('.purchase-button')
	purchaseButtons.forEach(button => {
		button.addEventListener('click', e => {
			const clickedBtn = e.target
			if (clickedBtn.textContent === 'ADD TO CART') {
				;(clickedBtn.textContent = 'REMOVE'), clickedBtn.classList.add('remove-from-cart')
				counter++
			} else {
				;(clickedBtn.textContent = 'ADD TO CART'), clickedBtn.classList.remove('remove-from-cart')
				counter--
			}
			cartCounter.textContent = counter
		})
	})
}
const openBasket = () => {
	cart.classList.add('cart-active')
}
const closeBasket = () => {
	cart.classList.remove('cart-active')
}
cartBackButton.addEventListener('click', closeBasket)
cartButton.addEventListener('click', openBasket)
countProductInBasket()
