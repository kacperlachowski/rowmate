import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* not found */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default App;
