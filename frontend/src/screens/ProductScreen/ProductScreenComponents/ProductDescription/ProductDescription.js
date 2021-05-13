import './ProductDescription.css'

function createMarkup(theExactHtmlWithTag) {
    return { __html: theExactHtmlWithTag };
}

const ProductDescription =({product})=>{
	<div dangerouslySetInnerHTML={createMarkup(`<h4> Hello <strong> World </strong></h4>` )} />
	
	return(<div className='product__description__container'>
		<div className='product__description__header'>
			<p>Description</p>
			<div className='product__description__header__right'></div>
		</div>
		<div className='product__description'>
			<div className='product__description__text' dangerouslySetInnerHTML={createMarkup(`${product.description}` )} />
                 
              </div>
	</div>)
}

export default ProductDescription

 // <p className='product__description__text'>{product.description}</p>