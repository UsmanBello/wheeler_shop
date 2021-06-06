import {useState, useEffect, useCallback} from 'react'
import CountUp from 'react-countup'
import './ServicesScreen.css'

//COMPONENTS
import Services from './ServicesComponents/Services/Services';

//ASSETS
import ServicesIntro from '../../images/service_intro.svg';
import SupportIcon from '../../images/support.svg';
import TrustIcon from '../../images/trust.svg';
import MoneyBackIcon from '../../images/money_back.svg';

const ServicesScreen=()=>{
    const [count, setCount]= useState(10000)
    const countUp=useCallback(()=>{
        var number=1
            do{
              setCount(number)
              number++;
            }while(number<10000)
    },[])
    useEffect(()=>{
            console.log('here')
            setInterval(countUp(),2000/10000)
    },[])

    const  thousandFormatter=useCallback((x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },[])
        return(
            <div className='services__screen'>
                   <div className='services__intro'>
                        <div className='services__intro__text'>
                            <header>
                                Services made <span id='services__intro__header__unique'>easy</span>.
                            </header>
                            <p>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                            </p>
                            
                        </div>
                        <div className='services__intro__image'>
                                <img src={ServicesIntro} alt='salwan services' id='service__header__image'/>
                        </div>
                   </div>
                   <div className='services__icons'>
                       <div className='services__icon__container'>
                           <div className='services__icon__image__container'>
                                <img src={SupportIcon} alt='support' className='service__icon__image'/>
                           </div>
                           <p className='services__icon__numbers'>
                                   24 / 7
                            </p>
                            <p className='services__icon__text'>
                                    support team
                            </p>
                       </div>
                       <div className='services__icon__container'>
                           <div className='services__icon__image__container'>
                                <img src={TrustIcon} alt='trust' className='service__icon__image'/>
                           </div>
                           <p className='services__icon__numbers'>
                                   <CountUp end={10000} duration={4}/> +
                            </p>
                            <p className='services__icon__text'>
                                    clients trust us
                            </p>
                       </div>
                       <div className='services__icon__container'>
                           <div className='services__icon__image__container'>
                                <img src={MoneyBackIcon} alt='money back' className='service__icon__image'/>
                           </div>
                           <p className='services__icon__numbers'>
                               30 days
                            </p>
                            <p className='services__icon__text'>
                                money back
                            </p>
                       </div>
                   </div>
                   <div className='services__list'>
                        <Services/>
                   </div>
            </div>
        )
}
export  default ServicesScreen
