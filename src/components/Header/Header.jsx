import logo from "../../images/homeLogo.png";
export default function Header() {
    return (
        <header className="header">
            <img src={logo} alt="imagen homeLogo" className="header__logo" />
        </header>
    );
}