// Íconos de prototipo/app.js (objeto `I`) como componentes. Trazo con currentColor.
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function IconGlove(props: IconProps) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <path d="M7 13c-1.2-2.4-.6-5.4 1.4-7A5 5 0 0 1 16 8v3.2c1.4.4 2.4 1.7 2.4 3.2 0 1.9-1.5 3.4-3.4 3.4H10l-1.5 3H6l.8-3.6C5.7 16.3 5 14.7 5 13" /><path d="M16 8V5.6C16 4.2 17.1 3 18.5 3S21 4.2 21 5.6V11" />
    </svg>
  );
}

export function IconHome(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9h12v-9" />
    </svg>
  );
}

export function IconBandage(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <rect x="3" y="8" width="18" height="8" rx="3" transform="rotate(-45 12 12)" /><circle cx="9.5" cy="9.5" r="1" /><circle cx="14.5" cy="14.5" r="1" />
    </svg>
  );
}

export function IconScale(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <circle cx="12" cy="13" r="8" /><path d="M12 13 15 9" /><path d="M9 3h6" />
    </svg>
  );
}

export function IconApple(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path d="M12 7c-3.5 0-6 2.8-6 6.6C6 17.8 8.6 21 11 21c1 0 1.3-.5 2-.5s1 .5 2 .5c2 0 4.6-3.3 4.6-6.6 0-1.7-.7-3.1-1.8-4" /><path d="M14.5 6.2c.8-.9.9-2.2.7-3.2-1 .1-2.1.7-2.8 1.6-.7.8-1 2-.8 3.1 1 .1 2.2-.6 2.9-1.5Z" />
    </svg>
  );
}

export function IconChat(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path d="M4 5h16v11H8l-4 4V5Z" />
    </svg>
  );
}

export function IconChart(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17.5" cy="9" r="2.6" /><path d="M15.5 14.2c2.6.3 4.5 2.4 4.5 5.1" />
    </svg>
  );
}

export function IconLink(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path d="M9 15 15 9" /><path d="M11 6.5 12.4 5a3.8 3.8 0 1 1 5.4 5.4L16.3 12" /><path d="M13 17.5 11.6 19a3.8 3.8 0 1 1-5.4-5.4L7.7 12" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconTrash(props: IconProps) {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
    </svg>
  );
}

export function IconEdit(props: IconProps) {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path d="M4 20h4L18 10l-4-4L4 16v4Z" />
    </svg>
  );
}

export function IconBack(props: IconProps) {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true" {...props}>
      <path d="M15 5 8 12l7 7" />
    </svg>
  );
}

export function IconLogout(props: IconProps) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path d="M9 4H5v16h4" /><path d="M14 8l4 4-4 4M18 12H9" />
    </svg>
  );
}

export function IconWarn(props: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path d="M12 3 2 20h20L12 3Z" /><path d="M12 10v4M12 17h.01" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true" {...props}>
      <path d="M4 12.5 9 18 20 6" />
    </svg>
  );
}

export function IconArrow(props: IconProps) {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconInbox(props: IconProps) {
  return (
    <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" {...props}>
      <path d="M3 12h5l1.5 3h5L16 12h5" /><path d="M5 12 6.5 5h11L19 12v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6Z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}

export function IconLock(props: IconProps) {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" /><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </svg>
  );
}

export function IconChevron(props: IconProps) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true" {...props}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
