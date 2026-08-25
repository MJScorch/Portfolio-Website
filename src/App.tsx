import { Contact } from "./components/contact/Contact"
import { Hero } from "./components/hero/Hero"
import { Footer } from "./components/layout/Footer"
import { Nav } from "./components/layout/Nav"
import { Projects } from "./components/projects/Projects"
import { Writing } from "./components/writing/Writing"
import { useBackgroundAudio } from "./hooks/useBackgroundAudio"

function App() {
  useBackgroundAudio("/audio/cavalleria-intermezzo.mp3")

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
