import { Navigation } from '@types'

// If you want to change navigation you should check
// Declared module in index.d.ts and @types/
const navigation: Navigation = [
  {
    to: '/',
    label: 'Home'
  },
  {
    to: '/typography',
    label: 'Typgraphy'
  },
  {
    to: '/users',
    label: 'User'
  },
  {
    to: '/books',
    label: 'Books'
  }
]

export default navigation
