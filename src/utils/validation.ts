export const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const passwordValidation = {
  minLength: { value: 6, message: 'Password must have a minimum of 6 letters.' },
  pattern: {
    value: passwordPattern,
    message: 'Password must includes one lower case letter, one upper case letter, one digit'
  }
}
