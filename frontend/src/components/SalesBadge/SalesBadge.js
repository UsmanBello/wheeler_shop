import './SalesBadge.css'

const SalesBadge=({size, sales})=>{

    return(
        <div className={size==='big'? 'sales__badge__big': 'sales__badge__small'}>
                <span>- {sales}%</span>
        </div>
    )

}

export default SalesBadge