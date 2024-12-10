import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Input } from "@material-tailwind/react";
import { useStore } from "../../store";
import { toast } from "react-toastify";
import { login } from "../service/authService";

const Login = () => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setAuthState = useStore((state) => state.setAuthState);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const _onLogin = async (values) => {
    try {
      const { token, user } = await login(values.email, values.password);

      localStorage.setItem("token", token);

      setAuthState({
        email: user.email,
        role: user.role,
        department: user.department,
        token: token,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-1 flex-col px-6 py-12 lg:px-8 h-screen items-center justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={logo} className="mx-auto h-20 w-auto" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email format")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            _onLogin(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            handleSubmit,
            isSubmitting,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    color="gray"
                    size="lg"
                    crossOrigin="false"
                    className="placeholder:opacity-100"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={handleChange}
                    value={values.email}
                    error={
                      errors.email && touched.email && errors.email
                        ? true
                        : false
                    }
                    success={!errors.email && touched.email}
                  />
                  <span className="text-xs">
                    {errors.email && touched.email && <div>{errors.email}</div>}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
                </div>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    color="gray"
                    size="lg"
                    crossOrigin="false"
                    className="placeholder:opacity-100"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={handleChange}
                    autoComplete="current-password"
                    value={values.password}
                    error={
                      errors.password && touched.password && errors.password
                        ? true
                        : false
                    }
                    success={!errors.password && touched.password}
                  />
                  <span className="text-xs">
                    {errors.password && touched.password && (
                      <div>{errors.password}</div>
                    )}
                  </span>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-red-600 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Sign in
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
