import {
  Header,
  Footer,
  Socials,
  HeroSection,
  Skills,
  Projects,
  Contact,
} from "./components/index.tsx";

import ApiGit from "./components/api/api-git.tsx";

function App() {
  return (
    <>
      <Header />
      <Socials />
      <HeroSection />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ApiGit />
    </>
  );
}

export default App;
