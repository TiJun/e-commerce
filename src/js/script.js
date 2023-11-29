const basketCounter = document.querySelector('.header__basket-counter')
const basketButton = document.querySelector('.header__basket-button')
const basket = document.querySelector('.basket')
const basketBackButton = document.querySelector('.basket__button')
let basketList = document.querySelector('.basket__list')
const basketText = document.querySelector('.basket__text')
const basketIcon = document.querySelector('.basket__icon')
let basketValue = document.querySelector('.basket__total--number')
let basketTotalNumber = 0
basketValue.textContent = basketTotalNumber + '$'
let counter = 0
basketCounter.textContent = counter
const createInput = () => {
	const input = document.createElement('input')
	input.setAttribute('type', 'number')
	input.setAttribute('min', '1')
	input.setAttribute('max', '10')
	input.setAttribute('onKeyDown', 'return false')
	input.classList.add('product-input')
	input.value = 1
	return input
}
const createButtonsContainer = () => {
	const buttonsContainer = document.createElement('div')
	buttonsContainer.classList.add('buttons-container')
	buttonsContainer.append(createPurchaseButton(), createInput())
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
	productListItem.setAttribute('id', products.id)
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
const purchasedProductName = purchasedProductId => {
	const purchasedProductName = document.createElement('p')
	purchasedProductName.textContent = products[purchasedProductId].name
	purchasedProductName.classList.add('basket__purchased-name')
	return purchasedProductName
}
const purchasedProductPrice = (purchasedProductId, productInputValue) => {
	const purchasedProductPrice = document.createElement('p')
	purchasedProductPrice.textContent = (products[purchasedProductId].price * productInputValue).toFixed(2) + '$'
	purchasedProductPrice.classList.add('basket__purchased-price')
	return purchasedProductPrice
}
const purchasedProductImage = purchasedProductId => {
	const purchasedProductImage = document.createElement('img')
	purchasedProductImage.classList.add('product-image')
	purchasedProductImage.setAttribute('src', products[purchasedProductId].image)
	return purchasedProductImage
}
const removeFromBasket = e => {
	const purchasedProductId = e.target.closest('li').id
	const productToDelete = document.getElementById(purchasedProductId)
	basketTotalNumber -= parseFloat(productToDelete.querySelector('.basket__purchased-price').textContent)
	basketValue.textContent = basketTotalNumber.toFixed(2) + '$'
	basketList.removeChild(productToDelete)
	if (basketList.children.length === 2) {
		basketIcon.classList.remove('in-active')
		basketText.classList.remove('in-active')
	}
}
const createRemoveButton = e => {
	const removeButton = document.createElement('button')
	removeButton.classList.add('basket__remove-from-cart')
	removeButton.textContent = 'REMOVE'
	removeButton.addEventListener('click', e => {
		removeFromBasket(e)
		counter--
		basketCounter.textContent = counter
		const productsList = document.querySelector('.products-list')
		const btn = productsList.children[e.target.closest('li').id].querySelector('button')
		btn.textContent = 'ADD TO CART'
		btn.classList.remove('remove-from-basket')
	})
	return removeButton
}
const addToBasket = e => {
	if (basketList !== '') {
		basketIcon.classList.add('in-active')
		basketText.classList.add('in-active')
	}
	const productInputValue = e.target.closest('li').querySelector('input').value
	const purchasedProductId = e.target.closest('li').id
	const purchasedListItem = document.createElement('li')
	purchasedListItem.setAttribute('id', products[purchasedProductId].id)
	purchasedListItem.classList.add('basket__purchased-item')
	purchasedListItem.append(
		purchasedProductImage(purchasedProductId),
		purchasedProductPrice(purchasedProductId, productInputValue),
		purchasedProductName(purchasedProductId),
		createRemoveButton()
	)
	basketTotalNumber += (products[purchasedProductId].price * productInputValue)
	basketValue.textContent = basketTotalNumber.toFixed(2) + '$'
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
				addToBasket(e)
			} else {
				clickedBtn.textContent = 'ADD TO CART'
				clickedBtn.classList.remove('remove-from-basket')
				counter--
				removeFromBasket(e)
			}
			basketCounter.textContent = counter
		})
	})
}
const openBasket = () => {
	if (window.screen.width <= 768) {
		basket.classList.add('basket-active-mobile')
	} else if (window.screen.width > 769) {
		basket.classList.add('basket-active-desktop')
	}
}
const closeBasket = () => {
	basket.classList.remove('basket-active-mobile')
	basket.classList.remove('basket-active-desktop')
}
basketBackButton.addEventListener('click', closeBasket)
basketButton.addEventListener('click', openBasket)
countProductInBasket()
