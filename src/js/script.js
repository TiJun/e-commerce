const basketCounter = document.querySelector('.header__basket-counter')
const basketButton = document.querySelector('.header__basket-button')
const basket = document.querySelector('.basket')
const basketBackButton = document.querySelector('.basket__button')
let basketList = document.querySelector('.basket__list')
const basketText = document.querySelector('.basket__text')
const basketIcon = document.querySelector('.basket__icon')
let basketValue = document.querySelector('.basket__total--number')
let basketAmount = 0
basketValue.textContent = basketAmount + '$'
let productsInBasket = []
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
const purchasedProductAmountCounter = () => {
	let amountCounter = document.createElement('p')
	let amountNumber = 1
	amountCounter.innerText = amountNumber
	amountCounter.classList.add('basket__amount-counter')
	plusButton.addEventListener('click', () => {
		amountNumber++
		amountCounter.textContent = amountNumber
	})
	return amountCounter
}
const purchasedProductAmountPlusButton = () => {
	const plusButton = document.createElement('button')
	plusButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#008000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
	plusButton.classList.add('basket__purchased-minus--button')
	
	return plusButton
}
const purchasedProductAmountMinusButton = () => {
	const minusButton = document.createElement('button')
	minusButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
	minusButton.classList.add('basket__purchased-minus--button')
	return minusButton
}
const purchasedProductAmountContainer = () => {
	const amountContainer = document.createElement('div')
	amountContainer.classList.add('basket__purchased-amount-container')
	amountContainer.append
	(
		purchasedProductAmountMinusButton(),
		purchasedProductAmountCounter(),
		purchasedProductAmountPlusButton()
	)
	return amountContainer
}
const purchasedProductName = purchasedProductId => {
	const purchasedProductName = document.createElement('p')
	purchasedProductName.textContent = products[purchasedProductId].name
	purchasedProductName.classList.add('basket__purchased-name')
	return purchasedProductName
}
const purchasedProductPrice = purchasedProductId => {
	const purchasedProductPrice = document.createElement('p')
	purchasedProductPrice.textContent = products[purchasedProductId].price + '$'
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
	const purchasedProductId = e.target.closest('li').dataset.id
	const purchasedProductPriceValue = products[purchasedProductId].price
	const productToDelete = document.getElementById(e.target.closest('li').dataset.id)
	basketAmount -= purchasedProductPriceValue
	basketValue.textContent = basketAmount.toFixed(2) + '$'
	basketList.removeChild(productToDelete)
	if (basketList.children.length === 2) {
		basketIcon.classList.remove('in-active')
		basketText.classList.remove('in-active')
	}
}
const addToBasket = (e) => {
	if (basketList !== '') {
		basketIcon.classList.add('in-active')
		basketText.classList.add('in-active')
	}
	const purchasedProductId = e.target.closest('li').dataset.id
	const purchasedProductPriceValue = products[purchasedProductId].price
	const purchasedListItem = document.createElement('li')
	purchasedListItem.setAttribute('id', products[purchasedProductId].id)
	purchasedListItem.classList.add('basket__purchased-item')
	purchasedListItem.append(
		purchasedProductImage(purchasedProductId),
		purchasedProductPrice(purchasedProductId),
		purchasedProductName(purchasedProductId),
		purchasedProductAmountContainer()
	)
	basketAmount += purchasedProductPriceValue
	basketValue.textContent = basketAmount.toFixed(2) + '$'
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
