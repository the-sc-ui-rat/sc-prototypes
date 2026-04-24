export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="flex items-center" style={{ gap: 6 }}>
        {[0, 1, 2].map(i => (
          <span
            key={i}
            style={{
              display: 'block',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent)',
              width:  i === 0 ? 6  : i === 1 ? 9  : 12,
              height: i === 0 ? 6  : i === 1 ? 9  : 12,
              animation: 'loading-dot 1s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
