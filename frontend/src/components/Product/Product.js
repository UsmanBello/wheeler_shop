import './Product.css';
import {Link} from 'react-router-dom';
import {getAmount, getDiscountedAmount} from '../../utils/helpers';

//COMPONENT
import SalesBadge from '../SalesBadge/SalesBadge'
import OutOfStock from '../OutOfStock/OutOfStock'
const  Product=( {image, name, price, snippet, productId, sales, countInStock})=> {

  return (
    <div className='product' to={`/product/${productId}`}>
      <div className='shop__image__display'>
      <img src={image}
         alt={name}/>
         {sales > 0 &&
         <div className='small__sales__badge__wrapper'>
            <SalesBadge size={'small'} sales={sales}/>
         </div>}
         {countInStock===0 &&
          <div className='outofstock__badge__wrapper'>
            <OutOfStock/>
          </div>
         }
      </div>
        <div className='product__info'>
            <p><Link to={`/product/${productId}`} className='info__name'>{name}</Link></p>
            {/* <p className='info__description'>{snippet}</p> */}
            <p className='info__tax'> Inc 5% Tax</p>
            { sales> 0 ?
              <p>
                <span className='shopscreen__old__price'>AED {getAmount(price)}</span>{' '}
                <span className='shopscreen__current__price'>AED {getDiscountedAmount(price, sales)}</span></p>
              :
              <p className='shopscreen__current__price'>AED {getAmount(price)}</p>
            }
            <p></p>
            <Link to={`/product/${productId}`} className='info__button'>View</Link>
        </div>
    </div>
  );
}

export default Product;