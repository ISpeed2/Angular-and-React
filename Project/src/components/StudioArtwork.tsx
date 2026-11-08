export default function StudioArtwork({
  color,
  id,
}: {
  color: string;
  id: string;
}) {
  const gradientId = `room-${id}`;
  return (
    <svg className="studio-artwork" viewBox="0 0 600 340" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={color} stopOpacity=".3" />
          <stop offset="1" stopColor="#10141d" />
        </linearGradient>
      </defs>
      <rect width="600" height="340" fill="#161d26" />
      <rect width="600" height="340" fill={`url(#${gradientId})`} />
      <path d="M0 270 210 210H600V340H0Z" fill="#0e121a" opacity=".7" />
      {[55, 94, 133, 172, 410, 449, 488, 527].map((x) => (
        <rect
          key={x}
          x={x}
          y="36"
          width="24"
          height="155"
          rx="3"
          fill="#10151d"
          opacity=".65"
        />
      ))}
      <path d="M0 268H600M210 0V210" stroke={color} strokeOpacity=".18" />
      <rect
        x="52"
        y="207"
        width="83"
        height="81"
        rx="5"
        fill="#11151b"
        stroke="#566071"
        strokeWidth="2"
      />
      <rect x="61" y="218" width="65" height="59" rx="2" fill="#232b36" />
      <circle cx="93" cy="248" r="23" fill="#141921" stroke="#3a4554" />
      <rect
        x="469"
        y="187"
        width="80"
        height="100"
        rx="5"
        fill="#11151b"
        stroke="#566071"
        strokeWidth="2"
      />
      <circle cx="509" cy="216" r="17" fill="#242e3a" />
      <circle cx="509" cy="260" r="21" fill="#242e3a" />
      <path
        d="M297 223V290M268 290H326M245 208 226 286M358 208 379 286M271 172 261 252M341 171 350 254"
        stroke="#768190"
        strokeWidth="3"
      />
      <circle
        cx="300"
        cy="249"
        r="43"
        fill="#202b36"
        stroke={color}
        strokeWidth="4"
      />
      <circle cx="300" cy="249" r="29" fill="#131b24" />
      <circle cx="312" cy="258" r="7" fill="#4b5a69" />
      <ellipse cx="271" cy="186" rx="25" ry="12" fill={color} opacity=".75" />
      <path
        d="M246 185V208Q270 225 296 208V185"
        fill="#303c46"
        stroke="#77828b"
      />
      <ellipse cx="335" cy="186" rx="25" ry="12" fill={color} opacity=".75" />
      <path
        d="M310 185V208Q335 225 360 208V185"
        fill="#303c46"
        stroke="#77828b"
      />
      <ellipse cx="240" cy="164" rx="45" ry="5" fill="#c8ab63" />
      <ellipse cx="365" cy="157" rx="42" ry="5" fill="#c8ab63" />
      <path
        d="M416 146V291M397 291H435M416 146 401 131"
        stroke="#82909c"
        strokeWidth="3"
      />
      <rect
        x="390"
        y="117"
        width="12"
        height="28"
        rx="6"
        transform="rotate(-35 396 131)"
        fill={color}
      />
      <path d="M65 32H532" stroke={color} strokeWidth="3" opacity=".7" />
      <ellipse cx="307" cy="305" rx="190" ry="16" fill={color} opacity=".045" />
    </svg>
  );
}
