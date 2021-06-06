import {useCallback} from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faFacebookF, faInstagram} from '@fortawesome/free-brands-svg-icons'
import "./Footer.css";


const Footer= () => {

  const getYear=useCallback(()=>{
      return new Date().getFullYear()
  },[])

  return (

  <div className="footer">
      <div className='footer__content'>
            <div className="footer__trademark">
                    <p>&copy; SALWAN AUTO {getYear()}</p>
            </div>
            <div className="footer__navlinks">
                    <Link className='footer__navlink'>About Us</Link>
                    <Link className='footer__navlink'>Contact</Link>
                    <Link className='footer__navlink'>Terms &#38; Conditions</Link>
            </div>
            <div className="footer__contact">
                  <p className='footer__contact__info'>Al QuozAl - شارع الخيل - Al QuozAl Quoz Industrial Area 3 - Dubai</p>
                  <p className='footer__contact__info'>+971 56 688 3866</p>
                  <p className='footer__contact__info'>salwanautosales@gmail.com</p>
            </div>
            <div className="footer__icons">
                <p>
                     <a href='https://www.facebook.com/salwanauto'>
                         <FontAwesomeIcon icon={faFacebookF}/>
                     </a>
                </p>
                <p>
                     <a  href='https://www.instagram.com/salwanauto/'>
                         <FontAwesomeIcon icon={faInstagram}/>
                     </a>
                </p>
            </div>
        </div>
  </div>
   
  );
}

export default Footer;