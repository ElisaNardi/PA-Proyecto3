import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Sin padding, para tablas a sangre. */
  flush?: boolean;
}

export function Card({ flush = false, className, ...rest }: CardProps) {
  const clases = ['card', flush && 'flush', className].filter(Boolean).join(' ');
  return <div className={clases} {...rest} />;
}
