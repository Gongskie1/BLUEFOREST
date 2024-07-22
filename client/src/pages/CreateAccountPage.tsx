import { useDispatch } from "react-redux";
import { CustomInput } from "../components";
import { createAccount } from "../process/logic.process";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { setStatus } from "../state/counter_slice/statusSlice";

type InitialValuesTypes = {
  username: string;
  password: string;
  email: string;
  cellno: string;
  gender: string;
  address: string;
};

const CreateAccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: InitialValuesTypes = {
    username: "",
    password: "",
    email: "",
    cellno: "",
    gender: "",
    address: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    cellno: Yup.string().required("Cell number is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
  });

  const onSubmit = async (values: InitialValuesTypes, actions: FormikHelpers<InitialValuesTypes>) => {
    try {
      const newUser = await createAccount(values);
      if (newUser.status) {
        dispatch(setStatus(newUser.status));
        navigate("/dashboard");
      } else {
        console.log("Account creation failed", newUser.message);
        alert(newUser.message);
        actions.resetForm();
        navigate("/create-account");
      }
    } catch (error) {
      console.log("Onsubmit create account error:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 flex overflow-hidden">
        <div className="w-full p-8 flex flex-col justify-center">
          <h1 className="text-blue-500 text-4xl font-bold mb-4">Blue Forest</h1>
          <h2 className="text-2xl mb-6">Create Account</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ getFieldProps }) => (
              <Form >
                <div
                className=" grid grid-cols-2  gap-4 "
                >
                  <div className="">
                    <CustomInput inputTitle="Username" boilerPlate={getFieldProps("username")} />
                    <ErrorMessage name="username" component="div" className="text-red-500" />
                  </div>

                  <div className="">
                    <CustomInput inputTitle="Password" boilerPlate={getFieldProps("password")} />
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                  </div>

                  <div className="">
                    <CustomInput inputTitle="Email" boilerPlate={getFieldProps("email")} />
                    <ErrorMessage name="email" component="div" className="text-red-500" />
                  </div>

                  <div className="">
                    <CustomInput inputTitle="Cell Number" boilerPlate={getFieldProps("cellno")} />
                    <ErrorMessage name="cellno" component="div" className="text-red-500" />
                  </div>

                  <div className="">
                    <label className="block text-gray-700">Gender</label>
                    <select
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      {...getFieldProps("gender")}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <ErrorMessage name="gender" component="div" className="text-red-500" />
                  </div>

                  <div className="border">
                    <CustomInput inputTitle="Address" boilerPlate={getFieldProps("address")} />
                    <ErrorMessage name="address" component="div" className="text-red-500" />
                  </div>
                </div>

                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Create Account
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-black">
              Already have an account? <button onClick={() => navigate("/login")} className="underline">Login</button>
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

export default CreateAccountPage;
