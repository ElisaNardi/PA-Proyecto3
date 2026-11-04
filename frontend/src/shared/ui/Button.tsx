import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'subtle' | 'danger' | 'ok';
export type ButtonSize = 'md' | 'sm' | 'xs';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  iconOnly?: boolean;
}

/** Botón con el sistema `.btn` del prototipo. `primary` es el rojo base sin modificador. */
export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  iconOnly = false,
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const clases = [
    'btn',
    variant !== 'primary' && variant,
    size !== 'md' && size,
    block && 'block',
    iconOnly && 'icon-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <button type={type} className={clases} {...rest} />;
}
