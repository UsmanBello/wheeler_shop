
import './ImageSlider.css'


const ImageSlider=({ product, currentImage, handleShowImage, handleLeftClick, handleRightClick})=>{
	
	return (<div className='slide__wrapper__container'>

                <div className='arrow__button__container'>
                 <i className="fa fa-chevron-circle-left" aria-hidden="true" onClick={()=>handleLeftClick()}></i>
                </div>

                <div id='images__slider'>
                {
                    product.images.map((image, index)=>{
                      return <img src={image.image} alt={product.name}
                                   width='200px'
                                  className={currentImage===index ? 'clear thumbnail': 'blur thumbnail'}
                                  onClick={()=>handleShowImage(index)}
								  key={index}
                                 /* onMouseOver={()=>showImage(index)}*/
                                 />
                    })
                }
               
                </div>
                <div className='arrow__button__container'>
                <i className="fa fa-chevron-circle-right"  onClick={()=>handleRightClick()}></i>
                </div>
              </div>)
}

export default ImageSlider