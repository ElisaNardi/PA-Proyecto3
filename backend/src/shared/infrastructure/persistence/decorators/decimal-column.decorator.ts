import { Column, ColumnOptions } from 'typeorm';

interface DecimalColumnOptions extends Partial<ColumnOptions> {
    precision?: number;
    scale?: number;
}

export function DecimalColumn(options: DecimalColumnOptions = {}) {
    const { precision = 5, scale = 2, ...rest } = options;

    return Column({
        type: 'decimal',
        precision,
        scale,
        transformer: {
            to: (value: number | null) => value,
            from: (value: string | null) => (value === null ? null : Number(value)),
        },
        ...rest
    });
}