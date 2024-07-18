import { useDispatch } from "react-redux";
import { CustomInput } from "../components";
import loginProcess from "../process/logic.process";
import loginSchema from "../schema/loginShema";
import { initialValuesTypes } from "../types";
import useCustomFormik from "../utils/formikHooks";
import { setStatus } from "../state/counter_slice/statusSlice";
import { useNavigate, Link } from "react-router-dom";
import { setData } from "../state/counter_slice/userSlice";

// type UserType = "user" | "admin";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  async function onSubmit(values: initialValuesTypes) {
    try {
      const findUser = await loginProcess(values);
      if (!findUser) {
        dispatch(setStatus(false));
        console.log("Incorrect credentials", findUser);
        navigate("/login");
      } else {
        dispatch(setStatus(true));
        dispatch(setData(findUser.data));
        // Set the entire user data object
        if (findUser.data.userType === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
       console.log("This is else",findUser.data.userType);
      }
    } catch (error) {
      console.log("Onsubmit login error:", error);
    }
  }

  const { getFieldProps, touched, errors, handleSubmit } = useCustomFormik(
    initialValues,
    loginSchema,
    onSubmit
  );

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-3/4 lg:w-2/4 flex overflow-hidden">
        <div className="w-full lg:w-1/2 bg-gradient-to-r from-green-500 to-blue-500 p-8 flex flex-col justify-center">
          <h1 className="text-white text-4xl font-bold mb-4">Blue Forest</h1>
          <h2 className="text-white text-2xl mb-6">Login</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <CustomInput inputTitle={"username"} boilerPlate={getFieldProps("username")} />
            {touched.username && errors.username && (
              <div className="text-red-500">{errors.username}</div>
            )}

            <CustomInput inputTitle={"password"} boilerPlate={getFieldProps("password")} />
            {touched.password && errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all"
            >
              Login
            </button>
          </form>
          <div className="mt-6">
            <p className="text-white">Don't have an account? <Link to="/create-account" className="underline">Create Account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
