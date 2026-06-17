import { useAdventure } from '../context/AdventureContext';

export default function Footer() {
  const { config } = useAdventure();
  return (
    <footer
      className="w-full py-6 px-4 flex flex-col items-center"
      style={{
        backgroundColor: '#1A1410',
        borderTop: '1px solid transparent',
      }}
    >
      <div
        className="w-full max-w-container"
        style={{
          borderTop: '1px solid transparent',
        }}
      >
        <div
          className="w-full h-px mb-6"
          style={{
            background: `linear-gradient(90deg, ${config.theme.accent}00 0%, ${config.theme.accent}80 50%, ${config.theme.accent}00 100%)`,
          }}
        />
      </div>
      <h3 className="text-heading-lg text-center" style={{ color: config.theme.accent }}>
        {config.footerTitle}
      </h3>
      <p className="text-sm font-body mt-1 text-center" style={{ color: 'rgba(245,240,230,0.5)' }}>
        {config.footerSubtitle}
      </p>
    </footer>
  );
}
