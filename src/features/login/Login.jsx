import React from "react";
import { useSelector } from "react-redux";
import { selectStatus } from "./userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Login({ onLogin }) {
  const status = useSelector(selectStatus);

  return (
    <div className="mx-auto container text-center mt-5">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          onLogin(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <div className="row mb-5 mx-auto" style={{ maxWidth: "20rem" }}>
            <Form className="form mx-auto form-group">
              <div className="form-group form-floating my-2 positio-relative">
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  id="emailInput"
                  placeholder="Email here..."
                  autoComplete="off"
                />
                <label htmlFor="emailInput" className="">
                  Email
                </label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="position-absolute bottom-0 start-50 translate-middle-x text-danger badge"
                />
              </div>

              <div className="form-group form-floating my-2">
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="Password here..."
                  autoComplete="off"
                  value={values.password}
                />
                <label htmlFor="passwordInput" className="">
                  Password
                </label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="position-absolute bottom-0 start-50 translate-middle-x text-danger badge"
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary p-3"
                  disabled={status !== "idle"}
                >
                  {status !== "idle" ? (
                    <div
                      className="spinner-border spinner-border-sm text-white"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
