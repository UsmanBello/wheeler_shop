import './Service.css'

const Service=({imgService, serviceName})=>{
   return(
          <div className='service'>
                <img src={imgService} alt={serviceName} className='service__image'/>
                <p className='service__name'>{serviceName}</p>
            </div>
   )

}
export default Service