import { Route, Routes } from 'react-router-dom';
import Table from './components/Table';
import Home from './components/Home';
import Layout from './components/layout';
import Login from './components/Login';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';

const App = () => {
  return (
    <Routes>
      {/* public */}
      <Route path="login" element={<Login />} />
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* protected */}
      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<Table />} />
        </Route>
      </Route>

      {/* not found */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

export default App;
