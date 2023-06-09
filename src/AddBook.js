import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { API } from "./global";
import { useFormik } from "formik";
import * as yup from "yup";
//validation
// name -required
// poster - min 4 , required
// rating- 1-10 number, required
// summary - min 20 chars, required
// trailer - min 4, required

const bookvalidationSchema = yup.object({
  name: yup.string().required("Why not fill the name?😉"),
  poster: yup
    .string()
    .min(4, "Need a longer poster")
    .required("Why not fill the poster? 😉"),
  rating: yup
    .number()
    .min(0, "Need a higher rating")
    .max(10, "Too much rating")
    .required("Why not fill the rating?😉"),
  summary: yup
    .string()
    .min(20, "Need a longer summary")
    .required("Why not fill the summary? 😉"),
  trailer: yup
    .string()
    .min(4, "Need a longer trailer")
    .required("Why not fill the trailer? 😉"),
});

export function AddBook() {
  const formik = useFormik({
    initialValues: {
      name: "",
      poster: "",
      rating: "",
      summary: "",
      trailer: "",
    },
    validationSchema: bookvalidationSchema,
    onSubmit: (newBook) => {
      //console.log("onSubmit Newbook Data", newBook);
      createBook(newBook);
    },
  });

  const navigate = useNavigate();

  const createBook = (newBook) => {
    console.log("createBook", newBook);
    fetch(`${API}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((data) => data.json())
      .then(() => navigate("/books"));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="add-book-form">
      <TextField
        id="name"
        name="name"
        label="Name"
        variant="outlined"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error
        helperText="Nice Name"
      />
      {formik.touched.name && formik.errors.name ? formik.errors.name : ""}

      <TextField
        id="poster"
        name="poster"
        label="Poster"
        variant="outlined"
        value={formik.values.poster}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.poster && formik.errors.poster
        ? formik.errors.poster
        : ""}
      <TextField
        id="rating"
        name="rating"
        label="Rating"
        variant="outlined"
        value={formik.values.rating}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.rating && formik.errors.rating
        ? formik.errors.rating
        : ""}

      <TextField
        id="summary"
        name="summary"
        label="Summary"
        variant="outlined"
        value={formik.values.summary}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.summary && formik.errors.summary
        ? formik.errors.summary
        : ""}
      <TextField
        id="trailer"
        name="trailer"
        label="Trailer"
        variant="outlined"
        value={formik.values.trailer}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.trailer && formik.errors.trailer
        ? formik.errors.trailer
        : ""}

      {/* copy the bookList and add newBook */}

      <Button type="submit" variant="contained" onClick={createBook}>
        Add Book
      </Button>
    </form>
  );
}

//Task -12:45

// Edit book -> PUT method
// BookDetails + AddBook
//  /books/edit/:id - path
