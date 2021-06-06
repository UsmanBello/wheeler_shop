import './Orders.css';
import {useEffect, useState } from 'react';
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { extractTerm } from '../../../../utils/helpers';
import { useSelectOption } from '../../../../utils/hooks';


//Actions
import { getOrders as listOrders,
    getOrdersCount,
    updateOrder,
    deleteOrder } from '../../../../redux/actions/orderActions';

//Component
import OrderItem  from './OrderItem';
import ViewCustomer from '../../../../components/ViewCustomer/ViewCustomer'
import ViewItems from './ViewItems'
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
import SearchComponent from '../../../../components/Search/SearchComponent';
import EditOrder from './EditOrder'
import MySelect from '../../../../components/SelectInput/MySelect'
// import AdminProductsFilter from './AdminProductsFilter';

const Orders =({location, history}) => {

    const { search }  = location
    const queryParams = queryString.parse(search)

    
    const dispatch= useDispatch()
    const getOrders = useSelector(state=>state.order)
    const { orders, ordersCount, loading, error} = getOrders
    const { fetchedOrders, count} = orders
    //PAGINATE
    const [pageNumber, setPageNumber]= useState(queryParams.page ? Number(queryParams.page): 1)
    const [ordersPerPage, setOrdersPerPage]=useState(15)
    const [statusChoice, setStatusChoice]= useState('allOrders')
    //OTHER

    const [searchInput, setSearchInput]= useState('')
    const [toggleEditOrder, setToggleEditOrder]= useState(false)
    const [toggleDeleteOrder, setToggleDeleteOrder]= useState(false)
    const [toggleViewCustomer, setToggleViewCustomer]=useState(false)
    const [toggleViewItems, setToggleViewItems]= useState(false)
    const [customerToView, setCustomerToView]= useState('')
    const [itemsToView, setItemsToView]= useState([])
    const [orderToBeActedOn, setOrderToBeActedOn]= useState({})

    

     useEffect(()=>{
        setPageNumber(queryParams.page ? Number(queryParams.page): 1)
    },[queryParams.page])
    useEffect(()=>{
        var searchTerm= extractTerm(queryParams.q)
        var statusSearchTerm= extractTerm(queryParams.status)
        dispatch(listOrders(searchTerm, statusSearchTerm ,ordersPerPage, pageNumber))
    },[dispatch, search, ordersPerPage, pageNumber])
    useEffect(()=>{
        dispatch(getOrdersCount())
      },[dispatch])

    var pageCount= Math.ceil(count/ordersPerPage)

    //==========PAGINATION FUNCTIONS=======/
    const getCurrentPage=()=>{
        if(extractTerm(queryParams.page) !==''){
            return Number(extractTerm(queryParams.page))-1
        }else{
          return pageNumber-1
    
      }
    }
    const changePage =({selected})=>{ 
      setPageNumber(selected+1)
      history.push({
        pathname: '/admin',
        search: queryString.stringify({...queryParams,page:selected+1,})
    })
    }
    //======================================//

    //==================== CRUD FUNCTIONS FOR PRODUCT ====================//
    const handleViewCustomer=(customerId)=>{
       
        setCustomerToView(customerId)
        setToggleViewCustomer(true)
    }
    const handleViewItems=(items)=>{
      setItemsToView(items)
      setToggleViewItems(true)
    }
   const handleEditOrder=(orderId, newStatus)=>{
        dispatch(updateOrder(orderId, newStatus))
        setToggleEditOrder(false)
   }
    const handleDeleteOrder=(id)=>{
        dispatch(deleteOrder(id))
        setToggleDeleteOrder(false)
    }
    const handleEditToggle=(order)=>{ 
        setOrderToBeActedOn(order)
        setToggleEditOrder(true)

    }
    const handleDeleteToggle=(order)=>{
        setOrderToBeActedOn(order)
        setToggleDeleteOrder(true)
    }
  //================================================================================//

//============================== SEARCH FUNCTION ======================//

    const handleSearchChange=(e)=>{
        setSearchInput(e.target.value)
    }
    const handleKeyDown=(e)=>{
        if(e.keyCode !== 13){
        return 
    }
    setSearchInput('')
    history.push({
        pathname: '/admin',
        search: queryString.stringify({ ...queryParams, q: searchInput, page: 1 })
    })
  }
  
  const handleSearch=()=>{
        setSearchInput('')
        history.push({
            pathname: '/admin',
            search: queryString.stringify({ ...queryParams, q: searchInput, page: 1 })
        })
      
  }

  const clearSearch=()=>{
    setSearchInput('')
    history.push({
        pathname: '/admin',
        search: queryString.stringify({admin_option: 'orders'})
    })
  }
  //====================================================================\\

  //========================================SORTING FUNCTION ================================\\
const handleSelectStatus=(value)=>{
  setStatusChoice(value)
  history.push({
    pathname: '/admin',
    search: queryString.stringify({...queryParams, status: value, page: 1})
})
}
//==========================================================================================\\

  //================================== ROWS PER PAGE =====================================\\

  const handleSelectRows=(value)=>{
    setOrdersPerPage(value)
//     history.push({
//       pathname: '/admin',
//       search: queryString.stringify({...queryParams, rows: value, page: 1})
//   })
  }
  //===================================================================================\\
    return (
                 <div className='orders'>
                     <div className='orders__header'>
                            <div className='orders__header__left'>
                                <div className='orders__header__left__select__status'>
                                        <MySelect
                                         selectedValue={statusChoice}
                                         handleSelectValue={handleSelectStatus}
                                         selectOptions={useSelectOption().orderStatusOptions}
                                         />
                                </div>
                                <div className='orders__header__right__select__rows'>
                                        <MySelect
                                        selectedValue={ordersPerPage}
                                        handleSelectValue={handleSelectRows}
                                        selectOptions={useSelectOption().rowsPerPageOptions}/>
                                </div>
                            </div>
                            <div className='search__container'>
                                    <SearchComponent
                                        handleSearch={handleSearch}
                                        handleSearchChange={handleSearchChange}
                                        handleKeyDown={handleKeyDown}
                                        userInput={searchInput}/>
                            </div>
                           
                     </div>
                     <div className='admin__orders__filter'>
                       {/* <AdminProductsFilter 
                       handleBrandChange={handleBrandChange}
                       brandInput={brandInput}
                       handleCategoryChange={handleCategoryChange}
                       categoryInput={categoryInput}
                       handleSetRowPerPage={handleSetRowPerPage}
                       rowsPerPage={productsPerPage}
                       sortChoice={sortChoice}
                       handleSortSelect={handleSortSelect}/> */}
                     </div>

                     

                     {count < ordersCount &&
                     <div  className='found__results'>
                        <p>{orders.count}{" "}{orders.count > 1 ? 
                        "results found." : "result found."}{" "}
                        <span className='clear__Search' onClick={()=>clearSearch()}>
                            Clear search
                            </span>
                        </p>
                        </div>} 

                    { loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> :
                    
                     <div className="orders__table__container">
                            <table className="orders__table" border="0" cellSpacing="0" cellPadding="0"> 
                            <thead>
                                <tr className='table__row'>
                                    <th>#</th>
                                    <th width='20%' className='same'>Invoice No</th>
                                    <th className='hide__at__mobile' width='20%'>Date</th>
                                    <th width='10%' className='hide__at__mobile'>Items</th>
                                    <th width='10%' className='same'>Total</th>
                                    <th width='20%' className='same'>Customer</th>
                                    <th width='20%'className='same'>Action</th>
                                 </tr>
                            </thead>
                            <tbody>
                                {
                                    fetchedOrders.map(order=>{
                                        return <OrderItem 
                                                     key={order._id}
                                                     order={order}
                                                     handleEditToggle={handleEditToggle}
                                                     handleDeleteToggle={handleDeleteToggle}
                                                     handleViewItems={handleViewItems}
                                                     handleViewCustomer={handleViewCustomer}
                                                    />
                                    })
                                }
                            </tbody>
                            </table>
                     </div>
                      
}
{count > ordersPerPage  &&
<div className='page__component__container'>
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        forcePage={getCurrentPage()}
                        containerClassName={"pagination__btns"}
                        previousLinkClassName={"previous__btn"}
                        nextClassName={"next__btn"}
                        activeClassName={"pagination__active"}/>
                      </div>}
                    {/* <NewProduct show={toggleAddProduct}
                                create={addProduct}
                                cancel={()=>setToggleAddProduct(false)}
                                />*/}
                    <EditOrder show={toggleEditOrder}
                                edit={handleEditOrder}
                                cancel={()=>setToggleEditOrder(false)}
                                order={orderToBeActedOn}
                                /> 
                     <ViewItems
                     items={itemsToView}
                     show={toggleViewItems}
                     cancel={()=>setToggleViewItems(false)}/>

                    <ViewCustomer
                     customerId={customerToView}
                     show={toggleViewCustomer}
                     cancel={()=>setToggleViewCustomer(false)}/>
                     
                    <DeleteModal
                                show={toggleDeleteOrder}
                                handleDelete={handleDeleteOrder}
                                cancel={()=>setToggleDeleteOrder(false)}
                                id={orderToBeActedOn._id}
                                toDelete={'order'}/>
                </div>
    )
  }
  
  export default Orders;

// import './Orders.css';
// import {useEffect, useState} from 'react';
// import queryString from 'query-string';
// import ReactPaginate from 'react-paginate';
// import { useSelector, useDispatch } from 'react-redux';
// import { extractTerm } from '../../../../utils/helpers';


// //Actions
// import { getOrders as listOrders,
//     getOrdersCount,
//     updateOrder,
//     deleteOrder } from '../../../../redux/actions/orderActions';

// //Component
// import OrderItem  from './OrderItem';
// import ViewCustomer from '../../../../components/ViewCustomer/ViewCustomer'
// import ViewItems from './ViewItems'
// import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
// import SearchComponent from '../../../../components/Search/SearchComponent';
// import EditOrder from './EditOrder'
// // import AdminProductsFilter from './AdminProductsFilter';

// const Orders =({location, history}) => {

//     const { search }  = location
//     const queryParams = queryString.parse(search)

    
//     const dispatch= useDispatch()
//     const getOrders = useSelector(state=>state.order)
//     const { orders, ordersCount, loading, error} = getOrders
//     const { fetchedOrders, count} = orders
//     //PAGINATE
//     const [pageNumber, setPageNumber]= useState(queryParams.page ? Number(queryParams.page): 1)
//     const [ordersPerPage, setOrdersPerPage]=useState(15)
//     //OTHER

//     const [searchInput, setSearchInput]= useState('')
//     const [toggleEditOrder, setToggleEditOrder]= useState(false)
//     const [toggleDeleteOrder, setToggleDeleteOrder]= useState(false)
//     const [toggleViewCustomer, setToggleViewCustomer]=useState(false)
//     const [toggleViewItems, setToggleViewItems]= useState(false)
//     const [customerToView, setCustomerToView]= useState('')
//     const [itemsToView, setItemsToView]= useState([])
//     const [orderToBeActedOn, setOrderToBeActedOn]= useState({})

    

//     //WHEN QUERY STRING CHANGES, START FROM PAGE 1
//     useEffect(()=>{
//     var newQueryParams= {
//         ...queryParams,
//         page: 1
//     }
//     history.push({
//         pathname: '/admin',
//         search: queryString.stringify(newQueryParams)
//     })
//         // setPageNumber(1)
//     },[queryParams.q])

//     useEffect(()=>{
//         // var sortTerm= extractTerm(queryParams.sort) === '' ? 'latest' : extractTerm(queryParams.sort)
//         var searchTerm= extractTerm(queryParams.q)
//         // var brandFilter= extractTerm(queryParams.brand)
//         // var categoryFilter= extractTerm(queryParams.category)
//         // var subCategoryFilter= extractTerm(queryParams.subCategory)
//         dispatch(listOrders(searchTerm ,ordersPerPage, pageNumber))
//     },[dispatch, queryParams.q, ordersPerPage, pageNumber])
//     useEffect(()=>{
//         dispatch(getOrdersCount())
//       },[dispatch])
//     //TO Helper function
//     var pageCount= Math.ceil(count/ordersPerPage)

//     //==========PAGINATION FUNCTIONS=======/
//     const getCurrentPage=()=>{
//         if(extractTerm(queryParams.page) !==''){
//             return Number(extractTerm(queryParams.page))-1
//         }else{
//           return pageNumber-1
    
//       }
//     }
//     const changePage =({selected})=>{ 
//       console.log(selected)
//       setPageNumber(selected+1)
//       var newQueryParams= {
//         ...queryParams,
//         page:selected+1,
//       }
//       history.push({
//         pathname: '/admin',
//         search: queryString.stringify(newQueryParams)
//     })
//     }
//     //======================================//

//     //==================== CRUD FUNCTIONS FOR PRODUCT ====================//
//     const handleViewCustomer=(customerId)=>{
       
//         setCustomerToView(customerId)
//         setToggleViewCustomer(true)
//     }
//     const handleViewItems=(items)=>{
//       setItemsToView(items)
//       setToggleViewItems(true)
//     }
//    const handleEditOrder=(orderId, newStatus)=>{
//         dispatch(updateOrder(orderId, newStatus))
//         setToggleEditOrder(false)
//    }
//     const handleDeleteOrder=(id)=>{
//         dispatch(deleteOrder(id))
//         setToggleDeleteOrder(false)
//     }
//     const handleEditToggle=(order)=>{ 
//         setOrderToBeActedOn(order)
//         setToggleEditOrder(true)

//     }
//     const handleDeleteToggle=(order)=>{
//         setOrderToBeActedOn(order)
//         setToggleDeleteOrder(true)
//     }
//   //================================================================================//

// //============================== SEARCH FUNCTION ======================//

//     const handleSearchChange=(e)=>{
//         setSearchInput(e.target.value)
//     }
//     const handleKeyDown=(e)=>{
//         if(e.keyCode !== 13){
//         return 
//     }
//     var newQueryParams= {
//       ...queryParams,
//       q: searchInput
//     }
//     setSearchInput('')
//         history.push({
//             pathname: '/admin',
//             search: queryString.stringify(newQueryParams)
//         })
//   }
  
//   const handleSearch=()=>{
  
//         var newQueryParams= {
//           ...queryParams,
//           q: searchInput
//         }
//         setSearchInput('')
//         history.push({
//             pathname: '/admin',
//             search: queryString.stringify(newQueryParams)
//         })
      
//   }

//   const clearSearch=()=>{
//     // var newQueryParams= {
//     //     ...queryParams,
//     //     q: ''
//     //   }
//       setSearchInput('')
//       history.push({
//           pathname: '/admin',
//           search: ''//queryString.stringify(newQueryParams)
//       })
//   }
//   //====================================================================\\

//   //================================== FILTER FUNCTION =====================================\\

//   // const handleSetRowPerPage=(e)=>{
//   //   console.log(e.target.value)
//   //     setOrdersPerPage(e.target.value)
//   // }
//   //===================================================================================\\
//   //========================================SORTING FUNCTION ================================\\
// // const handleSortSelect=(value)=>{
// //   console.log(value)
// //   setSortChoice(value)
// //   var newQueryParams= {
// //     ...queryParams,
// //     sort: value
// //   }
// //   history.push({
// //     pathname: '/admin',
// //     search: queryString.stringify(newQueryParams)
// // })
// // }
// //==========================================================================================\\
//     return (
//                  <div className='orders'>
//                      <div className='orders__header'>
//                             <div></div>
//                             <div className='search__container'>
//                                     <SearchComponent
//                                         handleSearch={handleSearch}
//                                         handleSearchChange={handleSearchChange}
//                                         handleKeyDown={handleKeyDown}
//                                         userInput={searchInput}/>
//                             </div>
                           
//                      </div>
//                      <div className='admin__orders__filter'>
//                        {/* <AdminProductsFilter 
//                        handleBrandChange={handleBrandChange}
//                        brandInput={brandInput}
//                        handleCategoryChange={handleCategoryChange}
//                        categoryInput={categoryInput}
//                        handleSetRowPerPage={handleSetRowPerPage}
//                        rowsPerPage={productsPerPage}
//                        sortChoice={sortChoice}
//                        handleSortSelect={handleSortSelect}/> */}
//                      </div>

                     

//                      {count < ordersCount &&
//                      <div  className='found__results'>
//                         <p>{orders.count}{" "}{orders.count > 1 ? 
//                         "results found." : "result found."}{" "}
//                         <span className='clear__Search' onClick={()=>{clearSearch()}}>
//                             Clear search
//                             </span>
//                         </p>
//                         </div>} 

//                     { loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> :
                    
//                      <div className="orders__table__container">
//                             <table className="orders__table" border="0" cellSpacing="0" cellPadding="0"> 
//                             <thead>
//                                 <tr className='table__row'>
//                                     <th>#</th>
//                                     <th width='20%' className='same'>Invoice No</th>
//                                     <th className='hide__at__mobile' width='20%'>Date</th>
//                                     <th width='10%' className='hide__at__mobile'>Items</th>
//                                     <th width='10%' className='same'>Total</th>
//                                     <th width='20%' className='same'>Customer</th>
//                                     <th width='20%'className='same'>Action</th>
//                                  </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     fetchedOrders.map(order=>{
//                                         return <OrderItem 
//                                                      key={order._id}
//                                                      order={order}
//                                                      handleEditToggle={handleEditToggle}
//                                                      handleDeleteToggle={handleDeleteToggle}
//                                                      handleViewItems={handleViewItems}
//                                                      handleViewCustomer={handleViewCustomer}
//                                                     />
//                                     })
//                                 }
//                             </tbody>
//                             </table>
//                      </div>
                      
// }
// {count > ordersPerPage  &&
// <div className='page__component__container'>
//                       <ReactPaginate
//                         previousLabel={"Previous"}
//                         nextabel={"Next"}
//                         pageCount={pageCount}
//                         onPageChange={changePage}
//                         forcePage={getCurrentPage()}
//                         containerClassName={"pagination__btns"}
//                         previousLinkClassName={"previous__btn"}
//                         nextClassName={"next__btn"}
//                         activeClassName={"pagination__active"}/>
//                       </div>}
//                     {/* <NewProduct show={toggleAddProduct}
//                                 create={addProduct}
//                                 cancel={()=>setToggleAddProduct(false)}
//                                 />*/}
//                     <EditOrder show={toggleEditOrder}
//                                 edit={handleEditOrder}
//                                 cancel={()=>setToggleEditOrder(false)}
//                                 order={orderToBeActedOn}
//                                 /> 
//                      <ViewItems
//                      items={itemsToView}
//                      show={toggleViewItems}
//                      cancel={()=>setToggleViewItems(false)}/>

//                     <ViewCustomer
//                      customerId={customerToView}
//                      show={toggleViewCustomer}
//                      cancel={()=>setToggleViewCustomer(false)}/>
                     
//                     <DeleteModal
//                                 show={toggleDeleteOrder}
//                                 handleDelete={handleDeleteOrder}
//                                 cancel={()=>setToggleDeleteOrder(false)}
//                                 id={orderToBeActedOn._id}
//                                 toDelete={'order'}/>
//                 </div>
//     )
//   }
  
//   export default Orders;
