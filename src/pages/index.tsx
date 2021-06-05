import React, { memo, useState } from 'react'
import { Seo } from '~components'
import { Menu, Select } from '~elements'
import { OptionType } from '~types'

const IndexPage = () => {
  const [showSelect, setShowSelect] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selected, setSelected] = useState<OptionType | null>(null)

  const options = [
    { label: 'Wade Cooper', value: 'Wade Cooper' },
    { label: 'Arlene Mccoy', value: 'Arlene Mccoy' },
    { label: 'Devon Webb', value: 'Devon Webb' },
    { label: 'Tom Cook', value: 'Tom Cook' },
    { label: 'Tanya Fox', value: 'Tanya Fox' },
    { label: 'Hellen Schmidt', value: 'Hellen Schmidt' }
  ]

  return (
    <section className="bg-white pt-20">
      <Seo title={'Home'} />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <h1 className="tracking-tight text-black-1000">
          <span className="block">Ready to dive in?</span>
          <span className="block text-green-600">Welcome to the Gatsby Boilerplate for Brightlab!</span>
        </h1>
        <div className="mt-8 flex">
          <button className="btn btn-green">Get started</button>
          <div className="btn btn-green-white ml-10">Learn more</div>
        </div>
      </div>
      <Select
        show={showSelect}
        options={options}
        selected={selected}
        onSelect={setSelected}
        onShow={setShowSelect}
        onHide={setShowSelect}
      >
        <div>Children</div>
      </Select>
      <Menu show={showDropdown} options={options} onShow={setShowDropdown} onHide={setShowDropdown}>
        <div>Children</div>
      </Menu>
    </section>
  )
}

export default memo(IndexPage)
