import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth-slice';
import { useSelector, useDispatch } from "react-redux";

import styles from "./Login.module.scss";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));

        if (!data.payload) {
            return alert('Не удалось авторизоваться!');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: 'test@test.ru',
            password: '123',
        },
        mode: 'onChange',
    });

    if (isAuth) {
        return <NavLink to="/" />;
    }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
              className={styles.field}
              label="E-Mail"
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              type="email"
              {...register('email', { required: 'Укажите почту' })}
              fullWidth
          />
          <TextField
              className={styles.field}
              label="Пароль"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register('password', { required: 'Укажите пароль' })}
              fullWidth
          />
          <Button disabled={!isValid} size="large" type="submit" variant="contained" fullWidth>
              Войти
          </Button>
      </form>
    </Paper>
  );
};
