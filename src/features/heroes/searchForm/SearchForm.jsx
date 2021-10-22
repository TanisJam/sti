import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function SearchForm() {
  return (
    <>
      <Formik
        initialValues={{ text: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.text) {
            errors.text = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values.text);
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <div className="row mb-5">
            <Form className="form-floating d-flex">
              <Field
                type="text"
                name="text"
                className="form-control"
                id="floatingInput"
                placeholder="Hero Name"
                aria-describedby="button-addon2"
              />

              <label htmlFor="floatingInput" className="px-4">Hero Name</label>
              <button
                className="btn btn-primary"
                type="submit"
                id="button-addon2"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
            <ErrorMessage
              className="mx-auto text-center"
              name="text"
              component="div"
            />
          </div>
        )}
      </Formik>
    </>
  );
}
{
  /* <form className="form-floating mb-3 d-flex" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Hero Name"
            aria-describedby="button-addon2"
            value={heroName}
            onChange={handleChange}
          />
          <button className="btn btn-primary" type="submit" id="button-addon2">
            Search
          </button>
          <label htmlFor="floatingInput">Hero Name</label>
        </form> */
}
