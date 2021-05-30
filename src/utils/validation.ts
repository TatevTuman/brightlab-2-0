export const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordPattern = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
)

export const phoneNumberPattern = new RegExp('^[+]*[0-9]{1,4}[0-9]*$')

export const passwordValidation = {
  minLength: { value: 6, message: 'Password must have a minimum of 6 letters.' },
  pattern: {
    value: passwordPattern,
    message: 'Password must includes one lower case letter, one upper case letter, one diggit'
  }
}

export const emailValidation = {
  pattern: {
    value: emailPattern,
    message: 'Enter a valid e-mail or phone number'
  }
}
