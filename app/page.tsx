import { Footer } from "@/components/layout/Footer";
import { HeaderBar } from "@/components/layout/HeaderBar";
import { ScrollTopButton } from "@/components/layout/ScrollTopButton";
import { SideNav } from "@/components/layout/SideNav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { sections } from "@/lib/sections";

export default function Home() {
  return (
    <main id="main-content" className="site-main">
      <HeaderBar />
      <SideNav sections={sections} />
      <ScrollTopButton />

      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
