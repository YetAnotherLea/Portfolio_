import logo from "../../public/favicon.svg";
function Header() {
  return (
    <>
      <header className="flex justify-center align-middle w-auto bg-red-400">
        <img src={logo} alt="Logo du Portfolio" />
        <nav className="flex w-auto">
          <ul className="flex justify-between w-auto">
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
