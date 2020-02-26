import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const initialData = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      width: 500,
      margin: "auto",
      display: 'flex',
      flexDirection: 'column'
    }
  }
}));

const UpdateMovie = props => {
  const classes = useStyles();
  const [movie, setMovie] = useState(initialData);
  const { id } = useParams();

  useEffect(() => {
    const movieToUpdate = props.movieList.find(thing => `${thing.id}` === id);
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movieList, id]);

  const handleChange = e => {
    e.persist();
    let value = e.target.value;
    if(e.target.name === 'stars'){
      value = value.split(',')
    }
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log('response from put',res);
        props.setMovieList(res.data)
        props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
      <form
        className={classes.root}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          name="title"
          onChange={handleChange}
          value={movie.title}
          label="Title"
        />
        <TextField
          id="standard-basic"
          name="director"
          onChange={handleChange}
          value={movie.director}
          label="Director"
        />
        <TextField
          id="standard-basic"
          name="metascore"
          onChange={handleChange}
          value={movie.metascore}
          label="Metascore"
        />
        <TextField
          multiline
          id="standard-basic"
          name="stars"
          onChange={handleChange}
          value={movie.stars}
          label="Stars"
        />
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
  );
};

export default UpdateMovie;
