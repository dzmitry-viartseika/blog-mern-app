import Container from "@mui/material/Container";
import { useEffect } from 'react';

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/auth-slice.js';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Registration />} />
            <Route path={'/posts/:id'} element={<FullPost />} />
            <Route path={'/posts/:id/edit'} element={<AddPost />} />
            <Route path={'/add-post'} element={<AddPost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
