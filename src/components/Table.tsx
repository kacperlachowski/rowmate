import { useParams } from 'react-router-dom';

type RouteParams = {
  id: string;
};

const Table = () => {
  const { id } = useParams<RouteParams>();

  return <>Table: {id}</>;
};

export default Table;
