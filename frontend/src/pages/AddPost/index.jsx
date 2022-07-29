import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth-slice";
import { useNavigate } from 'react-router-dom';
import axios from '../../api/api.js'

export const AddPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
    const [isLoading, setLoading] = React.useState(false);
    const [text, setText] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const inputFileRef = React.useRef(null);
    const isEditing = Boolean(id);

    const handleChangeFile = async (event) => {
    try {
        const formData = new FormData();
        const file = event.target.files[0]
        formData.append('image', file);
        const { data } = await axios.post('/upload', formData);
        console.log(data);
        setImageUrl(data.url);
    } catch (err) {
        console.log(err);
        alert('Ошибка при загрузке файла')
    }
  };

    const onClickRemoveImage = () => {
    setImageUrl(null);
  };

    const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

    const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
    );

    const onSubmit = async () => {
        try {
            setLoading(true);

            const fields = {
                title,
                imageUrl,
                tags,
                text,
            };

            const { data } = isEditing
                ? await axios.patch(`/posts/${id}`, fields)
                : await axios.post('/posts', fields);

            const _id = isEditing ? id : data._id;

            navigate(`/posts/${_id}`);
        } catch (err) {
            console.warn(err);
            alert('Ошибка при создании статьи!');
        }
    };

    if (!window.localStorage.getItem('token') && !isAuth) {
        navigate('/');
    }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input
          type="file"
          onChange={handleChangeFile}
          hidden
          ref={inputFileRef}
      />
      {imageUrl && (
        <>
            <img
                className={styles.image}
                src={`${process.env.REACT_APP_URL}${imageUrl}`}
                alt="Uploaded"
            />
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                Удалить
            </Button>
        </>
      )}
      <br />
      <br />
      <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок статьи..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
      />
      <TextField
          classes={{ root: styles.tags }}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          variant="standard"
          placeholder="Тэги"
          fullWidth
      />
      <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
