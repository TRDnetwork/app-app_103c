import React from 'react';

interface MobileProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const MobileProjectCard: React.FC<MobileProjectCardProps> = ({
  title,
  description,
  image,
  link,
}) => {
  return (
    <div
      className="bg-surface p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover-lift active:scale-98"
      role="group"
      aria-label={`Project: ${title}`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-4"
        loading="lazy"
      />
      <h3 className="text-lg font-bold text-text mb-2 font-display">{title}</h3>
      <p className="text-text-dim text-sm mb-4">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-accent text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:rounded"
      >
        View Project →
      </a>
    </div>
  );
};

export default MobileProjectCard;
---