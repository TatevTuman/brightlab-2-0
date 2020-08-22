import { Navigation } from '@types'

// If you want to change navigation you should check
// Declared module in index.d.ts and @types/
const navigation: Navigation = [
  {
    to: '/',
    label: 'Home',
    roles: ['user']
  },
  {
    to: '/typography',
    label: 'Typography',
    roles: ['user']
  },
  {
    to: '/users',
    label: 'User',
    roles: ['admin', 'user']
  },
  {
    to: '/books',
    label: 'Books',
    roles: ['admin', 'user']
  }
]

export default navigation
