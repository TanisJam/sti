import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function SearchForm({ onSearch }) {
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
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSearch(values.text);
          resetForm();
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <div className="row mb-5 position-relative">
            <Form className="form-floating d-flex">
              <Field
                type="text"
                name="text"
                className="form-control"
                id="floatingInput"
                placeholder="Hero Name"
                aria-describedby="buttonSearch"
              />

              <label htmlFor="floatingInput" className="px-4">
                Hero Name
              </label>
              <button
                className="btn btn-primary"
                type="submit"
                id="buttonSearch"
                disabled={isSubmitting}
              >
                Search
              </button>
            </Form>
            <ErrorMessage
              className="position-absolute bottom-0 start-50 translate-middle-x text-danger badge"
              name="text"
              component="div"
            />
          </div>
        )}
      </Formik>
    </>
  );
}
