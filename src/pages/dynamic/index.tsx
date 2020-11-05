import React from 'react'
import { Router } from '@reach/router'
import { Link } from '@elements'
import View from './pages/View'
import Create from './pages/Create'
import Update from './pages/Update'

const DynamicRouter = () => {
  return (
    <>
      <h1>Dynamic route</h1>
      <nav data-direction="vertical">
        <li>
          <Link to={'/dynamic/view/1'}>View</Link>
        </li>
        <li>
          <Link to={'/dynamic/create/1'}>Create</Link>
        </li>
        <li>
          <Link to={'/dynamic/update/1'}>Update</Link>
        </li>
      </nav>
      <Router>
        <View path="/dynamic/view/:id" />
        <Create path="/dynamic/create/:id" />
        <Update path="/dynamic/update/:id" />
      </Router>
    </>
  )
}

export default DynamicRouter
