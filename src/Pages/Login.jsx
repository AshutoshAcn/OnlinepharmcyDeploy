import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Loginpost } from "../Redux/AuthReducer/action";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../model/ErrorModal";
import SuccessModal from "../model/SuccessModal";
const schema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().trim().required("required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorm, setErrorm] = useState(null);
  const [sucessmodel, setsucessmodal] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    localStorage.clear();

    try {
      const actionResult = await dispatch(Loginpost(data));
      // console.log("actionResult",actionResult)
      // Handle successful login
      if (actionResult.type === "LOGINSUCCESS") {
        if (actionResult.payload.data.message === "Login successful") {
          localStorage.setItem(
            "userlogged",
            JSON.stringify(actionResult.payload.data)
          );
          // localStorage.setItem(
          //   "userlogged",
          //   JSON.stringify(actionResult.payload.data.token)
          // );
          setsucessmodal("Login Successfully");
          setLoading(false);

          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
      // Handle login failure
      else if (actionResult.type === "LOGINFAILURE") {
        const message = actionResult.payload.response.data.message;

        if (message === "User does not exist or account is inactive") {
          setErrorm("User does not exist or account is inactive");
        } else if (message === "Invalid credentials") {
          setErrorm("Invalid Credentials.");
        } else {
          setErrorm("Login attempt failed. Please try again.");
        }
        setLoading(false);
      }
    } catch (err) {
      console.log("Error occurred:", err);
      setErrorm("Server down, please try after some time.");
    } finally {
      setLoading(false); // Ensure loading is set to false after catch block
    }
  };

  const handleCloseErrorModal = () => {
    setErrorm(null);
  };
  
  const handleclosesucessmodal = () => {
    setsucessmodal(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">

            <div className="max-w-10">
              <h2>

              </h2>
            </div>

            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Online Pharmacy
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                      >
                        User Name{" "}
                        {errors.username && (
                          <span className="text-red-500 text-sm mt-1">
                            {errors.username.message}
                          </span>
                        )}
                      </label>
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        id="username"
                        {...register("username")}
                        maxLength={150}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Password{" "}
                        {errors.password && (
                          <span className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                          </span>
                        )}
                      </label>
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="password"
                        id="password"
                        {...register("password")}
                        // maxLength={15}
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        type="submit"
                      >
                        {loading && (
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                          >
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014.022 7.02L2.278 8.764l1.414 1.414 1.286-1.286A5.5 5.5 0 1010.5 17.5h-2.002zm2-10.582A8.006 8.006 0 0117.02 4.02L15.276 2.276A9.957 9.957 0 0012 2C6.486 2 2 6.486 2 12h4zm8 2.582A8.004 8.004 0 0119.978 16.98L21.722 15.24l-1.414-1.414-1.286 1.286a5.5 5.5 0 10-6.64-8.828l-1.287 1.286 1.414 1.414 1.25-1.25a8.001 8.001 0 017.748 10.496L19 21.016A9.956 9.956 0 0012 22c5.514 0 10-4.486 10-10h-4z"
                              ></path>
                            </svg>
                          </div>
                        )}

                        <svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-3">Sign In</span>
                      </button>
                    </div>

                    <div className="flex justify-center">
                      <span className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a
                          href="/signup"
                          className="text-blue-500 hover:underline"
                        >
                          Create one
                        </a>
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <span className="text-sm text-gray-600">
                        Forget{" "}
                        <a
                          href="/forget"
                          className="text-blue-500 hover:underline"
                        >
                          password ?
                        </a>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat onboardingimgbg"></div>
          </div>
        </div>
      </div>
      {errorm && <ErrorModal msg={errorm} onClose={handleCloseErrorModal} />}

      {sucessmodel && (
        <SuccessModal msg={sucessmodel} onClose={handleclosesucessmodal} />
      )}
    </>
  );
};
export default Login;
