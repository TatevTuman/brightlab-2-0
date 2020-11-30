export type RoleOptionValue = { test: string }

export type SignInForm = {
  email: string
  password: string
  role: RoleOptionValue
  remember: boolean
}

export type SignUpForm = {
  firstName: string
  lastName: string
  email: string
  password: string
}
