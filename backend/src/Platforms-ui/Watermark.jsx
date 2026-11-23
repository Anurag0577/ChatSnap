export default function Watermark() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-45deg)',
        fontSize: '48px',
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.1)',
        pointerEvents: 'none',
        zIndex: 9999,
        whiteSpace: 'nowrap',
        textShadow: 'none',
        fontFamily: 'Arial, sans-serif',
        letterSpacing: '2px',
      }}
    >
      ChatSnap Preview
    </div>
  );
}
