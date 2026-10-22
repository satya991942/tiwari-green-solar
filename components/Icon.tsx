const paths: Record<string, React.ReactNode> = {
  rooftop: (<><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="m8 13 4-3 4 3-4 3z" /></>),
  panel: (<><path d="M4 5h16l-2 10H6z" /><path d="M6.8 8.3h10.4M5.6 11.6h12.8M10 5l-1 10M14 5l1 10M12 15v4M8 19h8" /></>),
  battery: (<><rect x="4" y="7" width="16" height="13" rx="2" /><path d="M8 7V4h2v3M14 7V4h2v3M8 13h3M13 13h3M14.5 11.5v3" /></>),
  inverter: (<><rect x="4" y="3" width="16" height="18" rx="2" /><rect x="7" y="6" width="10" height="5" rx="1" /><path d="M8 15h2M14 15h2M9 18h6" /><path d="m12 7.5-1 2h2l-1 2" /></>),
  home: (<><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="m12.5 11-2 3.5h3l-2 3.5" /></>),
  lithium: (<><rect x="7" y="4" width="10" height="17" rx="2" /><path d="M10 2h4M12.5 8l-2 4h3l-2 4" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  arrowL: <path d="m15 18-6-6 6-6" />,
  arrowR: <path d="m9 18 6-6-6-6" />,
  arrowUp: <path d="m6 15 6-6 6 6" />,
  arrowDown: <path d="m6 9 6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  survey: (<><path d="M9 4h6v3H9z" /><path d="M7 5H5v16h14V5h-2" /><path d="m8.5 14 2.5 2.5 4.5-5" /></>),
  subsidy: (<><path d="M7 4h10M7 8h10M7 4c5 0 5 8 0 8l8 8" /></>),
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z" />,
  shield: (<><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>),
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
};

export function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name] ?? paths.sun}
    </svg>
  );
}

export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2m4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3" />
    </svg>
  );
}

// Abstract product placeholder: a stylised solar panel
export function ProductPlaceholder() {
  return (
    <svg viewBox="0 0 64 64" className="ph" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.4}>
      <path d="M10 14h44l-6 28H16z" />
      <path d="M12.6 23.3h38.8M14.6 32.6h34.8M24 14l-3 28M40 14l3 28M32 14v28M32 42v8M22 52h20" />
    </svg>
  );
}
