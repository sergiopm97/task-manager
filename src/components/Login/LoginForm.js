import * as yup from "yup";
import firebaseApp from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { useState } from "react";
import "./styles/loginForm.scss";

const auth = getAuth(firebaseApp);

const RegisterSchema = yup.object().shape({
  email: yup.string().email("Use a valid email").required("An email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters long").required("A password is required"),
});

function LoginForm() {
  const [emailExists, setEmailExists] = useState(false);
  const [registrationDone, setRegistrationDone] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, { resetForm }) => {
      const email = values.email;
      const password = values.password;
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setEmailExists(false);
          setRegistrationDone(true);
          resetForm({ values: "" });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setEmailExists(true);
          }
        });
    },
  });

  return (
    <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 2 }} className="login-container">
      {registrationDone && (
        <motion.span
          animate={{ y: [20, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          className="login-container--registration-completed"
        >
          Registration completed
        </motion.span>
      )}
      <motion.div
        animate={{ y: [100, 0], opacity: [0, 1] }}
        transition={{ delay: 0.2 }}
        className="login-container__content"
      >
        <h1 className="login-container__content--title">Register</h1>
        <form className="login-container__content__form" onSubmit={formik.handleSubmit}>
          <div className="login-container__content__form__field">
            <label className="login-container__content__form__field--label" htmlFor="email">
              Email
            </label>
            <input
              className="login-container__content__form__field--input"
              id="email"
              name="email"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.email}
            ></input>
            {formik.touched.email && formik.errors.email && (
              <span className="login-container__content__form__field--error">{formik.errors.email}</span>
            )}
            {emailExists && (
              <span className="login-container__content__form__field--error">Email already in use</span>
            )}
          </div>
          <div className="login-container__content__form__field">
            <label className="login-container__content__form__field--label" htmlFor="password">
              Password
            </label>
            <input
              className="login-container__content__form__field--input"
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>
            {formik.touched.password && formik.errors.password && (
              <span className="login-container__content__form__field--error">{formik.errors.password}</span>
            )}
          </div>
          <button className="login-container__content__form--submit" type="submit">
            Register
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default LoginForm;
