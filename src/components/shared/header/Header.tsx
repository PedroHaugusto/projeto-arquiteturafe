import logo from '../../../assets/logo.png'
import { NavLink } from "react-router-dom"
import './Header.css'

export const Header = () => {
    return (
        <header className="custom-header d-flex align-items-center justify-content-between px-4 py-2">
            <NavLink to="/" className="d-flex align-items-center">
                <img src={logo} alt="Logo" className="header-logo" />
            </NavLink>
            <nav>
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink className="nav-link custom-link" to="/characters">Personagens</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link custom-link" to="/episodes">Episódios</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link custom-link" to="/locations">Localizações</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}