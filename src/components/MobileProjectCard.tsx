import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
}

export default function MobileProjectCard({ title, description, link }: ProjectCardProps) {
  return (
    <motion.div
      className="bg-surface p-6 rounded-lg shadow-sm border border-transparent hover:border-accent transition-colors duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      tabIndex={0}
      aria-label={`${title}: ${description}`}
    >
      <h3 className="text-xl font-bold text-text mb-2 font-display">{title}</h3>
      <p className="text-text-dim mb-4 flex-grow">{description}</p>
      <a
        href={link}
        className="text-accent hover:text-accent-alt font-medium inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-accent focus:rounded"
        aria-label={`View project: ${title}`}
      >
        View Project
        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </a>
    </motion.div>
  );
}