import { Formik, Form, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/user/userSlice";
import styles from "../Modal.module.scss";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/auth/authSlice";

export default function RegModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.username.trim()) {
            errors.username = "Введите имя пользователя";
          }

          if (!values.email) {
            errors.email = "Введите email";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Неверный email";
          }

          if (!values.password) {
            errors.password = "Введите пароль";
          } else if (values.password.length < 6) {
            errors.password = "Минимум 6 символов";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          let users = JSON.parse(localStorage.getItem("users")) || [];

          if (users.some((user) => user.email === values.email)) {
            toast.error("❌ Пользователь с таким email уже существует");
            return;
          } else if (users.some((user) => user.username === values.username)) {
            toast.error("❌ Пользователь с таким именем уже существует");
            return;
          }

          users.push(values);
          localStorage.setItem("users", JSON.stringify(users));

          dispatch(setUser(values));
          dispatch(login(values));

          toast.success("✅ Успешная регистрация!");

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            navigate("/home");
          }, 1000);
        }}
      >
        {({ isSubmitting, validateForm, handleSubmit }) => (
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              const errors = await validateForm();
              if (Object.keys(errors).length > 0) {
                Object.values(errors).forEach((err) =>
                  toast.error(`❌ ${err}`)
                );
                return;
              }
              handleSubmit();
            }}
            className={styles.form}
          >
            <h2 className={styles.title}>Sign up</h2>

            <label className={styles.label}>
              Username
              <Field
                type="text"
                placeholder="Username"
                name="username"
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              E-Mail
              <Field
                type="email"
                placeholder="E-mail"
                name="email"
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              Password
              <Field
                type="password"
                placeholder="Password"
                name="password"
                className={styles.input}
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.btn}
            >
              Sign up
            </button>
            <p className={styles.text}>
              Already have an account?{" "}
              <span onClick={() => navigate("/login")} className={styles.span}>
                Log In
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
}
