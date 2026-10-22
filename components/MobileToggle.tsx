"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

export function MobileToggle() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.getElementById("site-header")?.classList.toggle("open", open);
  }, [open]);
  return (
    <button type="button" className="btn btn-ghost btn-sm menu-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
      <Icon name={open ? "close" : "menu"} />
    </button>
  );
}
