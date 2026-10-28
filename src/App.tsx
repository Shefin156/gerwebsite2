import { useCallback, useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Loader } from './components/Loader'
import { BackToTop } from './components/BackToTop'
import { StorySection } from './story/StorySection'
import { Stats } from './components/sections/Stats'
import { About } from './components/sections/About'
import { Technology } from './components/sections/Technology'
import { Partners } from './components/sections/Partners'
import { Advantages } from './components/sections/Advantages'
import { Projects } from './components/sections/Projects'
import { Clients } from './components/sections/Clients'
import { CallToAction } from './components/sections/CallToAction'
import { Contact } from './components/sections/Contact'
import { useSmoothScroll } from './hooks/smoothScroll'

export default function App() {
  useSmoothScroll()
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <StorySection onReady={onReady} />
        <Stats />
        <About />
        <Technology />
        <Partners />
        <Advantages />
        <Projects />
        <Clients />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Loader ready={ready} />
    </>
  )
}
