import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/user/userSlice";
import { login } from "../../../redux/auth/authSlice";
import { setCities } from "../../../redux/cities/CitiesSlice";
import { useNavigate } from "react-router-dom";
import styles from "../Modal.module.scss";

export default function RegModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === values.email)) {
      toast.error("❌ User with this email already exists");
      return;
    } else if (users.some((user) => user.username === values.username)) {
      toast.error("❌ User with this username already exists");
      return;
    }

    users.push(values);
    localStorage.setItem("users", JSON.stringify(users));

    dispatch(setUser(values));
    dispatch(login(values));

    const cities = JSON.parse(
      localStorage.getItem(`cities${values?.username}`) || "{}"
    );

    if (cities) {
      dispatch(setCities(cities));
    }

    toast.success("✅ Registration successful!");

    setTimeout(() => {
      reset();
      navigate("/home");
    }, 1000);
  };

  const onError = (errors) => {
    Object.values(errors).forEach((err) => {
      toast.error(`❌ ${err.message}`);
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
        <h2 className={styles.title}>Sign up</h2>

        <label className={styles.label}>
          Username
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            {...register("username", {
              required: "Please enter username",
              validate: (value) =>
                value.trim() !== "" || "Please enter username",
            })}
          />
        </label>

        <label className={styles.label}>
          E-Mail
          <input
            type="email"
            placeholder="E-mail"
            className={styles.input}
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
        </label>

        <button type="submit" className={styles.btn}>
          Sign up
        </button>

        <p className={styles.text}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className={styles.span}>
            Log In
          </span>
        </p>
      </form>
    </>
  );
}
