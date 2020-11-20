import { cleanup } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import useSiteMetadata from './useSiteMetadata'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('UseLoadingDelay', () => {
  it('useDelayEffect', () => {
    const { result } = renderHook(useSiteMetadata)

    expect(result.current).toMatchObject({
      title: 'Brightlab Gatsby boilerplate',
      author: {
        name: 'Adjutant',
        summary: 'DRY - make things once, make them fast'
      },
      description: 'Brightlab Gatsby project to start',
      siteUrl: 'https://url-to-site-deploy/',
      navigation: [
        { path: '/', label: 'Home' },
        { path: '/typography', label: 'Typography' },
        { path: '/sign-in', label: 'Sign in' },
        { path: '/sign-up', label: 'Sign up' },
        { path: '/dynamic', label: 'Dynamic' }
      ]
    })
  })
})
