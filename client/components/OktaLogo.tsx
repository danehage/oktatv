interface OktaLogoProps {
  className?: string;
  size?: number;
}

export function OktaLogo({ className = "", size = 32 }: OktaLogoProps) {
  return (
    <div
      className={`flex items-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full" fill="currentColor">
        {/* Okta's distinctive radiating spokes pattern */}
        <g>
          {/* Central circle */}
          <circle cx="100" cy="100" r="25" fill="currentColor" />

          {/* Radiating spokes */}
          {Array.from({ length: 24 }, (_, i) => {
            const angle = i * 15 * (Math.PI / 180);
            const innerRadius = 35;
            const outerRadius = 85;
            const spokeWidth = 8;

            const x1 = 100 + Math.cos(angle) * innerRadius;
            const y1 = 100 + Math.sin(angle) * innerRadius;
            const x2 = 100 + Math.cos(angle) * outerRadius;
            const y2 = 100 + Math.sin(angle) * outerRadius;

            // Calculate perpendicular points for rectangle
            const perpAngle = angle + Math.PI / 2;
            const dx = (Math.cos(perpAngle) * spokeWidth) / 2;
            const dy = (Math.sin(perpAngle) * spokeWidth) / 2;

            return (
              <polygon
                key={i}
                points={`
                  ${x1 + dx},${y1 + dy}
                  ${x1 - dx},${y1 - dy}
                  ${x2 - dx},${y2 - dy}
                  ${x2 + dx},${y2 + dy}
                `}
                fill="currentColor"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
