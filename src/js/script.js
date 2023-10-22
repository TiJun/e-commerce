const API_URL = 'https://dummyjson.com/products/?limit=0'
let products
fetch(API_URL)
	.then(res => res.json())
	.then(products => products.products)
	.then(products => {
		products = products.map(product => {
			return {
				name: product.title,
				price: product.price,
				image: product.thumbnail,
				category: product.category,
			}
		})
		console.log(products)
		renderProducts(products)
	})
const createImageElement = product => {
	const imageElement = document.createElement('img')
	imageElement.src = product.image
	imageElement.setAttribute('class', 'product-image')
	return imageElement
}
const createProductListItem = products => {
	const productListItem = document.createElement('li')
	productListItem.setAttribute('class', 'product-list-item');
	productListItem.append(createImageElement(products))
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
	return main
}
