import './HamburgerMenu.css'

const HamburgerMenu=({click, navBar})=>{
    return (<div className={navBar ? "hamburger__menu": "hamburger__menu__admin"} onClick={click}>
                <div></div>
                <div></div>
                <div></div>
            </div>)
}
export default HamburgerMenu