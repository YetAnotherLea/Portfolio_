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
          <li>
            <a href="https://github.com/YetAnotherLea" target="_blank">
              Github
            </a>
          </li>
          <li>
            <a
              href="https://fr.linkedin.com/in/l%C3%A9a-ballester-b94984345"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://fr.linkedin.com/in/l%C3%A9a-ballester-b94984345"
              target="_blank"
            >
              Medium
            </a>
          </li>
          <li>
            <a
              href="https://fr.linkedin.com/in/l%C3%A9a-ballester-b94984345"
              target="_blank"
            >
              CV
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
