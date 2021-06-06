import './Customers.css';
import {useEffect, useState} from 'react';
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { extractTerm } from '../../../../utils/helpers';
import {useSelectOption} from '../../../../utils/hooks';

//Actions
import { getCustomers as listCustomers,
    getCustomersCount,//for changing order status to shipped or whatever
    deleteCustomer } from '../../../../redux/actions/customerActions';

//Component
import Customer  from './Customer';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
import SearchComponent from '../../../../components/Search/SearchComponent';
import ViewOrders from './ViewOrders'
import ViewCustomer from '../../../../components/ViewCustomer/ViewCustomer'
import MySelect from '../../../../components/SelectInput/MySelect';
// import AdminProductsFilter from './AdminProductsFilter';

const Customers =({location, history}) => {

    const { search }  = location
    const queryParams = queryString.parse(search)

    
    const dispatch= useDispatch()
    const getCustomers = useSelector(state=>state.customer)
    const { customers, customersCount, loading, error} = getCustomers
    const { fetchedCustomers, count} = customers
    //PAGINATE
    const [pageNumber, setPageNumber]= useState(queryParams.page ? Number(queryParams.page): 1)
    const [customersPerPage, setCustomersPerPage]=useState(queryParams.rows ? Number(queryParams.rows) : 15)
    //OTHER
    const [searchInput, setSearchInput]= useState('')
    const [toggleDeleteCustomer, setToggleDeleteCustomer]= useState(false)
    const [customerToBeActedOn, setCustomerToBeActedOn]= useState('')
    const [toggleViewCustomer, setToggleViewCustomer]= useState(false)
    const [toggleViewOrders, setToggleViewOrders] = useState(false)
    

    useEffect(()=>{
      setPageNumber(queryParams.page ? Number(queryParams.page): 1)
    },[queryParams.page])
    useEffect(()=>{
        var searchTerm= extractTerm(queryParams.q)
        dispatch(listCustomers(searchTerm, customersPerPage, pageNumber))
    },[dispatch, search, customersPerPage, pageNumber])
    useEffect(()=>{
      dispatch(getCustomersCount())
    },[dispatch])
  

    //==========PAGINATION FUNCTIONS=======/

    var pageCount= Math.ceil(count/customersPerPage)

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
        setCustomerToBeActedOn(customerId.toString())
        setToggleViewCustomer(true)
    }
    const handleViewOrders=(customerId)=>{
      setCustomerToBeActedOn(customerId.toString())
      setToggleViewOrders(true)
    }
    // console.log(customerToBeActedOn)
    const handleDeleteCustomer=(id)=>{
            dispatch(deleteCustomer(id))
            setToggleDeleteCustomer(false)
    }
    const handleDeleteToggle=(customerId)=>{
        setCustomerToBeActedOn(customerId)
        setToggleDeleteCustomer(true)
    }
  //================================================================================//

//============================== SEARCH FUNCTIONS ======================//

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
        search: queryString.stringify({admin_option: 'customers'})
    })
  }
  //====================================================================\\

 
  //========================================SORTING FUNCTION ================================\\
const handleSelectRows=(value)=>{
  setCustomersPerPage(value)
}
//==========================================================================================\\
    return (
                 <div className='customers'>
                     <div className='customers__header'>
                            <div className='customers__header__left'>
                              <MySelect
                                selectedValue={customersPerPage}
                                handleSelectValue={handleSelectRows}
                                selectOptions={useSelectOption().rowsPerPageOptions}
                              />
                            </div>
                            <div className='search__container'>
                                    <SearchComponent
                                        handleSearch={handleSearch}
                                        handleSearchChange={handleSearchChange}
                                        handleKeyDown={handleKeyDown}
                                        userInput={searchInput}/>
                            </div>
                           
                     </div>
                    
                     
                     { loading ? <h2>Loading</h2> : error ? <h2>{error}</h2> :
                     <>
                     {count < customersCount &&
                     <div  className='found__results'>
                        <p>{customers.count}{" "}{customers.count > 1 ? 
                        "results found." : "result found."}{" "}
                        <span className='clear__Search' onClick={()=>clearSearch()}>
                            Clear search
                            </span>
                        </p>
                        </div>} 

                    
                    
                     <div className="customers__table__container">
                            <table className="customers__table" border="0" cellSpacing="0" cellPadding="0"> 
                            <thead>
                                <tr className='table__row'>
                                    <th width='5%'>#</th>
                                    <th width='20%' className='same'>Name</th>
                                    <th width='20%' className='hide__at__mobile'>Email</th>
                                    <th width='20%' className='same'>Mobile No</th>
                                    <th width='10%'>Orders</th>
                                    <th width='10%'>Action</th>
                                 </tr>
                            </thead>
                            <tbody>
                                {
                                    fetchedCustomers.map(customer=>{
                                        return <Customer 
                                                     key={customer._id}
                                                     customer={customer}
                                                     handleDeleteToggle={handleDeleteToggle}
                                                     handleViewCustomer={handleViewCustomer}
                                                     handleViewOrders={handleViewOrders}
                                                    />
                                    })
                                }
                            </tbody>
                            </table>
                     </div>
                     </>
                      
}
{count > customersPerPage  &&
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
                                />
                    <EditProduct show={toggleEditProduct}
                                edit={editProduct}
                                cancel={()=>setToggleEditProduct(false)}
                                product={productToBeActedOn}
                                /> */}
                     {/* <ViewItems
                     items={itemsToView}
                     show={toggleViewItems}
                     cancel={()=>setToggleViewItems(false)}/>
 */}
                    <ViewCustomer
                     customerId={customerToBeActedOn}
                     show={toggleViewCustomer}
                     cancel={()=>setToggleViewCustomer(false)}/> 
         {toggleViewOrders &&
                     <ViewOrders
                     customerId={customerToBeActedOn}
                     show={toggleViewOrders}
                     cancel={()=>setToggleViewOrders(false)}
                     />}
                    
                    <DeleteModal
                                show={toggleDeleteCustomer}
                                handleDelete={handleDeleteCustomer}
                                cancel={()=>setToggleDeleteCustomer(false)}
                                id={customerToBeActedOn}
                                toDelete={'customer'}/> 
                </div>
    )
  }
  
  export default Customers;


// import './Customers.css';
// import {useEffect, useState} from 'react';
// import queryString from 'query-string';
// import ReactPaginate from 'react-paginate';
// import { useSelector, useDispatch } from 'react-redux';
// import { extractTerm } from '../../../../utils/helpers';


// //Actions
// import { getCustomers as listCustomers,
//     getCustomersCount,//for changing order status to shipped or whatever
//     deleteCustomer } from '../../../../redux/actions/customerActions';

// //Component
// import Customer  from './Customer';
// import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
// import SearchComponent from '../../../../components/Search/SearchComponent';
// import ViewOrders from './ViewOrders'
// import ViewCustomer from '../../../../components/ViewCustomer/ViewCustomer'
// // import AdminProductsFilter from './AdminProductsFilter';

// const Customers =({location, history}) => {

//     const { search }  = location
//     const queryParams = queryString.parse(search)

    
//     const dispatch= useDispatch()
//     const getCustomers = useSelector(state=>state.customer)
//     const { customers, customersCount, loading, error} = getCustomers
//     const { fetchedCustomers, count} = customers
//     //PAGINATE
//     const [pageNumber, setPageNumber]= useState(1)
//     const [customersPerPage, setCustomersPerPage]=useState(15)
//     //OTHER
//     const [searchInput, setSearchInput]= useState('')
//     const [toggleDeleteCustomer, setToggleDeleteCustomer]= useState(false)
//     const [customerToBeActedOn, setCustomerToBeActedOn]= useState('')
//     const [toggleViewCustomer, setToggleViewCustomer]= useState(false)
//     const [toggleViewOrders, setToggleViewOrders] = useState(false)
//     // const [customerOrdersToView, setCustomerOrdersToView] = useState('')
    

//     useEffect(()=>{
//         dispatch(getCustomersCount())
//       },[dispatch])

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
        
//     },[queryParams.q])

//     useEffect(()=>{
        
//         var searchTerm= extractTerm(queryParams.q)
//         dispatch(listCustomers(searchTerm, customersPerPage, pageNumber))
//     },[dispatch, search, customersPerPage, pageNumber])//queryParams.q
//   // console.log(fetchedCustomers)
//     //TO Helper function
//     var pageCount= Math.ceil(count/customersPerPage)

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
//         setCustomerToBeActedOn(customerId.toString())
//         setToggleViewCustomer(true)
//     }
//     const handleViewOrders=(customerId)=>{
//       setCustomerToBeActedOn(customerId.toString())
//       setToggleViewOrders(true)
//     }
//     // console.log(customerToBeActedOn)
//     const handleDeleteCustomer=(id)=>{
//             dispatch(deleteCustomer(id))
//             setToggleDeleteCustomer(false)
//     }
//     const handleDeleteToggle=(customerId)=>{
//         setCustomerToBeActedOn(customerId)
//         setToggleDeleteCustomer(true)
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

// //   const handleBrandChange=(e)=>{
// //     setBrandinput(e.target.value)
// //     var newQueryParams= {
// //       ...queryParams,
// //       brand: e.target.value
// //     }
// //     history.push({
// //       pathname: '/admin',
// //       search: queryString.stringify(newQueryParams)
// //   })
// //   }
// //   const handleCategoryChange=(e)=>{
// //     setCategoryInput(e.target.value)
// //     var newQueryParams= {
// //       ...queryParams,
// //       category: e.target.value,
// //       subCategory: ''
// //     }
// //     history.push({
// //       pathname: '/admin',
// //       search: queryString.stringify(newQueryParams)
// //   })
// //   }

//   // const handleSetRowPerPage=(e)=>{
//   //   console.log(e.target.value)
//   //     setCustomersPerPage(e.target.value)
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
//                  <div className='customers'>
//                      <div className='customers__header'>
//                             <div></div>
//                             <div className='search__container'>
//                                     <SearchComponent
//                                         handleSearch={handleSearch}
//                                         handleSearchChange={handleSearchChange}
//                                         handleKeyDown={handleKeyDown}
//                                         userInput={searchInput}/>
//                             </div>
                           
//                      </div>
//                      <div className='admin__customers__filter'>
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

                     
//                      { loading ? <h2>Loading</h2> : error ? <h2>{error}</h2> :
//                      <>
//                      {count < customersCount &&
//                      <div  className='found__results'>
//                         <p>{customers.count}{" "}{customers.count > 1 ? 
//                         "results found." : "result found."}{" "}
//                         <span className='clear__Search' onClick={()=>{clearSearch()}}>
//                             Clear search
//                             </span>
//                         </p>
//                         </div>} 

                    
                    
//                      <div className="customers__table__container">
//                             <table className="customers__table" border="0" cellSpacing="0" cellPadding="0"> 
//                             <thead>
//                                 <tr className='table__row'>
//                                     <th>#</th>
//                                     <th width='20%' className='same'>Name</th>
//                                     <th className='same' width='20%'>Email</th>
//                                     <th width='20%' className='same'>Mobile No</th>
//                                     <th width='10%' className='same'>Orders</th>
//                                     <th width='10%'className='same'>Action</th>
//                                  </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     fetchedCustomers.map(customer=>{
//                                         return <Customer 
//                                                      key={customer._id}
//                                                      customer={customer}
//                                                      handleDeleteToggle={handleDeleteToggle}
//                                                      handleViewCustomer={handleViewCustomer}
//                                                      handleViewOrders={handleViewOrders}
//                                                     />
//                                     })
//                                 }
//                             </tbody>
//                             </table>
//                      </div>
//                      </>
                      
// }
// {count > customersPerPage  &&
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
//                                 />
//                     <EditProduct show={toggleEditProduct}
//                                 edit={editProduct}
//                                 cancel={()=>setToggleEditProduct(false)}
//                                 product={productToBeActedOn}
//                                 /> */}
//                      {/* <ViewItems
//                      items={itemsToView}
//                      show={toggleViewItems}
//                      cancel={()=>setToggleViewItems(false)}/>
//  */}
//                     <ViewCustomer
//                      customerId={customerToBeActedOn}
//                      show={toggleViewCustomer}
//                      cancel={()=>setToggleViewCustomer(false)}/> 
//          {toggleViewOrders &&
//                      <ViewOrders
//                      customerId={customerToBeActedOn}
//                      show={toggleViewOrders}
//                      cancel={()=>setToggleViewOrders(false)}
//                      />}
                    
//                     <DeleteModal
//                                 show={toggleDeleteCustomer}
//                                 handleDelete={handleDeleteCustomer}
//                                 cancel={()=>setToggleDeleteCustomer(false)}
//                                 id={customerToBeActedOn}
//                                 toDelete={'customer'}/> 
//                 </div>
//     )
//   }
  
//   export default Customers;