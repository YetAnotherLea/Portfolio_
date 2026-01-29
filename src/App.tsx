import {
  Header,
  Footer,
  Socials,
  HeroSection,
  Skills,
  Projects,
  Contact,
  Popup,
} from "./components/index.tsx";

import ApiGit from "./components/api/api-git.tsx";

function App() {
  return (
    <>
      <div className="flex flex-col ">
        <Header />
        <Socials />
        <HeroSection />
        <Skills />
        <Projects />
        <Contact />
        <ApiGit />
        <Popup />
        <Footer />
      </div>
    </>
  );
}

export default App;
