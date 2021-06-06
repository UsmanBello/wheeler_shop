import "./AdminSideDrawer.css";



const SideDrawer = ({ show, click, handleNavigationClick, active}) => {

  const sideDrawerClass = ["admin__side__drawer"];
 

  if (show) {
    sideDrawerClass.push("show__admin__side__drawer");
  }

  return (
    <div className={sideDrawerClass.join(" ")}>
      <ul className= "admin__side__drawer__links"  onClick={click}>
        <li className={active==='dashboard' ?  'admin__side__drawer__link active' : 'admin__side__drawer__link'}
        onClick={()=>handleNavigationClick('dashboard')}>
               <span> <i className="fa fa-table" aria-hidden="true"/>{' '}
                Dashboard</span>
         </li>
        <li className={active==='products' ?  'admin__side__drawer__link active' : 'admin__side__drawer__link'}
        onClick={()=>handleNavigationClick('products')}>
              <span>  <i className="fa fa-shopping-cart" aria-hidden="true"/>{' '}
                Products</span>
        </li>
        <li className={active==='orders' ?  'admin__side__drawer__link active' : 'admin__side__drawer__link'}
        onClick={()=>handleNavigationClick('orders')}>
           <span> <i className="fa fa-file" aria-hidden="true"/>{' '}
             Orders
            </span>
        </li>
        <li className={active==='requests' ?  'admin__side__drawer__link active' : 'admin__side__drawer__link'}
        onClick={()=>handleNavigationClick('requests')}>
              <span>  <i className="fa fa-shopping-cart" aria-hidden="true"/>{' '}
                Requests
             </span>
        </li>
        <li className={active==='customers' ?  'admin__side__drawer__link active' : 'admin__side__drawer__link'}
        onClick={()=>handleNavigationClick('customers')}>
                <span>   <i className="fa fa-users" aria-hidden="true"/>{' '}
                Customers
                </span>
        </li>
                      
    </ul>
    </div>
  );
};

export default SideDrawer;