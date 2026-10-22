// Drawn hero illustration: a sun, its orbit and a tilted panel array. Variant shifts the sun.
export function HeroArt({ variant = 0 }: { variant?: number }) {
  const sunX = [300, 250, 340][variant % 3];
  return (
    <svg viewBox="0 0 420 320" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <radialGradient id={`glow${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5b640" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#f5b640" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#f5b640" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`cell${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1f6b52" />
          <stop offset="100%" stopColor="#0b2a20" />
        </linearGradient>
      </defs>
      <circle cx={sunX} cy="80" r="110" fill={`url(#glow${variant})`} />
      <circle cx={sunX} cy="80" r="34" fill="#f5b640" />
      <ellipse cx="210" cy="150" rx="190" ry="60" fill="none" stroke="#3ad38f" strokeOpacity="0.25" strokeDasharray="4 8" />
      <g transform="translate(60 170) skewX(-18)">
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 5 }).map((_, c) => (
            <rect key={`${r}-${c}`} x={c * 56} y={r * 34} width="52" height="30" rx="3" fill={`url(#cell${variant})`} stroke="#3ad38f" strokeOpacity="0.55" />
          )),
        )}
      </g>
      <path d="M120 280v24M300 280v24" stroke="#3ad38f" strokeOpacity="0.5" strokeWidth="3" />
    </svg>
  );
}
