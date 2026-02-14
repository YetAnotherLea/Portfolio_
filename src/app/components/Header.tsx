import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link
              href="/?view=projects"
              className="hover:text-secondary transition-colors"
            >
              Projets
            </Link>
          </li>
          <li>
            <Link
              href="/?view=skills"
              className="hover:text-secondary transition-colors"
            >
              Compétences
            </Link>
          </li>
          <li>
            <Link
              href="/?view=contact"
              className="hover:text-secondary transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <p>Présentation</p>
        <ul>
          <li>Github</li>
          <li>Linkedin</li>
          <li>Medium</li>
          <li>CV</li>
        </ul>
      </div>
    </header>
  );
}
