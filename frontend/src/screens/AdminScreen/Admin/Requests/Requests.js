import './Requests.css'
import { useState, useEffect} from 'react'
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { extractTerm } from '../../../../utils/helpers';
import { useSelectOption } from '../../../../utils/hooks';

//ACTIONS
import { getRequests as listRequests,
    getRequestsCount,
    deleteRequest } from '../../../../redux/actions/requestActions';

//COMPONENTS
import RequestItem  from './RequestItem';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
import SearchComponent from '../../../../components/Search/SearchComponent';
import MySelect from '../../../../components/SelectInput/MySelect'

const Requests=({location, history})=>{
        
        const { search }  = location
        const queryParams = queryString.parse(search)
        
        const dispatch= useDispatch()
        const getRequests = useSelector(state=>state.request)
        const { requests, requestsCount, loading, error} = getRequests
        const { fetchedRequests, count} = requests

        //PAGINATE
        const [pageNumber, setPageNumber]= useState(queryParams.page ? Number(queryParams.page): 1)
        const [requestsPerPage, setRequestsPerPage]=useState(15)

        const [searchInput, setSearchInput]= useState('')
        const [toggleDeleteRequest, setToggleDeleteRequest]= useState(false)
        const [requestToBeActedOn, setRequestToBeActedOn]= useState('')

        useEffect(()=>{
            setPageNumber(queryParams.page ? Number(queryParams.page): 1)
        },[queryParams.page])
        useEffect(()=>{
            var searchTerm= extractTerm(queryParams.q)
            dispatch(listRequests(searchTerm, requestsPerPage, pageNumber))
        },[dispatch, search, requestsPerPage, pageNumber])
        useEffect(()=>{
            dispatch(getRequestsCount())
          },[dispatch])
    
        
          //==========PAGINATION FUNCTIONS=======/
        var pageCount= Math.ceil(count/requestsPerPage)
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
        
        //==================== CRUD FUNCTIONS FOR PRODUCT ====================//
    
    const handleDeleteRequest=(id)=>{
        dispatch(deleteRequest(id))
        setToggleDeleteRequest(false)
    }
    const handleDeleteToggle=(id)=>{ 
        setRequestToBeActedOn(id)
        setToggleDeleteRequest(true)
    }
   
      

       //============================== SEARCH FUNCTION ======================//

    const handleSearchChange=(e)=>{
        setSearchInput(e.target.value)
    }
    const handleKeyDown=(e)=>{
        if(e.keyCode !== 13){
        return 
    }
    // setSearchInput('')
    history.push({
        pathname: '/admin',
        search: queryString.stringify({ ...queryParams, q: searchInput, page: 1 })
    })
  }
  
  const handleSearch=()=>{
        // setSearchInput('')
        history.push({
            pathname: '/admin',
            search: queryString.stringify({ ...queryParams, q: searchInput, page: 1 })
        })
      
  }

  const clearSearch=()=>{
    setSearchInput('')
    history.push({
        pathname: '/admin',
        search: queryString.stringify({admin_option: 'requests'})
    })
  }
  //================================== ROWS PER PAGE =====================================\\

  const handleSelectRows=(value)=>{
    setRequestsPerPage(value)
  }

        
        return (
            <div className='requests'>
                <div className='requests__header'>
                    <div className='requests__header__left'>
                        <div className='requests__header__select__rows'>
                                <MySelect
                                selectedValue={requestsPerPage}
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
                <div className='admin__requests__filter'>
               
                </div>

                
                { loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> :
                <>
                {count < requestsCount &&
                <div  className='found__results'>
                <p>{count}{" "}{count > 1 ? 
                "results found." : "result found."}{" "}
                <span className='clear__Search' onClick={()=>clearSearch()}>
                    Clear search
                    </span>
                </p>
                </div>} 

               
            
                <div className="requests__table__container">
                    <table className="requests__table" border="0" cellSpacing="0" cellPadding="0"> 
                    <thead>
                        <tr className='table__row'>
                            <th width='5%'>#</th>
                            <th width='20%' className='same'>Name </th>
                            <th width='20%' className='hide__at__mobile'>Email</th>
                            <th width='20%' className='hide__at__mobile'>Phone</th>
                            <th width='20%' className='same'>Product</th>
                            <th width='10%'className=''>Action</th>
                            </tr>
                    </thead>
                    <tbody>
                        {
                            fetchedRequests.map(request=>{
                                return <RequestItem 
                                                key={request._id}
                                                request={request}
                                                handleDeleteToggle={handleDeleteToggle}
                                            />
                            })
                        }
                    </tbody>
                    </table>
                </div>
          </>      
    }
    {count > requestsPerPage  &&
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
            
                
            <DeleteModal
                        show={toggleDeleteRequest}
                        handleDelete={handleDeleteRequest}
                        cancel={()=>setToggleDeleteRequest(false)}
                        id={requestToBeActedOn}
                        toDelete={'request'}/>
        </div>
    )

}

export default Requests