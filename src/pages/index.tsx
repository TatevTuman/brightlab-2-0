import React from 'react'
import GatsbyImage, { FixedObject, FluidObject } from 'gatsby-image'
import { graphql, StaticQuery } from 'gatsby'
import { SEO } from '@components'
import { Image, Button, Link } from '@elements'
import Page, { PageLayerProps, PageLayerState } from '../layers/Page'
import PageLayer from '../layers/Page'
import Logo from '@images/logo.svg'

type StaticImageQuery = {
  imageFluid: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
  imageFixed: {
    childImageSharp: {
      fixed: FixedObject
    }
  }
}

interface HomeProps extends PageLayerProps {}

interface HomeState extends PageLayerState {
  home: boolean
}

class Home extends Page<HomeProps, HomeState> {
  state: HomeState

  constructor(props: HomeProps) {
    const supper = (super(props) as unknown) as PageLayer<HomeProps, HomeState>

    this.state = {
      ...supper.state,
      home: true
    }
  }

  render() {
    const logoStyles = {
      position: 'absolute' as const,
      top: 0,
      right: 0
    }

    return (
      <section>
        <SEO title={'Home'} />
        <h1>
          <mark>Brightlab</mark>
          <br />
          <strong>Gatsby</strong>
          <br />
          Boilerplate
        </h1>
        <h2>Check all features</h2>
        <Logo style={logoStyles} />
        <h3>
          <ul>
            <li>
              <Link to="/typography">Typography</Link>
            </li>
            <li>
              <a href="http://localhost:6006/" target="_blank" rel="noreferrer">
                Storybook
              </a>
              <small>
                <p className="dark-blue">- yarn storybook</p>
              </small>
            </li>
            <li>Typescript</li>
            <li>React</li>
            <li>
              Jest
              <small>
                <p className="dark-blue">- yarn test --watch</p>
              </small>
            </li>
          </ul>
        </h3>
        <Image filename={'test.png'} />
        <StaticQuery<StaticImageQuery>
          query={graphql`
            query {
              imageFluid: file(relativePath: { eq: "test.png" }) {
                ...ImageFluid
              }
              imageFixed: file(relativePath: { eq: "test.png" }) {
                ...ImageFixed600x600 # @elements/Image 62:line working only of element was imported
              }
            }
          `}
        >
          {data => {
            const fluid = data.imageFluid.childImageSharp.fluid
            const fixed = data.imageFixed.childImageSharp.fixed

            return (
              <>
                <GatsbyImage fluid={fluid} />
                <GatsbyImage fixed={fixed} />
              </>
            )
          }}
        </StaticQuery>
      </section>
    )
  }
}

export default Home
