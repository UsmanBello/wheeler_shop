import {getAmount} from '../../../../utils/helpers';
import './PreviewCart.css'

const PreviewCart=({cartItems, removeHandler, history, getCartSubTotal})=>{
	
	return (
	<div className='preview__cart'>
			<p className='preview__cart__header'>Cart Preview</p>
			{
				cartItems.length>0 ?
				<>
		<div className='cart__items__list'>
			{
				cartItems.map(item=>{
					return 	<div className='preview__cart__item__container' key={item.product}>
								<div className='preview__cart__image__conatiner' onClick={()=>history.push(`/product/${item.product}`)}>
									<img src={item.image} alt={item.name}/>
								</div>
								<div className='preview__cart__info__conatiner'>
									<p className='preview__cart__name__info'
										onClick={()=>history.push(`/product/${item.product}`)}>
										{item.name}
									</p>
									<p className='preview__cart__price__info'>
										{item.qty} x AED{getAmount(item.price)}
									</p>
								</div>
								<div className='preview__cart__remove__item' onClick={()=>removeHandler(item.product)}>
									x
								</div>
							</div>
				})
			}
		</div>
			<div className='cart__preview__subtotal__container'>
				<p className='cart__preview__subtotal'>Subtotal: AED {getAmount(getCartSubTotal())}</p>
			</div>
			<div className='preview__cart__action__container'>
				<button className='preview__cart__view__cart' onClick={()=>history.push('/cart')}>
					View Cart
				</button>
				<button className='preview__cart__checkout' onClick={()=>history.push({pathname:'/checkout', state:{prev:'legitimatePreviousRoute'}})}>
					Checkout
				</button>
			</div>
					</>
						
				: <p>No Products in the cart.</p>}
	</div>)
}

export default PreviewCart