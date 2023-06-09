import { ItemProps } from 'react-virtuoso';

export type DataItem<T> = Record<'id', string> & T;

export type VirtuosoItemProps<T> = ItemProps<DataItem<T>>;

export type ColumnType<T> =
  | {
      type: 'string';
      getValue: (item: DataItem<T>) => string;
    }
  | {
      type: 'number';
      getValue: (item: DataItem<T>) => number;
    }
  | {
      type: 'boolean';
      getValue: (item: DataItem<T>) => boolean;
    }
  | {
      type: 'component';
      getValue: (item: DataItem<T>) => JSX.Element;
    };

export type Column<T> = {
  name: string;
  renderHeader?: () => JSX.Element;
} & ColumnType<T>;

export type Columns<T> = Column<T>[];

export type DataGridProps<T> = {
  data: DataItem<T>[];
  columns: Column<T>[];
  onBottom?: (index: number) => void;
  selectable?: boolean;
};
