export const extractTerm=(term)=>{
    if(term===undefined){
      return ''
    }else{
      return term
    }
}
//CHECKS IF INPUT FIELD IS EMPTY -------> RETURNS TRUE IF FIELD IS EMPTY
export function isEmptyField(name) {
  console.log(name)
  return name.toString().trim() === "";
}

//CHECK IF EMAIL PASSES REGEX TEST---> RETURNS TRUE IF EMAIL MATCHES PATTERN
export function acceptedEmail(email) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

//CHECKS IF EMAILS MATCH --------> RETURNS TRUE IF EMAILS MATCH
export function emailsMatch(email, email2) {
  return email === email2;
}

//CHECK IF PASSWORD IS VALID------------>RETURNS TRUE IF PASSWORD MATCHES PASSWORD PATTERN
//(must be 8 xters long and contain atlest[1-numeric, 1-uppercase, 1-lowercase, 1-special-xter])
export function acceptedPassword(password) {
  var strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return strongRegex.test(password);
}

//CHECKS IF PASSWORDS MATCH------------->RETURNS TRUE IF PASSWORDS MATCH
export function passwordsMatch(password, password2) {
  return password === password2;
}

export function isNumber(value) {
  return /^\d+$/.test(value);
}

