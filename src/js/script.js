const basketCounter = document.querySelector('.header__basket-counter')
const basketButton = document.querySelector('.header__basket-button')
const basket = document.querySelector('.basket')
const basketBackButton = document.querySelector('.basket__button')
let basketList = document.querySelector('.basket__list')
const basketText = document.querySelector('.basket__text')
const basketIcon = document.querySelector('.basket__icon')
let itemsInBasket = []
let counter = 0
basketCounter.textContent = counter
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
	productListItem.setAttribute('data-id', products.id)
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
const purchaseProduct = e => {
	if (itemsInBasket !== '') {
		basketIcon.classList.add('in-active')
		basketText.classList.add('in-active')
	} else {
		basketIcon.classList.remove('in-active')
		basketText.classList.remove('in-active')
	}
	const purchasedProduct = e.target.closest('li').dataset.id
	console.log(purchasedProduct)
	const purchasedListItem = document.createElement('li')
	purchasedListItem.classList.add('basket__purchased-item')
	const purchasedItemImage = document.createElement('img')
	purchasedItemImage.classList.add('product-image')
	purchasedItemImage.setAttribute('src', products[purchasedProduct].image)
	purchasedListItem.append(purchasedItemImage)
	basketList.append(purchasedListItem)
}
const countProductInBasket = () => {
	const purchaseButtons = document.querySelectorAll('.purchase-button')
	purchaseButtons.forEach(button => {
		button.addEventListener('click', e => {
			const clickedBtn = e.target
			if (clickedBtn.textContent === 'ADD TO CART') {
				clickedBtn.textContent = 'REMOVE'
				clickedBtn.classList.add('remove-from-basket')
				counter++
			} else {
				clickedBtn.textContent = 'ADD TO CART'
				clickedBtn.classList.remove('remove-from-basket')
				counter--
			}
			purchaseProduct(e)
			basketCounter.textContent = counter
		})
	})
}
const openBasket = () => {
	basket.classList.add('basket-active')
}
const closeBasket = () => {
	basket.classList.remove('basket-active')
}
basketBackButton.addEventListener('click', closeBasket)
basketButton.addEventListener('click', openBasket)
countProductInBasket()
