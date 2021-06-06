// import { useEffect, useState} from 'react'
// import "./HomeScreen.css";
// //ASSETS INMPORT
// import shop from '../../images/shop.png';
// import service from '../../images/servicing.png'
// import customize from '../../images/customize.png'

// function HomeScreen() {
   
// //  const [hero1Style, setHero1Style]=useState('all__about__wrangler')
// //  useEffect(()=>{
// //       setHero1Style('all__about__wrangler all__about__wrangler__show')
// //  },[])

//   return (

//      <div className='homescreen'>
//         <div className='homescreen__hero1'>
//           <div className='homescreen__hero1__content' >
//                 <div className='hero1__content__inner'>
//                       <div className='all__about__wrangler'>
//                             <span className='about__first__child'>
//                                 All about
//                             </span>
//                             <span className='about__last__child'>
//                                 WRANGLER
//                             </span>
//                       </div>
//                       <button className='hero1__call2action'>
//                                     CONTACT US &#187;
//                       </button>
//                 </div>
//           </div>
//         </div>
//         <div className='homescreen__hero2'>
//           <div className='hero2__buy__spare__parts'>
//               <div className='hero2__buy__spare__parts__left'>
//                     <div className='hero2__image__container'>
//                     <img src={shop} alt='salwan spare parts' className='hero2__image'/>
//                     </div>
                    
//               </div>
//               <div className='hero2__buy__spare__parts__right '>
//                    <div className='hero2__text__content'>
//                         <p>Buy spare <span className='focus'>parts</span>.</p>
//                         <button className='hero2__call2action'>
//                         SHOP NOW &#187;
//                         </button>
//                     </div>
//               </div>

//               </div>
//           <div className='hero2__services__and__mainainance fade-in' >
//               <div className='hero2__services__and__mainainance__left'id='homescreen__hero2__reorder'>
//                       <div className='hero2__text__content'>
//                             <p>Servicing <span className='focus'>&#38;</span> Maintenance.</p>
//                           <button className='hero2__call2action'>
//                               CHECK SERVICES &#187;
//                           </button>
//                       </div>
//               </div>
//               <div className='hero2__services__and__mainainance__right '>
//                     <div className='hero2__image__container'>
//                         <img src={service} alt='salwan services and maintenance' className='hero2__image'/>
//                     </div>
//               </div>
//           </div>
//           <div className='hero2__customize fade-in'>
//                 <div className='hero2__customize__left'>
//                    <div className='hero2__image__container'>   
//                         <img src={customize} alt='salwan customize' className='hero2__image'/>
//                     </div>
//                 </div>
//                 <div className='hero2__customize__right'>
//                       <div className='hero2__text__content'>
//                         <p><span className='focus'>Customize</span> your car.</p>
//                           <button className='hero2__call2action'>
//                                 FIND OUT MORE &#187;
//                           </button>
//                       </div>
//                 </div>
//           </div>
//         </div>
//      </div>
//   );
// }

// export default HomeScreen;





import { useEffect, useRef, useState} from 'react'
import { gsap, TweenLite, TimelineLite, Power3} from 'gsap'
// import Aos from 'aos'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { useIntersection } from 'react-use'
// import 'aos/dist/aos.css';
import "./HomeScreen.css";

//ASSETS INMPORT
import shop from '../../images/shop.png';
import service from '../../images/servicing.png'
import customize from '../../images/customize.png'

function HomeScreen() {
   
// gsap.registerPlugin(ScrollTrigger);
      var allAboutRef= useRef(null)
      var hero1C2ARef=  useRef(null)
      var servicesRef= useRef(null)
      // var customizeRef= useRef(null)
      // //root: null->setting the window as the reference view port, 
      // // rootMargin allows us play with the data that we are targetting(0 is the end of target element. 100px is 100px from the bottom)
      // //threshold is 0-1 i.e representing how much of the target is sseen before the animation kicks in
      // const intersectionConfig= {root: null, rootMargin: "0px", threshold: 0.6}

      // const intersectionServices = useIntersection(servicesRef,intersectionConfig)
      // const intersectionCustomize= useIntersection(customizeRef, intersectionConfig)

      // //Animation for fade in
      // const fadeIn = element =>{
      //       TweenLite.from(element, 2, {
      //             opacity: 0,
      //             y: 100,
      //             ease: "power4.out",
      //             autoAlpha: 1
      //             // stagger: {
      //             //       amount: 0.3
      //             // }
      //       });
      // }

      // //Animation for fade out
      // const fadeOut = element =>{
      //       // TweenLite.from(element, 1, {
      //       //       opacity: 0,
      //       //       y: 100,
      //       //       ease: "power4.out",
      //       // });
      // }

      // intersectionServices && intersectionServices.intersectionRatio < 0.6
      // ? fadeOut('.fade-in')
      // : fadeIn('.fade-in')

      // intersectionCustomize && intersectionCustomize.intersectionRatio <0.2
      // ? fadeIn(customizeRef.current)
      // : fadeOut(customizeRef.current)

// =================================================================================================================//

      const [click, setClick]=useState(false)
      const t1= new TimelineLite()
      var element=useRef(null)

      const animateHero1=()=>{
            console.log('here')
            t1.staggerFrom( allAboutRef, 0.5, { opacity: 0, x:-200,  ease: 'linear',  autoAlpha: 0})
            .from(hero1C2ARef, {opacity: 0, y:200, ease: 'linear', delay: .2,  autoAlpha: 0}, '-=0.3')}
      // useEffect(()=>{
      //      Aos.init({duration: 400})
      // },[])
      // useEffect(()=>{
      //       window.addEventListener('load',Aos.refresh)
      // },[])
      useEffect(()=>{
            animateHero1()
            //ON LOAD DOES NOT TRIGGER ANIMATION IF WE ROUTE TO HOME SCREEN 
            // window.addEventListener('load', animateHero1);
            // return () => window.removeEventListener('load', animateHero1);
            
      },[click])
      // useEffect(()=>{
      //       // const currElement= element.current
      //       TweenLite.from(servicesRef.current,{
      //             opacity:0,
      //             y: 200,
      //             ease:"Power4.out",
      //             duration: 1,
      //             delay: 0.2,
      //             scrollTrigger: {
      //                   trigger: element.current,
      //                   start:"top 70%",
      //                   markers: true,
      //                   // scrub:true
      //             }
      //       })
      // },[click])

  return (

     <div className='homescreen'>
        <div className='homescreen__hero1'>
          <div className='homescreen__hero1__content' >
                <div className='hero1__content__inner'>
                      <div className='all__about__wrangler' ref={el=>allAboutRef=el}>
                            <span className='about__first__child'>
                                All about
                            </span>
                            <span className='about__last__child'>
                                WRANGLER
                            </span>
                      </div>
                      <button className='hero1__call2action' onClick={()=>setClick(!click)} ref={el=>hero1C2ARef=el}>
                                    CONTACT US &#187;
                      </button>
                </div>
          </div>
        </div>
        <div className='homescreen__hero2'  ref={el=>element=el}>
          <div className='hero2__buy__spare__parts'ref={el=>servicesRef=el}>
              <div  className='hero2__buy__spare__parts__left'>
                    <div className='hero2__image__container'>
                    <img src={shop} alt='salwan spare parts' className='hero2__image'/>
                    </div>
                    
              </div>
              <div className='hero2__buy__spare__parts__right '>
                   <div className='hero2__text__content'>
                        <p>Buy spare <span className='focus'>parts</span>.</p>
                        <button className='hero2__call2action'>
                        SHOP NOW &#187;
                        </button>
                    </div>
              </div>

              </div>
          <div className='hero2__services__and__mainainance'>
              <div  className='hero2__services__and__mainainance__left'id='homescreen__hero2__reorder'>
                      <div className='hero2__text__content'>
                            <p>Servicing <span className='focus'>&#38;</span> Maintenance.</p>
                          <button className='hero2__call2action'>
                              CHECK SERVICES &#187;
                          </button>
                      </div>
              </div>
              <div className='hero2__services__and__mainainance__right '>
                    <div className='hero2__image__container'>
                        <img src={service} alt='salwan services and maintenance' className='hero2__image'/>
                    </div>
              </div>
          </div>
          <div className='hero2__customize fade-in'>
                <div  className='hero2__customize__left'>
                   <div className='hero2__image__container'>   
                        <img src={customize} alt='salwan customize' className='hero2__image'/>
                    </div>
                </div>
                <div  className='hero2__customize__right'>
                      <div className='hero2__text__content'>
                        <p><span className='focus'>Customize</span> your car.</p>
                          <button className='hero2__call2action'>
                                FIND OUT MORE &#187;
                          </button>
                      </div>
                </div>
          </div>
        </div>
     </div>
  );
}

export default HomeScreen;

