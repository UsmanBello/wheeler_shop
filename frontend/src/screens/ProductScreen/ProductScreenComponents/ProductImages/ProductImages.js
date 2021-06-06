
//COMPONENTS
import ImageSlider from '../ImageSlider/ImageSlider';

//COMPONENT
import SalesBadge from '../../../../components/SalesBadge/SalesBadge'

import './ProductImages.css'

const ProductImages=({product, currentImage, handleShowImage, handleRightClick, handleLeftClick})=>{
	
	return (
		<div className='product__images'>
               
			   <div className='current__image__wrapper'>
				<img src={product.images[currentImage].image}
						id='featured'
						alt={product.name}/>
				{product.sales > 0 && 
				<div className='sales__badge__wrapper'>
				<SalesBadge size={'big'} sales={product.sales}/>
				</div>
				}
				</div>
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