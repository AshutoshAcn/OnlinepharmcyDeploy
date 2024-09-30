import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { GenerateOTP, ResetPasswordWithOTP } from "../Redux/AuthReducer/action";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import SuccessModal from "../model/SuccessModal";
import ErrorModal from "../model/ErrorModal";

const schema = yup.object().shape({
  Password: yup
    .string()
    .trim()
    .required("Password is required")  
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password can be maximum 15 characters long"),
    // .matches(
    //   /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#])[a-zA-Z0-9@#]*$/,
    //   ""
    // ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("Password"), null], "Passwords must match"),
  otp: yup.string().required("OTP is required"),
});

const Forgetpassword = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [remainingSec, setRemainingSec] = useState(10);
  const [loadBox, setLoadBox] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [emailIdError, setEmailIdError] = useState({});

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // console.log(data);

    setLoading(true);
    try {
      setLoading(true);

      const payload = {
        newPassword: data.Password,
        otp: data.otp,
        email: emailId,
      };

      const response = await dispatch(ResetPasswordWithOTP(payload));
      console.log(response.payload.data.message);

      if (response.payload.data.message === "Password reset successfully") {
        setSuccessModal("Password Reset Successfull");
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        setLoadBox(false);
      } else if (response.payload.data.message === "Invalid OTP") {
        setErrorModal(response.payload.data.message);

        setLoading(false);
      } else if (response.payload.data.message === "Expired OTP") {
        setErrorModal(response.payload.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);

        setLoading(false);
      } else if (response.payload.data.message === "User not found") {
        toast.error("Email ID does not exist");
        setLoading(false);
      }
    } catch (err) {
      console.log("error:", err);
      console.log(response);
      toast.error("Server Down, Please Try After Some Time");
      setLoading(false);
    }
  };

  const validateEmail = async () => {
    const errors = {};
    if (!emailId.trim()) {
      errors.emailId = "required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailId)) {
        errors.emailId = "Invalid email format";
      }
    }
    setEmailIdError(errors);
    // console.log(emailIdError);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  // console.log("shamaiel.wani@acnhealthcare.com", loading);
  const generateOtp = async () => {
    let payload = {
      email: emailId,
    };

    setLoading(true);
    const formData = getValues(); // Assuming getValues() retrieves form data including EmailId
    const isValid = await validateEmail(); // Wait for email validation to complete
    // console.log(isValid, "issssss");

    if (isValid) {
      try {
        //setLoading(true);

        await dispatch(GenerateOTP(payload))
          .then((res) => {
            console.log(res, "hheeeeee");
            if (res.payload.data.message === "OTP sent to email") {
              setLoading(false);
              toast.success("OTP generated successfully!");
              setLoadBox(true);
              setRemainingSec(120);
            } else if (res.payload.data.message === "User not found") {
              setErrorModal(res.payload.data.message);
              setLoading(false);
            } else {
              setErrorModal("Email ID does not exist");
              setLoading(false);
            }
          })
          .catch((err) => {
            setErrorModal("Server Down. Please Retry later");
            setLoading(false);
          });
      } catch (error) {
        console.error("Error generating OTP:", error);
        setErrorModal("An error occurred. Please try again.");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (loadBox && remainingSec > 0) {
      timer = setTimeout(() => {
        setRemainingSec(remainingSec - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [loadBox, remainingSec]);

  useEffect(() => {
    if (remainingSec === 0) {
      setLoadBox(false);
      setErrorModal("Regenerate OTP");
    }
  }, [remainingSec]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div></div>
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Online Pharmacy -{" "}
                    <span className="text-red-600 font-extrabold">
                      Forgot Password
                    </span>
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <label
                        htmlFor="EmailId"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Email Id{" "}
                        {emailIdError.emailId && (
                          <span className="text-red-500 text-sm mt-1">
                            {emailIdError.emailId}
                          </span>
                        )}
                      </label>
                      <input
                     
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        //id="EmailId"
                        value={emailId}
                        onChange={(e) => {
                          // Restrict input to numbers only
                          setEmailId(e.target.value);
                        }}
                      />
                    </div>

                    {loadBox && (
                      <>
                        <div className="mb-4">
                          <label
                            htmlFor="otp"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Enter OTP{" "}
                            {errors.otp && (
                              <span className="text-red-500 text-sm mt-1">
                                {errors.otp.message}
                              </span>
                            )}
                          </label>
                          <input
                            {...register("otp")}
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="text"
                            id="otp"
                          />
                        </div>
                        <p className="mb-4 text-red-500">
                          OTP valid for : {remainingSec} sec
                        </p>
                      </>
                    )}

                    {!loadBox && (
                      <button
                        onClick={generateOtp}
                        className="mt-5 tracking-wide font-semibold bg-green-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        type="button"
                      >
                        Generate OTP
                      </button>
                    )}

                    {loadBox && (
                      <>
                        <div className="mb-4">
                          <label
                            htmlFor="Password"
                            className="block text-sm font-medium text-gray-600"
                          >
                            New Password{" "}
                            {errors.Password && (
                              <span className="text-red-500 text-sm mt-1">
                                {errors.Password.message}
                              </span>
                            )}
                          </label>
                          <input
                            {...register("Password")}
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="password"
                            id="Password"
                            maxLength={15}
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Confirm Password{" "}
                            {errors.confirmPassword && (
                              <span className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                              </span>
                            )}
                          </label>
                          <input
                            {...register("confirmPassword")}
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="password"
                            id="confirmPassword"
                          />
                        </div>

                        <div className="flex justify-center">
                          <button
                            className="mt-5 tracking-wide font-semibold bg-red-500 text-gray-100 w-full py-4 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            type="submit"
                          >
                            <svg
                              className="w-6 h-6 -ml-2"
                              fill="none"
                              stroke="currentColor"
                              strokeLinejoin="2"
                              strokeLinecap="round"
                            >
                              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                              <circle cx="8.5" cy="7" r="4" />
                              <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">Reset Password</span>
                          </button>
                        </div>
                      </>
                    )}

                    {loading && (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
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
      <ToastContainer />

      {successModal && (
        <SuccessModal
          msg={successModal}
          onClose={() => setSuccessModal(false)}
        />
      )}

      {errorModal && (
        <ErrorModal msg={errorModal} onClose={() => setErrorModal(false)} />
      )}
    </>
  );
};

export default Forgetpassword;
