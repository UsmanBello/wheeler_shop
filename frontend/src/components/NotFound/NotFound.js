import './NotFound.css'

const NotFound=()=>{
  return (
      <div className='not__found__container'>
          <div className='not__found__content'>
              <h1 className='not__found__left__header'>
                 404
             </h1>
             <div className='not__found__right__content'>
                     <h1 className='not__found__right__header'>
                         Oops! That page can’t be found.
                     </h1>
             <p className='not__found__right__paragraph'>It looks like nothing was found at this location.</p>
             </div>
         </div>
      </div>
  )
}

export default NotFound