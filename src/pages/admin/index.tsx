import React from 'react'
import { navigate } from 'gatsby'
import { Router } from '@reach/router'
import { GolfClubModelsPaginated } from '@components'
import { GolfClubModel } from '@types'
import View from './pages/View'
import Create from './pages/Create'
import Update from './pages/Update'

const DynamicRouter = () => {
  const handleGolfClubModelClick = async (golfClubModel: GolfClubModel) => {
    await navigate(`/admin/view/${golfClubModel.id}`)
  }

  return (
    <section>
      <h1>Admin route</h1>
      <Router>
        <View path="/admin/view/:id" />
        <Create path="/admin/create/:id" />
        <Update path="/admin/update/:id" />
      </Router>
      <GolfClubModelsPaginated onItemClick={handleGolfClubModelClick} />
    </section>
  )
}

export default DynamicRouter
