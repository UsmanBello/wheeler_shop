import './AuthScreen.css'
import {acceptedEmail, 
        acceptedPassword, 
        isEmptyField,
        passwordsMatch} from '../../utils/helpers';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

//COMPONENTS
import Invalid from '../../components/Invalid/Invalid'
import Required from '../../components/Required/Required'
//ACTIONS
import {authUser} from '../../redux/actions/authActions'

const AuthScreen=({isSignup, history})=>{
  
const dispatch= useDispatch()
const currentUser=useSelector(state=>state.currentUser)
const {loading, error, isAuthenticated, user} = currentUser

const [formData, setFormData]= useState({email: '', password: '',password2:'', firstName: '', lastName: ''})
const [showLoginError, setShowLoginError]= useState(false)
const [err, setErr]=useState({
    requireFirstName: false,
    requireLastName: false,
    requireEmail: false,
    requirePassword: false,
    requirePassword2: false,
    invalidEmail: false,
    invalidPassword: false,
    passwordsMissMatch: false
})
useEffect(()=>{
    if(isAuthenticated){
        console.log('pushed')
        history.push('/admin')
    }
    if(error){
        setShowLoginError(true)
    }
  
},[currentUser])
useEffect(()=>{
    setShowLoginError(false)
 setErr({
    requireFirstName: false,
    requireLastName: false,
    requireEmail: false,
    requirePassword: false,
    requirePassword2: false,
    invalidEmail: false,
    invalidPassword: false,
    passwordsMissMatch: false
 })
},[isSignup])
const handleChange=(e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
    e.target.name==='firstName' && setErr({...err, requireFirstName: false})
    e.target.name==='lastName' && setErr({...err, requireLastName: false})
    e.target.name==='email' && setErr({...err, requireEmail: false, invalidEmail: false})
    e.target.name==='password' && setErr({...err, requirePassword: false, invalidPassword: false})
    e.target.name==='password2' && setErr({...err, requirePassword2: false, passwordsMissMatch: false})
}

const login=()=>{
    const {email, password}= formData
    if( isEmptyField(email) || isEmptyField(password) || !acceptedEmail(email) ||!acceptedPassword(password) ){
            setErr({...err,
                requireEmail: isEmptyField(email),
                requirePassword: isEmptyField(password),
                invalidEmail: !acceptedEmail(email),
                invalidPassword: !acceptedPassword(password),
            })
            return ;
        }
        dispatch(authUser('signin', {email, password}))
        //Passing the prevPathState so that we can use it in protected route
        // history.push({pathname: '/admin', state: {prevPath:'/login-admin'}})
}
const signUp=()=>{
    const {firstName, lastName, email, password, password2}= formData
    if( isEmptyField(firstName) ||
        isEmptyField(lastName)|| 
        isEmptyField(email) || 
        isEmptyField(password) ||
        !acceptedEmail(email) ||
        !acceptedPassword(password) ||
        !passwordsMatch(password, password2)){
            setErr({
                requireFirstName: isEmptyField(firstName),
                requireLastName: isEmptyField(lastName),
                requireEmail: isEmptyField(email),
                requirePassword: isEmptyField(password),
                requirePassword2: isEmptyField(password2),
                invalidEmail: !acceptedEmail(email),
                invalidPassword: !acceptedPassword(password),
                passwordsMissMatch: !passwordsMatch(password, password2)
            })
            return
        }
        console.log(formData)
        dispatch(authUser('signup', {firstName, lastName, email, password}))
        //Passing the prevPathState so that we can use it in protected route (distinguish between protected and 404)
        // prevPath check makes the initial "notFound page" disappear on initial login.
            
        // },3000)
         
}
const handleSubmit=(e)=>{
    e.preventDefault()
    if(isSignup){
     signUp()
    }else{
        login()
    }

}

return (
    <div className='authscreen__container'>
        
            <div className='auth__form__container'>
            { showLoginError && 
            <p style={{color: "red", textAlign:'center'}}>{error}</p>}
                    <form onSubmit={(e)=>handleSubmit(e)} className='auth__form'>
                        <header className='auth__form__header'>
                            {isSignup ? 'Sign up' : 'Sign in'}
                        </header>
                     {isSignup &&
                      <>
                        <div className='auth__form__input__row'>
                            <label className='auth__form__label'>
                                First name 
                            </label>
                            <input
                            className={err.requireFirstName? 'auth__input__error': 'auth__input'}
                            name='firstName'
                            value={formData.firstName}
                            type='text'
                            onChange={(e)=>handleChange(e)}
                            /> 
                            <Required field={'First name'} display={err.requireFirstName}/>
                        </div>
                        <div className='auth__form__input__row'>
                            <label className='auth__form__label'>
                                Last name 
                            </label>
                            <input
                            className={err.requireLastName? 'auth__input__error': 'auth__input'}
                            name='lastName'
                            value={formData.lastName}
                            type='text'
                            onChange={(e)=>handleChange(e)}
                            />
                            <Required field={'Last name'} display={err.requireLastName}/>
                        </div>  
                        </>
                        } 
                        <div className='auth__form__input__row'>
                            <label className='auth__form__label'>
                                Email 
                            </label>
                            <input
                            className={err.requireEmail || err.invalidEmail ? 'auth__input__error': 'auth__input'}
                            name='email'
                            value={formData.email}
                            type='text'
                            onChange={(e)=>handleChange(e)}
                            />
                            <Required field={'Email'} display={err.requireEmail}/>
                            {!err.requireEmail && <Invalid field={'Email'} display={err.invalidEmail}/>}
                        </div>
                        <div className='auth__form__input__row'>
                            <label className='auth__form__label'>
                                Password 
                            </label>
                            <input
                            className={err.requirePassword || err.invalidPassword ? 'auth__input__error': 'auth__input'}
                            name='password'
                            value={formData.password}
                            type='password'
                            onChange={(e)=>handleChange(e)}
                            />
                            <Required field={'Password'} display={err.requirePassword}/>
                            {!err.requireEmail && <Invalid field={'Password'} display={err.invalidPassword}/>}
                        </div>
                        {isSignup &&
                        <div className='auth__form__input__row'>
                            <label className='auth__form__label'>
                                Confirm Password
                            </label>
                            <input
                            className={err.requirePassword2 || err.passwordsMissMatch ? 'auth__input__error': 'auth__input'}
                            name='password2'
                            value={formData.password2}
                            type='password'
                            onChange={(e)=>handleChange(e)}
                            />
                            <Required field={'Password'} display={err.requirePassword}/>
                            {!err.requireEmail && <Invalid field={"Confirm Password"} display={err.passwordsMissMatch}/>}
                        </div>
                        }   
                        <button className='auth__form__button'>
                            {isSignup ? 'Create Account' : 'Login'}
                        </button>
                        {!isSignup && <p className='auth__forgot__password__link'>Forgot password?</p>}
                    </form>
            </div>
    </div>
)


}

export default AuthScreen