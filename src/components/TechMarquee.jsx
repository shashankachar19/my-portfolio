const TECH_ITEMS = [
  'Java', 'Python', 'Node.js', 'React', 'Three.js', 'AWS',
  'MySQL', 'MongoDB', 'Docker', 'Git', 'Linux', 'REST APIs',
  'Zero-Trust', 'OCR', 'Computer Vision', 'Satellite Data',
];

function MarqueeRow({ items, reverse = false }) {
  // Duplicate items to create seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap py-3 border-b border-border">
      <div className={reverse ? 'marquee-track-reverse' : 'marquee-track'}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono text-sm md:text-base uppercase tracking-[0.15em] text-text-tertiary mx-6 md:mx-10 inline-block hover:text-accent transition-colors duration-300 cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  const row1 = TECH_ITEMS.slice(0, 8);
  const row2 = TECH_ITEMS.slice(8);

  return (
    <section className="w-full py-16 md:py-24 bg-bg-primary">
      <div className="px-6 lg:px-12 mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-tertiary">
          ( 04 — Stack )
        </p>
      </div>

      <MarqueeRow items={row1} />
      <MarqueeRow items={row2} reverse />

      {/* Static grid alternative below the marquee */}
      <div className="px-6 lg:px-12 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-border">
          {TECH_ITEMS.map((tech, i) => (
            <div
              key={i}
              className="bg-bg-primary px-4 py-6 text-center font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-secondary hover:text-accent hover:bg-bg-elevated transition-all duration-300 cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
