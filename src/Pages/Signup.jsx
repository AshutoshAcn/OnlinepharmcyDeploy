import React, { useState } from "react";
import { Signuppost } from "../Redux/AuthReducer/action";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../model/ErrorModal";
import SuccessModal from "../model/SuccessModal";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required(" required")
    .min(3, "First Name is too short")
    .max(20, "First Name is too long"),
  lastName: yup
    .string()
    .trim()
    .required(" required")
    .min(3, "Last Name is too short")
    .max(50, "Last Name is too long"),
  email: yup
    .string()
    .trim()
    .required("required")
    .email("Invalid Email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address format"),
  contactNumber: yup
    .string()
    .trim()
    .required(" required")
    .test("is-text-or-number", "Contact No must be  number", (value) => {
      return /^\d+$/.test(value);
    })
    .min(10, "should be 10 max")
    .max(10, "Should be 10 max"),
  password: yup
    .string()
    .trim()
    .required(" required")
    .min(8, "password must be at least 8 characters")
    .max(15, "password is too long")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#])[a-zA-Z0-9@#]*$/,
      "password must be alphanumeric "
    ),
});

const CandidateForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorm, setErrorm] = useState(null);
  const [sucessmodel, setsucessmodal] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleKeyPress = (e, type, maxLength) => {
    const {
      key,
      target: { value },
    } = e;

    if (
      type === "number" &&
      (e.key < "0" || e.key > "9") &&
      e.key !== "Backspace"
    ) {
      e.preventDefault();
    }

    if (value.length >= maxLength && key !== "Enter") {
      e.preventDefault();
      return;
    }

    switch (type) {
      case "text":
        if (!/^[a-zA-Z\s]$/.test(key) && key !== "Enter") {
          e.preventDefault();
        }
        break;
      case "number":
        if (!/[0-9]/.test(key) && key !== "Enter") {
          e.preventDefault();
        } else if (!/[0-9.]/.test(key) && key !== "Enter") {
          e.preventDefault();
        }
        break;
      case "email":
        if (!/^[a-zA-Z0-9@._+-]$/.test(key) && key !== "Enter") {
          e.preventDefault();
        }
        break;
      case "percent":
        if (!/^[0-9.]$/.test(key) && key !== "%" && key !== "Enter") {
          e.preventDefault();
        }
        break;
      case "alphanumeric":
        if (!/^[a-zA-Z0-9_ ]$/.test(key) && key !== "Enter") {
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let candidatePayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        contactNumber: data.contactNumber,
        password: data?.password,
      };
      // console.log("candidatePayload", candidatePayload);

      const actionResult = await dispatch(Signuppost(candidatePayload));
      // console.log("actionResult", actionResult);

      if (actionResult?.type === "SIGNUPSUCCESS") {
        // console.log("Signup successful:", actionResult);

        if (
          actionResult?.payload?.message ===
          "User registered successfully, username sent via email"
        ) {
          setsucessmodal("Signup successful username sent on email check");

          setTimeout(() => {
            navigate("/login");
            setLoading(false);
          }, 1000);
        }
      }
      // Check for SIGNUPFAILURE action
      else if (actionResult?.type === "SIGNUPFAILURE") {
        const message = actionResult?.payload?.response?.data?.message;

        if (message === "User registered successfully") {
          setsucessmodal("Signup successful ");
        } else if (message === "User already exists") {
          setErrorm("User already exists");
        } else {
          setErrorm("Signup attempt failed. Please try again.");
        }
        setLoading(false);
      }
    } catch (err) {
      console.log("Error occurred:", err);
      setErrorm("Signup attempt failed or something went wrong");
    } finally {
      setLoading(false);
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
            <div>
              {/* <img
                src={ACNHealthcareLogo}
                alt="ACN Healthcare"
                className="mx-auto"
                style={{ maxWidth: "200px" }}
              /> */}
            </div>
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Online Pharmacy
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSubmit(onSubmit)} id="candidateForm">
                    {" "}
                    <div className="mb-4">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-600"
                      >
                        First Name
                        {errors.firstName && (
                          <span className="text-red-500 text-sm mt-1 px-2">
                            {errors.firstName.message}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        {...register("firstName")}
                        onKeyPress={(e) => handleKeyPress(e, "text", 50)}
                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Last Name
                        {errors.lastName && (
                          <span className="text-red-500 text-sm mt-1 px-2">
                            {errors.lastName.message}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        {...register("lastName")}
                        onKeyPress={(e) => handleKeyPress(e, "text", 50)}
                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Email{" "}
                        {errors.email && (
                          <span className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                          </span>
                        )}
                      </label>
                      <input
                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        id="email"
                        {...register("email")}
                        maxLength={150}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="contactNumber"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Contact No{" "}
                        {errors.contactNumber && (
                          <span className="text-red-500 text-sm mt-1">
                            {errors.contactNumber.message}
                          </span>
                        )}
                      </label>
                      <input
                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        id="contactNumber"
                        {...register("contactNumber")}
                        // minLength={10}
                        maxLength={10}
                        
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600"
                      >
                        password{" "}
                        {errors.password && (
                          <span className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                          </span>
                        )}
                      </label>
                      <input
                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="password"
                        id="password"
                        {...register("password")}
                        // minLength={8}
                        maxLength={15}
                      />
                    </div>
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
                    <div className="mb-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                      >
                        {loading ? "Signing Up..." : "Sign Up"}
                      </button>
                    </div>
                    <div className="flex py-2 justify-center">
                      <span className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <a
                          href="/login"
                          className="text-blue-500 hover:underline"
                        >
                          Login Here
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

export default CandidateForm;
