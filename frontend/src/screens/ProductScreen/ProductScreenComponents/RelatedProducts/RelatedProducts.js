import './RelatedProducts.css'

import Product from '../../../../components/Product/Product'

const RelatedProducts=({products})=>{
	
	return (
		<div className='related__products__container'>
			{
				products.map(product=>{
					return <div className='related__product__column'
							   key={product._id}>
							<Product
							   image={product.images[0].image}
							   name={product.name}
							   price={product.price} 
							   description={product.description}
							   productId={product._id}/>
						    </div>
				})
			}
		</div>
		
	)
	
}

export default RelatedProducts