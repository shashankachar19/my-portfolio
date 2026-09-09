export default function SectionDivider({ number, label }) {
  return (
    <div className="w-full px-6 lg:px-12 py-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary whitespace-nowrap">
          ( {number} — {label} )
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>
    </div>
  );
}
