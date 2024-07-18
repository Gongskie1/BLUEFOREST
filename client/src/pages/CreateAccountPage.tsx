import { useDispatch } from "react-redux";
import { CustomInput } from "../components";
import createAccountProcess from "../process/logic.process";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { setStatus } from "../state/counter_slice/statusSlice";

type InitialValuesTypes = {
    username:string;
    password:string;
}

const CreateAccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const onSubmit = async (values:InitialValuesTypes) => {
    try {
      const newUser = await createAccountProcess(values);
      if (newUser.status) {
        dispatch(setStatus(newUser.status));
        navigate("/dashboard");
      } else {
        console.log("Account creation failed", newUser);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Onsubmit create account error:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-3/4 lg:w-2/4 flex overflow-hidden">
        <div className="w-full p-8 flex flex-col justify-center">
          <h1 className="text-blue-500 text-4xl font-bold mb-4">Blue Forest</h1>
          <h2 className="text-2xl mb-6">Create Account</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
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
                  Create Account
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;