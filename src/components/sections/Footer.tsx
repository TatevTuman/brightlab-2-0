import React, {memo} from 'react'


interface FooterProps {
}

const FooterProps: React.FC<FooterProps> = props => {
    const {} = props


    return (
        <footer className="bg-violet-7">
            <div className="container">
                <div
                    className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">

                    <div className="flex justify-center space-x-30 md:order-2">

                        <svg viewBox="0 0 70 70" width="29.5%">

                            <path stroke={"#F1F7FB"} strokeWidth={7} d="M35,35m-23,0a23,23 0 1,1 46,0a23,23 0 1,1 -46,0"
                                  fill="#5580EE" id="tophalf"
                                  aria-valuetext="text"/>

                            <text fontSize="7.7px">
                                <a href="/">
                                    <tspan fill="#FFFFFF" fontFamily="Helvetica Neue" fontSize="4px" x="34%" dy="9em">Написать нам</tspan>
                                </a>

                                <textPath xlinkHref="#tophalf" startOffset="0%">- Обсудим проект ? - Обсудим проект ?
                                </textPath>

                            </text>
                        </svg>

                    </div>


                    <div className="flex justify-center ">
                        <div className={"w-232 h-232 rounded-full bg-violet-8 items-center flex justify-center"}>
                            <a href="/" className="text-20 text-white">
                                Написать нам
                            </a>
                        </div>

                    </div>

                    <div className="flex justify-between ">

                        <div className="flex justify-start space-x-30 md:order-2 ">
                            <a href="/" className="text-20 no-underline hover:underline fontFamily-Helvetica-Neue" >INSTAGRAM</a>
                            <a href="/" className="text-20 no-underline hover:underline">DRIBBBLE</a>
                            <a href="/" className="text-20 no-underline hover:underline">hello@brightlab.me</a>

                        </div>

                        <div className="flex justify-end space-x-30 md:order-2 text-neutral-16">
                            <div>
                                <p  className="text-20">119334, Russia, Moscow.</p>
                                <p  className="text-20"> Leninsky prospect,30A</p>
                            </div>
                            <div>
                                <p className="text-20">60661, USA, Chicago(IL).</p>
                                <p className="text-20"> 625 W Adams St</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </footer>
    )
}

export default memo(FooterProps)

