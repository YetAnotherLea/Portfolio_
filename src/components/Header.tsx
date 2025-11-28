import logo from "../../public/favicon.svg";
function Header() {
  return (
    <>
      <header>
        <img src={logo} alt="Logo du Portfolio" />
        <nav>
          <ul>
            <li>Présentation</li>
            <li>Compétences</li>
            <li>Projets</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
