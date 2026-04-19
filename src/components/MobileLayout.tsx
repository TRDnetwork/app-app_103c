import MobileHero from './MobileHero';
import MobileAbout from './MobileAbout';
import MobileProjectCard from './MobileProjectCard';
import MobileContactForm from './MobileContactForm';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'E-Commerce Dashboard',
    description: 'A full-stack admin dashboard with real-time analytics, inventory management, and order tracking.',
    link: '#',
  },
  {
    title: 'Task Management App',
    description: 'Collaborative to-do app with drag-and-drop interface, team sharing, and deadline reminders.',
    link: '#',
  },
  {
    title: 'Weather Forecast Tool',
    description: 'Minimalist weather app pulling live data with location-based forecasts and precipitation alerts.',
    link: '#',
  },
];

export default function MobileLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <MobileHero />
        <div className="container">
          <MobileAbout />
          <section className="py-12">
            <h2 className="text-2xl font-bold mb-8 font-display text-center sm:text-left">Featured Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                >
                  <MobileProjectCard {...project} />
                </motion.div>
              ))}
            </div>
          </section>
          <MobileContactForm />
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-text-dim border-t border-surface mt-12">
        &copy; {new Date().getFullYear()} Portfolio Pro. Crafted with care.
      </footer>
    </div>
  );
}