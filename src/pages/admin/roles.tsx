import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Row, Col } from 'react-flexbox-grid'
import { SEO } from '@components'
import { Button } from '@elements'
import { useRolesLayer } from '@layers'

interface AdminRolesProps extends RouteComponentProps {}

const AdminRoles: React.FC<AdminRolesProps> = props => {
  const { rolesData, rolesApi } = useRolesLayer()
  const roles = (rolesData.data && rolesData.data.roles) || []

  return (
    <section>
      <SEO title={'AdminRoles'} />
      <Row middle={'xs'} between={'xs'}>
        <Col xs={8}>
          <h1>AdminRoles</h1>
        </Col>
        <Col xs={4}>
          <Button>Создать роль</Button>
        </Col>
      </Row>
      {roles.map(role => {
        return <div key={role.id}>{role.name}</div>
      })}
    </section>
  )
}

export default memo(AdminRoles)
