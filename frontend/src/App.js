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
            <Route path={'/'} element={<Home />}></Route>
            <Route path={'/login'} element={<Login />}></Route>
            <Route path={'/register'} element={<Registration />}></Route>
            <Route path={'/posts/:id'} element={<FullPost />}></Route>
            <Route path={'/add-post'} element={<AddPost />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
