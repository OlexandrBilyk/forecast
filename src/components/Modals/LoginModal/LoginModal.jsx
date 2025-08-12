import { Form, Formik, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "../Modal.module.scss";
import { setUser } from "../../../redux/user/userSlice";
import { login } from "../../../redux/auth/authSlice";

export default function LoginModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.username.trim()) {
            errors.username = "Введите имя пользователя";
          }
          if (!values.password) {
            errors.password = "Введите пароль";
          } else if (values.password.length < 6) {
            errors.password = "Минимум 6 символов";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const users = JSON.parse(localStorage.getItem("users")) || [];

          const foundUser = users.find(
            (user) =>
              user.username === values.username &&
              user.password === values.password
          );

          if (!foundUser) {
            toast.error("❌ Неверные данные для входа");
            return;
          }

          dispatch(setUser(values));
          dispatch(login(foundUser));

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
            <h2 className={styles.title}>Login</h2>

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
              Login
            </button>
            <p className={styles.text}>
              Want to create an account?{" "}
              <span onClick={() => navigate("/")} className={styles.span}>
                Sign up
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
}
