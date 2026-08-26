import { Contact } from "./components/contact/Contact"
import { Hero } from "./components/hero/Hero"
import { Footer } from "./components/layout/Footer"
import { Nav } from "./components/layout/Nav"
import { Projects } from "./components/projects/Projects"
import { Writing } from "./components/writing/Writing"
import type { BackgroundAudio } from "./hooks/useBackgroundAudio"

function App({ audio }: { audio: BackgroundAudio }) {
  return (
    <>
      <Nav />
      <main>
        <Hero audio={audio} />
        <Projects />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
