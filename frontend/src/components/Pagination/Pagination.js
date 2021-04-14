import React, { Fragment }            from 'react';
import './Pagination.css'

 const Pagination =  ({rowsPerPage, totalProducts, paginate, currentPage}) =>{
	 
	 //============VISIBLE PAGE LINKS FUNCTION=======================\\
	function getPagingRange(current, min = 1, total = 20, length = 5) {
	  if (length > total) length = total;

	  let start = current - Math.floor(length / 2);
	  start = Math.max(start, min);
	  start = Math.min(start, min + total - length);

	  return Array.from({length: length}, (el, i) => start + i);
	}


	const numPages=Math.ceil(totalProducts/rowsPerPage);
	var start=1;
	const List= getPagingRange(currentPage, start, numPages, 5)
	const pageLinks =[]
	 
	//====================CREATING PAGE LINKS=========================\\
		  List.forEach(function(page){
			  let active= currentPage===page ? 'active' : '';
			  
			   pageLinks.push(
		 						<a className={`page-item page-link ${active}`}  key={page} onClick={()=>paginate(page)}>
									{page}
							  	</a>)
			  
		 		 })
	 

	 return (
		 <Fragment>
			 {numPages>1 ?
						<div className='pagination justify-content-center'arie-abel='user results pages'>
							
							{currentPage>3 &&
								<a  className={`page-item page-link`} onClick={()=>paginate(1)}>
									Start
								</a>}
							{currentPage>1 ?
								<a className={`page-item page-link`} onClick={()=>paginate(currentPage-1)}>
									&laquo;
								</a>
							:''}
							{pageLinks}
							{currentPage < numPages ?
								<a className={`page-item page-link`}onClick={()=>paginate(currentPage+1)}>
									&raquo;
								</a>
							:''}
							{  currentPage<numPages-3 &&
								<a className={`page-item page-link`} onClick={()=>paginate(numPages)}>
									Last
								</a>}
						</div>
					: paginate(1)
		 				}
	 		</Fragment>
	 )
 }
 

export  default Pagination; 

// {numPages>1 ?  <nav >
//     <ul className='pagination justify-content-center'arie-abel='user results pages'>
        
//         {currentPage>3 &&
//             <li className={`page-item `} onClick={()=>paginate(1)} >
//             <a className="page-link">
//                 Start
//             </a>
//             </li>}
//         {currentPage>1 ?
//             <li className={`page-item `} onClick={()=>paginate(currentPage-1)}>
//             <a className="page-link">
//                 &laquo;
//             </a>
//             </li>
//         :''}
//         {pageLinks}
//         {currentPage < numPages ?
//             <li className={`page-item`}onClick={()=>paginate(currentPage+1)}>
//             <a className="page-link">
//                 &raquo;
//             </a>
//             </li>
//         :''}
//         {  currentPage<numPages-3 &&
//             <li className={`page-item `} onClick={()=>paginate(numPages)}>
//             <a className="page-link">
//                 Last
//             </a>
//             </li>}
//     </ul>

// </nav>