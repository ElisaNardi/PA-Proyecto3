import type { TableHTMLAttributes } from 'react';

/** Tabla con scroll horizontal (`.table-wrap`). Recibe `thead`/`tbody` como children. */
export function Table(props: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="table-wrap">
      <table {...props} />
    </div>
  );
}
