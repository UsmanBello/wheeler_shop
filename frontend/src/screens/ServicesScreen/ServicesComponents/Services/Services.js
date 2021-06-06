import './Services.css'
//COMPONENTS
import Service from '../Sercice/Service'
//Assetes
import MaintenanceImg from '../../../../images/maintenance.jpg'
import BodyImg from '../../../../images/body.jpg'
import TyreImg from '../../../../images/tyres.jpg'
// import FleetImg from '../../../../images/'
import AccessoryImg from '../../../../images/accessories.jpg'
import InspectionImg from '../../../../images/inspection.jpg'
import FabricationImg from '../../../../images/fabrication.jpg'
import ACSevicesImg from '../../../../images/ac.jpg'
import ClientSchemeImg from '../../../../images/scheme.jpg'

const Services=()=>{

    const services=  [
                    {
                        img: MaintenanceImg,
                        name: 'GENERAL MAINTENANCE'
                    },
                    {
                        img: BodyImg,
                        name: 'BODY REPAIR & PAINT JOB'
                    },
                    {
                        img: TyreImg,
                        name: 'TYRE FITTING & WHEEL ALIGNMENT'
                    },
                    {
                        img: ACSevicesImg,
                        name: 'AIR CONDITIONING SERVICES'
                    },
                    {
                        img: AccessoryImg,
                        name: 'ACCESSORY FITTING'
                    },
                    {
                        img: InspectionImg,
                        name: 'USED CAR PRE-PURCHASE INSPECTION'
                    },
                    {
                        img: FabricationImg,
                        name: 'FABRICATION'
                    },{
                        img: MaintenanceImg,
                        name: 'FLEET SERVICING'
                    },
                    {
                        img: ClientSchemeImg,
                        name: 'CORPORATE CLIENT SCHEME'
                    },
                ]
    return (
        <div className='services__provided'>
            {services.map((service, index)=>{
             return <Service imgService={service.img} serviceName={service.name} key={index}/>
            })}
        </div>
    )
}

export default Services