import loadable from "@loadable/component"

export const Header = loadable(() => import("./Header/Header"))
export const Footer = loadable(() => import("./Footer/Footer"))
export const Page = loadable(() => import("./Page/Page"))

export const Seo = loadable(() => import("./Seo"))
