import logo from "../../images/icon.svg"

import "./NavBar.css"

function NavBar() {
    return (
        <nav>
            <img src={logo} alt="De Ruiter Webdevelopment Logo" />
            <div>
                <button>Contact</button>
                <button className="secondary">Menu</button>
            </div>
        </nav>
    )
}

export default NavBar;