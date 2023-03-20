import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/layout';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Table from './components/Table';
import Unauthorized from './components/Unauthorized';
import ThemeModeProvider from './context/ThemeProvider';

const App = () => {
  return (
    <ThemeModeProvider>
      <Routes>
        {/* public */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
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
    </ThemeModeProvider>
  );
};

export default App;
