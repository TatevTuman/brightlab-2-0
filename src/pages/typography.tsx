import React from 'react'
import { Link } from '@elements'
import { SEO } from '@components'

const Typography: React.FC = () => {
  return (
    <section>
      <SEO title={'Typography'} />
      <h1>
        Brightlab <mark>Ui</mark>
      </h1>
      <hr />
      <h2>Headings</h2>
      <h1>Brightlab Boilerplate</h1>
      <h2>Brightlab Boilerplate</h2>
      <h3>Brightlab Boilerplate</h3>
      <h4>Brightlab Boilerplate</h4>
      <h5>Brightlab Boilerplate</h5>
      <h6>Brightlab Boilerplate</h6>
      <hr />
      <h2>Paragraphs</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis interdum sollicitudin. Nunc malesuada
        at enim in ultricies. Vestibulum id malesuada massa, vel rutrum purus. Praesent dictum nibh at massa rhoncus, et
        aliquam est accumsan. Vestibulum volutpat magna vitae ipsum blandit, congue pretium metus pharetra. Morbi
        pharetra ex quam, ac convallis sem dapibus dictum.
      </p>
      <ul>
        <li>
          <p className="white" style={{ background: 'var(--black)', padding: '1rem' }}>
            Donec efficitur purus velit, eu vehicula dolor posuere in. Aliquam erat volutpat. Nullam mattis neque lacus,
            nec tristique urna porta congue. Maecenas eu placerat tellus. Nunc sodales, magna eu porttitor suscipit,
            massa massa finibus augue, at sodales ante sem vitae enim. Vestibulum aliquet, dui at rhoncus condimentum,
            purus lorem euismod magna, id imperdiet tellus ante at leo. Donec nec neque sit amet urna auctor tempus eu
            at neque. Pellentesque sed tempor dui.
          </p>
        </li>
        <li>
          <p className="dark-blue" style={{ background: 'var(--secondary)', padding: '1rem' }}>
            Donec efficitur purus velit, eu vehicula dolor posuere in. Aliquam erat volutpat. Nullam mattis neque lacus,
            nec tristique urna porta congue. Maecenas eu placerat tellus. Nunc sodales, magna eu porttitor suscipit,
            massa massa finibus augue, at sodales ante sem vitae enim. Vestibulum aliquet, dui at rhoncus condimentum,
            purus lorem euismod magna, id imperdiet tellus ante at leo. Donec nec neque sit amet urna auctor tempus eu
            at neque. Pellentesque sed tempor dui.
          </p>
        </li>
      </ul>
      <p className="blue">
        Donec efficitur purus velit, eu vehicula dolor posuere in. Aliquam erat volutpat. Nullam mattis neque lacus, nec
        tristique urna porta congue. Maecenas eu placerat tellus. Nunc sodales, magna eu porttitor suscipit, massa massa
        finibus augue, at sodales ante sem vitae enim. Vestibulum aliquet, dui at rhoncus condimentum, purus lorem
        euismod magna, id imperdiet tellus ante at leo. Donec nec neque sit amet urna auctor tempus eu at neque.
        Pellentesque sed tempor dui.
      </p>
      <ul>
        <li>
          <p className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis interdum sollicitudin. Nunc
            malesuada at enim in ultricies. Vestibulum id malesuada massa, vel rutrum purus. Praesent dictum nibh at
            massa rhoncus, et aliquam est accumsan. Vestibulum volutpat magna vitae ipsum blandit, congue pretium metus
            pharetra. Morbi pharetra ex quam, ac convallis sem dapibus dictum.
          </p>
        </li>
        <li>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis interdum sollicitudin. Nunc
            malesuada at enim in ultricies. Vestibulum id malesuada massa, vel rutrum purus. Praesent dictum nibh at
            massa rhoncus, et aliquam est accumsan. Vestibulum volutpat magna vitae ipsum blandit, congue pretium metus
            pharetra. Morbi pharetra ex quam, ac convallis sem dapibus dictum.
          </p>
        </li>
        <li>
          <p className="text-xm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis interdum sollicitudin. Nunc
            malesuada at enim in ultricies. Vestibulum id malesuada massa, vel rutrum purus. Praesent dictum nibh at
            massa rhoncus, et aliquam est accumsan. Vestibulum volutpat magna vitae ipsum blandit, congue pretium metus
            pharetra. Morbi pharetra ex quam, ac convallis sem dapibus dictum.
          </p>
        </li>
        <li>
          <p className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis interdum sollicitudin. Nunc
            malesuada at enim in ultricies. Vestibulum id malesuada massa, vel rutrum purus. Praesent dictum nibh at
            massa rhoncus, et aliquam est accumsan. Vestibulum volutpat magna vitae ipsum blandit, congue pretium metus
            pharetra. Morbi pharetra ex quam, ac convallis sem dapibus dictum.
          </p>
        </li>
        <li>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis interdum sollicitudin. Nunc
            malesuada at enim in ultricies. Vestibulum id malesuada massa, vel rutrum purus. Praesent dictum nibh at
            massa rhoncus, et aliquam est accumsan. Vestibulum volutpat magna vitae ipsum blandit, congue pretium metus
            pharetra. Morbi pharetra ex quam, ac convallis sem dapibus dictum.
          </p>
        </li>
        <li>
          <p className="text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis interdum sollicitudin. Nunc
            malesuada at enim in ultricies. Vestibulum id malesuada massa, vel rutrum purus. Praesent dictum nibh at
            massa rhoncus, et aliquam est accumsan. Vestibulum volutpat magna vitae ipsum blandit, congue pretium metus
            pharetra. Morbi pharetra ex quam, ac convallis sem dapibus dictum.
          </p>
        </li>
      </ul>
      <hr />
      <h2>Navigation</h2>
      <h4>Horizontal</h4>
      <nav>
        <li>
          <Link to="/">Link</Link>
        </li>
        <li>
          <Link className="underlined" to="/">
            Link underlined
          </Link>
        </li>
        <li>
          <Link to="/typography" active>
            Link active
          </Link>
        </li>
        <li>
          <Link className="underlined" to="/typography" active>
            Link active underlined
          </Link>
        </li>
      </nav>
      <h4>Vertical</h4>
      <nav data-direction="vertical">
        <li>
          <Link to="/">Link</Link>
        </li>
        <li>
          <Link className="underlined" to="/">
            Link underlined
          </Link>
        </li>
        <li>
          <Link to="/typography" active>
            Link active
          </Link>
        </li>
        <li>
          <Link className="underlined" to="/typography" active>
            Link active underlined
          </Link>
        </li>
      </nav>
      <hr />
      <h2>Lists</h2>
      <h4>Unordered</h4>
      <ul>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Lorem ipsum dolor sit amet</li>
      </ul>
      <h4>With selection</h4>
      <ul data-selection={true}>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Lorem ipsum dolor sit amet</li>
      </ul>
      <h4>Ordered</h4>
      <ol>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Lorem ipsum dolor sit amet</li>
      </ol>
      <h4>With selection</h4>
      <ol data-selection={true}>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Lorem ipsum dolor sit amet</li>
      </ol>
      <hr />
      <h2>Tags</h2>
      <ul>
        <li>
          &lt;b&gt; <b>Lorem ipsum dolor sit amet</b>
        </li>
        <li>
          &lt;em &gt; <em>Lorem ipsum dolor sit amet</em>
        </li>
        <li>
          &lt;i&gt; <i>Lorem ipsum dolor sit amet</i>
        </li>
        <li>
          &lt;small&gt; <small>Lorem ipsum dolor sit amet</small>
        </li>
        <li>
          &lt;strong&gt; <strong>Lorem ipsum dolor sit amet</strong>
        </li>
        <li>
          &lt;sub&gt; <sub>Lorem ipsum dolor sit amet</sub>
        </li>
        <li>
          &lt;sup&gt; <sup>Lorem ipsum dolor sit amet</sup>
        </li>
        <li>
          &lt;ins&gt; <ins>Lorem ipsum dolor sit amet</ins>
        </li>
        <li>
          &lt;del&gt; <del>Lorem ipsum dolor sit amet</del>
        </li>
        <li>
          &lt;mark&gt; <mark>Lorem ipsum dolor sit amet</mark>
        </li>
      </ul>
      <Link to="/">Go back</Link>
    </section>
  )
}

export default Typography
