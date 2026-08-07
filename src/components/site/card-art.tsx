type Props = {
  variant: number;
  className?: string;
  intense?: boolean;
};

/**
 * Generated abstract art panels. Each variant is a distinct composition of
 * soft sky-blue / cyan radial glows plus thin engineered linework.
 */
export function CardArt({ variant, className = "", intense = false }: Props) {
  const v = variant % 6;
  const id = `art-${v}`;
  const o = intense ? 1 : 0.82;

  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <radialGradient id={`${id}-a`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.85 * o} />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-b`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.7 * o} />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.5 * o} />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity={0.08 * o} />
        </linearGradient>
      </defs>

      <rect width="400" height="260" fill="var(--surface)" />

      {v === 0 && (
        <g>
          <circle cx="120" cy="90" r="150" fill={`url(#${id}-a)`} />
          <circle cx="300" cy="200" r="120" fill={`url(#${id}-b)`} />
          <g stroke="#0F4C81" strokeOpacity="0.18" strokeWidth="0.8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={i} x1={-20 + i * 80} y1="0" x2={40 + i * 80} y2="260" />
            ))}
          </g>
        </g>
      )}

      {v === 1 && (
        <g>
          <circle cx="330" cy="60" r="150" fill={`url(#${id}-a)`} />
          <circle cx="90" cy="230" r="140" fill={`url(#${id}-b)`} />
          <g fill="none" stroke={`url(#${id}-l)`} strokeWidth="1.2">
            {[30, 60, 90, 120, 150].map((r) => (
              <circle key={r} cx="200" cy="130" r={r} />
            ))}
          </g>
        </g>
      )}

      {v === 2 && (
        <g>
          <circle cx="200" cy="40" r="170" fill={`url(#${id}-b)`} />
          <circle cx="60" cy="180" r="110" fill={`url(#${id}-a)`} />
          <g stroke="#0F4C81" strokeOpacity="0.16" strokeWidth="0.8">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={i} x1="0" y1={20 + i * 38} x2="400" y2={20 + i * 38} />
            ))}
          </g>
          <path d="M0 200 C 110 120, 200 240, 400 110" fill="none" stroke="#38BDF8" strokeOpacity={0.6 * o} strokeWidth="1.6" />
        </g>
      )}

      {v === 3 && (
        <g>
          <circle cx="80" cy="60" r="130" fill={`url(#${id}-b)`} />
          <circle cx="340" cy="180" r="150" fill={`url(#${id}-a)`} />
          <g fill="none" stroke="#38BDF8" strokeOpacity={0.4 * o} strokeWidth="1">
            <rect x="60" y="50" width="150" height="150" rx="8" transform="rotate(12 135 125)" />
            <rect x="150" y="80" width="150" height="150" rx="8" transform="rotate(-8 225 155)" />
          </g>
        </g>
      )}

      {v === 4 && (
        <g>
          <circle cx="200" cy="230" r="180" fill={`url(#${id}-a)`} />
          <circle cx="310" cy="40" r="110" fill={`url(#${id}-b)`} />
          <g stroke="#0F4C81" strokeOpacity="0.2" strokeWidth="0.8" fill="none">
            <path d="M20 240 L 100 140 L 180 190 L 260 70 L 380 130" />
          </g>
          {[
            [100, 140],
            [180, 190],
            [260, 70],
            [380, 130],
          ].map(([x, y]) => (
            <circle key={`${x}`} cx={x} cy={y} r="4" fill="#38BDF8" fillOpacity={0.9 * o} />
          ))}
        </g>
      )}

      {v === 5 && (
        <g>
          <circle cx="40" cy="130" r="150" fill={`url(#${id}-a)`} />
          <circle cx="380" cy="120" r="140" fill={`url(#${id}-b)`} />
          <g stroke="#38BDF8" strokeOpacity={0.35 * o} strokeWidth="1" fill="none">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <path key={i} d={`M0 ${20 + i * 32} Q 200 ${i * 26} 400 ${60 + i * 24}`} />
            ))}
          </g>
        </g>
      )}
    </svg>
  );
}
