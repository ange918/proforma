import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyMe from "./components/WhyMe";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyMe />
        <Projects />
        <Skills />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
