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
          <path
            d="M0 200 C 110 120, 200 240, 400 110"
            fill="none"
            stroke="#38BDF8"
            strokeOpacity={0.6 * o}
            strokeWidth="1.6"
          />
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

      {v === 6 && (
        <g>
          <circle cx="150" cy="60" r="140" fill={`url(#${id}-b)`} />
          <circle cx="280" cy="210" r="130" fill={`url(#${id}-a)`} />
          <g stroke="#0F4C81" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 3">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line key={i} x1={i * 60} y1="0" x2={i * 60 + 80} y2="260" />
            ))}
          </g>
        </g>
      )}

      {v === 7 && (
        <g>
          <circle cx="300" cy="90" r="160" fill={`url(#${id}-a)`} />
          <circle cx="100" cy="170" r="110" fill={`url(#${id}-b)`} />
          <g fill="none" stroke="#38BDF8" strokeOpacity={0.35 * o} strokeWidth="1">
            {[20, 50, 80, 110, 140].map((w) => (
              <rect key={w} x={200 - w / 2} y={130 - w / 2} width={w} height={w} rx="6" />
            ))}
          </g>
        </g>
      )}

      {v === 8 && (
        <g>
          <circle cx="200" cy="130" r="160" fill={`url(#${id}-a)`} />
          <g stroke="#0F4C81" strokeOpacity="0.16" strokeWidth="0.8">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <line key={i} x1={20 + i * 40} y1="0" x2={20 + i * 40} y2="260" />
            ))}
          </g>
        </g>
      )}

      {v === 9 && (
        <g>
          <circle cx="90" cy="180" r="150" fill={`url(#${id}-b)`} />
          <circle cx="310" cy="80" r="120" fill={`url(#${id}-a)`} />
          <g fill="none" stroke="#38BDF8" strokeOpacity={0.3 * o} strokeWidth="1">
            <polygon points="100,50 300,100 200,200" />
            <polygon points="120,70 280,110 200,180" />
          </g>
        </g>
      )}

      {v === 10 && (
        <g>
          <circle cx="330" cy="200" r="160" fill={`url(#${id}-a)`} />
          <circle cx="80" cy="60" r="120" fill={`url(#${id}-b)`} />
          <path
            d="M 0 130 Q 100 80 200 130 T 400 130"
            fill="none"
            stroke="#38BDF8"
            strokeOpacity={0.5 * o}
            strokeWidth="1.5"
          />
          <path
            d="M 0 150 Q 100 100 200 150 T 400 150"
            fill="none"
            stroke="#38BDF8"
            strokeOpacity={0.35 * o}
            strokeWidth="1.2"
          />
        </g>
      )}

      {v === 11 && (
        <g>
          <circle cx="200" cy="130" r="150" fill={`url(#${id}-a)`} />
          <g fill="none" stroke="#0F4C81" strokeOpacity="0.18" strokeWidth="0.8">
            <line x1="120" y1="90" x2="280" y2="170" />
            <line x1="120" y1="170" x2="280" y2="90" />
            <line x1="200" y1="50" x2="200" y2="210" />
          </g>
          <circle
            cx="200"
            cy="130"
            r="25"
            fill="none"
            stroke="#38BDF8"
            strokeOpacity={0.6 * o}
            strokeWidth="1"
          />
        </g>
      )}

      {v === 12 && (
        <g>
          <circle cx="100" cy="100" r="140" fill={`url(#${id}-b)`} />
          <circle cx="300" cy="160" r="130" fill={`url(#${id}-a)`} />
          <g stroke="#0F4C81" strokeOpacity="0.15" strokeWidth="0.6">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={i} x1="0" y1={i * 43} x2="400" y2={i * 43} />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <line key={i} x1={i * 44} y1="0" x2={i * 44} y2="260" />
            ))}
          </g>
        </g>
      )}

      {v === 13 && (
        <g>
          <circle cx="350" cy="60" r="150" fill={`url(#${id}-a)`} />
          <circle cx="90" cy="200" r="130" fill={`url(#${id}-b)`} />
          <g
            fill="none"
            stroke="#38BDF8"
            strokeOpacity={0.4 * o}
            strokeWidth="1"
            strokeDasharray="3 3"
          >
            {[40, 85, 130].map((r) => (
              <circle key={r} cx="200" cy="130" r={r} />
            ))}
          </g>
        </g>
      )}

      {v === 14 && (
        <g>
          <circle cx="200" cy="130" r="160" fill={`url(#${id}-b)`} />
          <g stroke="#38BDF8" strokeOpacity={0.5 * o} strokeWidth="1">
            <line x1="200" y1="90" x2="200" y2="170" />
            <line x1="160" y1="130" x2="240" y2="130" />
          </g>
          <circle
            cx="200"
            cy="130"
            r="12"
            fill="none"
            stroke="#0F4C81"
            strokeOpacity="0.25"
            strokeWidth="0.8"
          />
        </g>
      )}
    </svg>
  );
}
