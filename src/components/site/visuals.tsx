import { useId } from "react";

/** Engineered node/link network visual for the hero visual column. */
export function NetworkVisual({ className = "" }: { className?: string }) {
  const raw = useId();
  const id = raw.replace(/:/g, "");
  const nodes: [number, number, number][] = [
    [60, 90, 4],
    [150, 40, 5],
    [230, 110, 7],
    [120, 175, 5],
    [300, 60, 4],
    [330, 190, 6],
    [200, 250, 4],
    [70, 250, 3],
    [390, 120, 4],
  ];
  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 3],
    [1, 4],
    [2, 5],
    [4, 5],
    [3, 6],
    [5, 6],
    [3, 7],
    [6, 7],
    [4, 8],
    [5, 8],
  ];

  return (
    <svg
      viewBox="0 0 440 300"
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "auto" }}
    >
      <defs>
        <radialGradient id={`${id}-g`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-c`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="250" cy="120" r="180" fill={`url(#${id}-g)`} />
      <circle cx="110" cy="230" r="140" fill={`url(#${id}-c)`} />

      <g stroke="var(--sky)" strokeOpacity="0.45" strokeWidth="1">
        {links.map(([a, b], i) => {
          const from = nodes[a]!;
          const to = nodes[b]!;
          return <line key={i} x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} />;
        })}
      </g>
      <g>
        {nodes.map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r + 6} fill="var(--sky)" fillOpacity="0.12" />
            <circle cx={x} cy={y} r={r} fill="var(--sky)" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Blueprint grid + faint radial glows used behind the hero. */
export function HeroBackdrop({ className = "" }: { className?: string }) {
  const raw = useId();
  const id = raw.replace(/:/g, "");
  return (
    <svg
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 700"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <pattern id={`${id}-grid`} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="var(--border)" strokeWidth="1" />
        </pattern>
        <radialGradient id={`${id}-a`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-b`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="700" fill={`url(#${id}-grid)`} />
      <circle cx="1150" cy="230" r="420" fill={`url(#${id}-a)`} />
      <circle cx="880" cy="620" r="340" fill={`url(#${id}-b)`} />
    </svg>
  );
}
