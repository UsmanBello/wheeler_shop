
//COMPONENTS
import ImageSlider from '../ImageSlider/ImageSlider';


import './ProductImages.css'

const ProductImages=({product, currentImage, handleShowImage, handleRightClick, handleLeftClick})=>{
	
	return (
		<div className='product__images'>
               
              <img src={product.images[currentImage].image}
                    id='featured'
                    alt={product.name}/>
                 <ImageSlider 
					 product={product}
					 currentImage={currentImage}
					 handleShowImage={handleShowImage}
					 handleRightClick={handleRightClick}
					 handleLeftClick={handleLeftClick} />
            </div>
            
	)
}

export default ProductImages