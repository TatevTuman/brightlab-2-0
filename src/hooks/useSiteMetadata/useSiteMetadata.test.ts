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

describe('UseSiteMetadata', () => {
  it('useSiteMetadata', () => {
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
        {
          path: '/',
          label: 'Home'
        }
      ]
    })
  })
})
