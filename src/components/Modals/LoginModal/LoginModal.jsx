import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "../Modal.module.scss";
import { setUser } from "../../../redux/user/userSlice";
import { login } from "../../../redux/auth/authSlice";
import { setCities } from "../../../redux/cities/CitiesSlice";

export default function LoginModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (!foundUser) {
      toast.error("❌ Invalid login credentials");
      return;
    }

    dispatch(setUser(values));
    dispatch(login(foundUser));

    const savedUser = JSON.parse(
      localStorage.getItem("currentUser") || "[]"
    );

    const cities = JSON.parse(
      localStorage.getItem(`cities${savedUser?.username}`) || "{}"
    );

    if (cities) {
      dispatch(setCities(cities));
    }

    toast.success("✅ Login successful!");

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
        <h2 className={styles.title}>Login</h2>

        <label className={styles.label}>
          Username
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            {...register("username", {
              required: "Please enter username",
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
          Login
        </button>

        <p className={styles.text}>
          Want to create an account?{" "}
          <span onClick={() => navigate("/")} className={styles.span}>
            Sign up
          </span>
        </p>
      </form>
    </>
  );
}
