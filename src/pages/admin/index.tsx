import React from 'react'
import { Router } from '@reach/router'
import { Link } from '@elements'
import View from './pages/View'
import Create from './pages/Create'
import Update from './pages/Update'

const DynamicRouter = () => {
  return (
    <>
      <h1>Admin route</h1>
      <nav data-direction="vertical">
        <li>
          <Link to={'/admin/view/1'}>View</Link>
        </li>
        <li>
          <Link to={'/admin/create/1'}>Create</Link>
        </li>
        <li>
          <Link to={'/admin/update/1'}>Update</Link>
        </li>
      </nav>
      <Router>
        <View path="/admin/view/:id" />
        <Create path="/admin/create/:id" />
        <Update path="/admin/update/:id" />
      </Router>
    </>
  )
}

export default DynamicRouter
