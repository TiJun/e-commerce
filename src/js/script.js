const API_URL = 'https://dummyjson.com/products/category/smartphones'
let products
fetch(API_URL)
	.then(res => res.json())
	.then(res => {
		products = res.products.map(product => {
			return {
				name: product.title,
			}
		})
		console.log(products)
	})
