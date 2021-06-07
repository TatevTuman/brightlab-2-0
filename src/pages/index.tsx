import React, { memo, useState } from 'react'
import { Seo } from '~components'
import { Menu, ListBox, Switch, Checkbox, Radio, Disclosure, Dialog } from '~elements'
import { OptionType } from '~types'

const IndexPage = () => {
  const [showListBox, setShowListBox] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [checked, setChecked] = useState(false)
  const [selected, setListBoxed] = useState<OptionType | null>(null)
  const [dialogShowed, showDialog] = useState(false)

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
      <ListBox
        show={showListBox}
        options={options}
        value={selected}
        onChange={setListBoxed}
        onShow={setShowListBox}
        onHide={setShowListBox}
      >
        <div>Children</div>
      </ListBox>
      <Menu show={showDropdown} options={options} onShow={setShowDropdown} onHide={setShowDropdown}>
        <div>Children</div>
      </Menu>
      <Switch value={checked} onChange={setChecked} />
      <Checkbox name={'checkbox'} label={'Hello world'} value={checked} onChange={setChecked} />
      <Radio name={'radio'} label={'Hello world'} value={checked} onChange={setChecked} />
      <Disclosure
        title={'Disclosure'}
        description={
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam culpa cumque ducimus eius explicabo fuga fugit laboriosam, laudantium, nobis officiis quaerat quis repellendus sint vero!'
        }
      />
      <button onClick={() => showDialog(true)}>Show dialog</button>
      <Dialog show={dialogShowed} onHide={showDialog}>
        <h3>Title</h3>
        <p>Content</p>
      </Dialog>
    </section>
  )
}

export default memo(IndexPage)
