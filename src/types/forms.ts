export type TestOptionValue = { test: string }
export type RoleOptionValue = { name: string }
export type JobOptionValue = { name: string }

export type TestForm = {
  test: TestOptionValue
}

export type SignInForm = {
  email: string
  password: string
  remember: boolean
}

export type SignUpForm = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: RoleOptionValue
  job: JobOptionValue
}
