import {Link} from 'gatsby'
import React, {memo} from 'react'
import {useSiteMetadata} from '~hooks'
import * as Icon from '~svg'
import {Button} from '~ui'


interface FooterProps {
}

const FooterProps: React.FC<FooterProps> = props => {
    const {} = props

    const {navigation} = useSiteMetadata()
    return (
        <footer className="bg-violet-7">
            <div className="container">
                <div
                    className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">

                    <div className="flex justify-center space-x-30 md:order-2">

                        <svg viewBox="0 0 70 70" width="20%">

                            <path stroke={"#F1F7FB"} strokeWidth={7} d="M35,35m-23,0a23,23 0 1,1 46,0a23,23 0 1,1 -46,0"
                                  fill="#5580EE" id="tophalf"
                                  aria-valuetext="text"/>

                            <text fontSize="7.7px">
                                <a href="/">
                                    <tspan fill="#FFFFFF" fontSize="5px" x="27%" dy="7.4em">Написать нам</tspan>
                                </a>

                                <textPath xlinkHref="#tophalf" startOffset="0%">- Обсудим проект ? - Обсудим проект ?
                                </textPath>

                            </text>
                        </svg>

                    </div>

                    <div className="flex justify-between">

                        <div className="flex justify-start space-x-30 md:order-2">
                            <div><a href="/" className="no-underline hover:underline">INSTAGRAM</a></div>
                            <div><a href="/" className="no-underline hover:underline">DRIBBBLE</a></div>
                            <div><a href="/" className="no-underline hover:underline">hello@brightlab.me</a></div>
                        </div>

                        <div className="flex justify-end space-x-30 md:order-2 text-neutral-16">
                            <div>
                                <div>119334, Russia, Moscow.</div>
                                <div> Leninsky prospect,30A</div>
                            </div>
                            <div>
                                <div>60661, USA, Chicago(IL).</div>
                                <div> 625 W Adams St</div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </footer>
    )
}

export default memo(FooterProps)

