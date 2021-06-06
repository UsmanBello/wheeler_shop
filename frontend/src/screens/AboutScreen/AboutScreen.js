import './AboutScreen.css'

const AboutScreen=()=>{
    return (
        <div className='aboutscreen'>
            <div className='aboutscreen__top'>
                 <header>
                            About Us
                 </header>
                 <div className='aboutscreen__top__content'>
                    <div className='aboutscreen__top__left'>
                        <img src='' alt='about salawan auto'/>
                    </div>
                    <div className='aboutscreen__top__right'>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.</p> 
                        <p>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                    </div>
                </div>
            </div>
            <div className='aboutscreen__bottom'>
                   <header>
                       Some brands we work with
                   </header>
                  <div className='aboutscreen__brands'>
                        <div className='brand__container'>
                            <div className='brand__image'>
                                    <img src='' alt=''/>
                            </div>
                            <span className='brand__text'>

                            </span>
                        </div>
                        <div className='brand__container'>
                                <div className='brand__image'>
                                     <img src='' alt=''/>
                                </div>
                                <span className='brand__text'>

                                </span>
                        </div>
                        <div className='brand__container'>
                                <div className='brand__image'>
                                        <img src='' alt=''/>
                                </div>
                                <span className='brand__text'>

                                </span>
                        </div>
                        <div className='brand__container'>
                                 <div className='brand__image'>
                                        <img src='' alt=''/>
                                </div>
                                <span className='brand__text'>

                                </span>
                        </div>
                  </div>
            </div>
        </div>
    )
}

export default AboutScreen