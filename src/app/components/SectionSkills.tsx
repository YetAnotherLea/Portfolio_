export default function SectionSkills() {
  return (
    <section>
      <h2>Mes Compétences</h2>

      {/* BLOC 1 : DÉVELOPPEMENT WEB */}
      <div>
        <h3>Développement Frontend</h3>
        <ul>
          <li>JavaScript / TypeScript</li>
          <li>React / Next.js / Angular / Vue.js</li>
          <li>HTML5 / CSS3 / Sass / Tailwind CSS / Material UI</li>
        </ul>
      </div>

      <div>
        <h3>Développement Backend</h3>
        <ul>
          <li>Node.js (Express)</li>
          <li>PHP (Natif / Laravel / Symfony)</li>
          <li>Java (Spring)</li>
          <li>MySQL / MongoDB / PostgreSQL</li>
        </ul>
      </div>

      {/* BLOC 2 : INFRASTRUCTURE & SÉCURITÉ */}
      <div>
        <h3>Infrastructure, Sécurité & Cloud</h3>
        <ul>
          <li>Docker & Docker Compose</li>
          <li>VPS OVH / Hostinger / Plesk</li>
          <li>Cloudflare (DNS, Proxy, Security)</li>
          <li>Sécurité WP (Wordfence) & SMTP (Mandrill, Mailchimp)</li>
        </ul>
      </div>

      {/* BLOC 3 : CMS & SOLUTIONS LOW-CODE*/}
      <div>
        <h3>CMS & Écosystème WordPress</h3>
        <ul>
          <li>WordPress (Expertise Elementor & ACF)</li>
          <li>Développement de thèmes & plugins</li>
          <li>Solutions E-mailing & Marketing Automation</li>
        </ul>
      </div>

      {/* BLOC 4 : OUTILS & OS */}
      <div>
        <h3>Environnement & Worklow</h3>
        <ul>
          <li>Git / GitHub / Github Desktop</li>
          <li>Postman / Insomnia / Jira / Trello / Notion</li>
          <li>Linux (Ubuntu) / Windows / MacOS</li>
          <li>Design : Figma / Canva / Photopea</li>
        </ul>
      </div>
    </section>
  );
}
