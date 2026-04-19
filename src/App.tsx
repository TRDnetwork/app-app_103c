import React, { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import ProjectCard from './components/ProjectCard';
import MobileProjectCard from './components/MobileProjectCard';
import MobileContactForm from './components/MobileContactForm';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-up');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    setIsLoaded(true);

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-accent focus:text-white focus:p-2 focus:rounded z-50"
      >
        Skip to content
      </a>

      <div className="container mx-auto px-4 py-16">
        <section
          id="hero"
          className={`text-center mb-20 animate-on-scroll opacity-0 ${isLoaded ? 'slide-up' : ''}`}
          aria-labelledby="hero-heading"
        >
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-6xl font-bold font-display mb-4">
            Jane Doe
          </h1>
          <p className="text-lg sm:text-xl text-text-dim max-w-2xl mx-auto">
            Full-Stack Developer & UI Designer crafting meaningful digital experiences with clean code and thoughtful design.
          </p>
        </section>

        <section
          id="about"
          className="mb-20 animate-on-scroll opacity-0"
          aria-labelledby="about-heading"
        >
          <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold font-display mb-6 text-center">
            About Me
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-text-dim text-base sm:text-lg leading-relaxed">
              I'm a passionate developer with over 5 years of experience building scalable web applications.
              My focus is on creating intuitive user interfaces and robust backend systems that deliver real value.
              When I'm not coding, you can find me hiking, reading, or experimenting with new recipes in the kitchen.
            </p>
          </div>
        </section>

        <section
          id="projects"
          className="mb-20 animate-on-scroll opacity-0"
          aria-labelledby="projects-heading"
        >
          <h2 id="projects-heading" className="text-2xl sm:text-3xl font-bold font-display mb-10 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isMobile ? (
              <>
                <MobileProjectCard
                  title="E-Commerce Platform"
                  description="A full-featured online store with product catalog, cart, and payment processing using Stripe."
                  image="/images/project-1.jpg"
                  link="https://example.com/project-1"
                />
                <MobileProjectCard
                  title="Task Management App"
                  description="Collaborative to-do list with real-time updates, team sharing, and deadline tracking."
                  image="/images/project-2.jpg"
                  link="https://example.com/project-2"
                />
                <MobileProjectCard
                  title="Weather Dashboard"
                  description="Interactive weather app with location-based forecasts, charts, and severe alert notifications."
                  image="/images/project-3.jpg"
                  link="https://example.com/project-3"
                />
              </>
            ) : (
              <>
                <ProjectCard
                  title="E-Commerce Platform"
                  description="A full-featured online store with product catalog, cart, and payment processing using Stripe."
                  image="/images/project-1.jpg"
                  link="https://example.com/project-1"
                  role="group"
                />
                <ProjectCard
                  title="Task Management App"
                  description="Collaborative to-do list with real-time updates, team sharing, and deadline tracking."
                  image="/images/project-2.jpg"
                  link="https://example.com/project-2"
                  role="group"
                />
                <ProjectCard
                  title="Weather Dashboard"
                  description="Interactive weather app with location-based forecasts, charts, and severe alert notifications."
                  image="/images/project-3.jpg"
                  link="https://example.com/project-3"
                  role="group"
                />
              </>
            )}
          </div>
        </section>

        <section
          id="contact"
          className="animate-on-scroll opacity-0"
          aria-labelledby="contact-heading"
        >
          <h2 id="contact-heading" className="text-2xl sm:text-3xl font-bold font-display mb-10 text-center">
            Get In Touch
          </h2>
          <div className="max-w-2xl mx-auto">
            {isMobile ? <MobileContactForm /> : <ContactForm />}
          </div>
        </section>
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="form-status"
      />
    </>
  );
};

export default App;
---