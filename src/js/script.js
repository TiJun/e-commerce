const API_URL = 'https://dummyjson.com/products'
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
const createProductListItem = (products) => {
	const productListItem = document.createElement('li')
	return productListItem
}
const createProductsList = (products) => {
	const productsList = document.createElement('ul')
	products.forEach(product => {
		createProductListItem(product)
	});
	productsList.append(createProductListItem(products))
	return productsList
}
const renderProducts = (products) => {
	const main = document.querySelector('.main')
	main.append(createProductsList(products))
	return main
}
