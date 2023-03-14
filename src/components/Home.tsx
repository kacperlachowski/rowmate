import { Table } from 'api/gql/graphql';
import useTables from '../api/query/useTables';
import DataGrid, { Columns } from '../modules/datagrid';

const columns: Columns<Table> = [
  {
    name: 'ID',
    type: 'string',
    getValue: (item: Table) => item.id,
  },
  {
    name: 'Name',
    type: 'string',
    getValue: (item: Table) => item.name,
  },
  {
    name: 'Description',
    type: 'string',
    getValue: (item: Table) => item.description ?? '',
  },
];

const Home = () => {
  const { data } = useTables();

  if (!data) {
    return <>Loading...</>;
  }
  return <DataGrid data={data.tables} columns={columns as Columns<unknown>} />;
};

export default Home;
