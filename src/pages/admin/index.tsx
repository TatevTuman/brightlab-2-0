import React from 'react'
import { Router } from '@reach/router'
import { PaginatedGolfClubModels } from '@components'
import View from './pages/View'
import Create from './pages/Create'
import Update from './pages/Update'

const DynamicRouter = () => {
  return (
    <section>
      <Router>
        <View path="/admin/view/:id" />
        <Create path="/admin/create/:id" />
        <Update path="/admin/update/:id" />
      </Router>
      <PaginatedGolfClubModels />
    </section>
  )
}

export default DynamicRouter
