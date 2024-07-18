import { useDispatch } from "react-redux";
import { CustomInput } from "../components";
import { loginProcess } from "../process/logic.process";
import loginSchema from "../schema/loginShema";
import { initialValuesTypes } from "../types";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import { setStatus } from "../state/counter_slice/statusSlice";
import { useNavigate, Link } from "react-router-dom";
import { setData } from "../state/counter_slice/userSlice";

type InitialValuesTypes = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values: initialValuesTypes, actions: FormikHelpers<InitialValuesTypes>) => {
    
    try {
      const findUser = await loginProcess(values);
      if (!findUser) {
        dispatch(setStatus(false));
        console.log("Incorrect credentials", findUser);
        alert("Incorrect credentials");
        actions.resetForm(); // Reset form fields
      } else {
        localStorage.setItem("status", "true");
        localStorage.setItem("data", JSON.stringify(findUser.data));
        const statusString = localStorage.getItem("status");
        const statusBoolean = statusString === "true";
        const userDataString = localStorage.getItem("data");
        const userData = userDataString ? JSON.parse(userDataString) : null;
        console.log(userData);
        // const jsonData = JSON.parse(userData);
        dispatch(setStatus(statusBoolean));
        dispatch(setData(userData));
        if (findUser.data.userType === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
        console.log("This is else", findUser.data.userType);
      }
    } catch (error) {
      console.log("Onsubmit login error:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-3/4 lg:w-2/4 flex overflow-hidden">
        <div className="w-full p-8 flex flex-col justify-center">
          <h1 className="text-blue-500 text-4xl font-bold mb-4">Blue Forest</h1>
          <h2 className="text-2xl mb-6">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={onSubmit}
          >
            {({ getFieldProps }) => (
              <Form className="space-y-6">
                <div>
                  <CustomInput inputTitle={"username"} boilerPlate={getFieldProps("username")} />
                  <ErrorMessage name="username" component="div" className="text-red-500" />
                </div>

                <div>
                  <CustomInput inputTitle={"password"} boilerPlate={getFieldProps("password")} />
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-black">
              Don't have an account? <Link to="/create-account" className="underline">Create Account</Link>
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
