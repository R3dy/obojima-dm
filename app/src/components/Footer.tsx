export default function Footer() {
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
        <div className="w-full h-px grad-copper-border mb-6" />
      </div>
      <h3 className="text-heading-lg text-copper text-center">
        The Curious World Within
      </h3>
      <p className="text-sm font-body mt-1 text-center" style={{ color: 'rgba(245,240,230,0.5)' }}>
        Obojima: Tales From The Tall Grass · A Digital Companion for Dungeon Masters
      </p>
    </footer>
  );
}
