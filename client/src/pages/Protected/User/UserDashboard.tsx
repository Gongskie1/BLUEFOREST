import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import createSchedule from "../../../process/create-schedule.process";

type initialValuesTypes = {
  userId: number;
  therapyType: string;
  phoneNumber: string;
  dateTime: string;
  firstName: string;
  lastName: string;
  gender: string;
};

const UserDashboard = () => {
  const userId = useSelector((state: RootState) => state.userData.id);
  const username = useSelector((state: RootState) => state.userData.username);

  const initialValues: initialValuesTypes = {
    userId,
    therapyType: "",
    phoneNumber: "",
    dateTime: "",
    firstName: "",
    lastName: "",
    gender: "",
  };

  const validationSchema = Yup.object({
    therapyType: Yup.string().required("Therapy Type is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    dateTime: Yup.date().required("Date and Time are required").nullable(),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = async (values: initialValuesTypes, actions: FormikHelpers<initialValuesTypes>) => {
    const response = await createSchedule(values);
    console.log(response);
    if (response.message === "Schedule created successfully") {
      alert("Schedule created successfully");
    } else {
      alert(response.message);
    }
    actions.resetForm();
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">{`${username} ${userId}`}</h1>

        {/* Create Schedule Form in Sidebar */}
        <div className="bg-gray-200 p-6">
          <h2 className="text-xl font-bold mb-2">Create New Schedule</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-1 block w-full border p-2"
                    placeholder="Enter first name"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-600" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="mt-1 block w-full border p-2"
                    placeholder="Enter last name"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-600" />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <Field
                    as="select"
                    id="gender"
                    name="gender"
                    className="mt-1 block w-full border p-2"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="text-red-600" />
                </div>
                <div>
                  <label htmlFor="therapyType" className="block text-sm font-medium text-gray-700">
                    Therapy Type
                  </label>
                  <Field
                    as="select"
                    id="therapyType"
                    name="therapyType"
                    className="mt-1 block w-full border p-2"
                  >
                    <option value="">Select Therapy Type</option>
                    <option value="tecar">Tecar</option>
                    <option value="aquatic">Aquatic</option>
                  </Field>
                  <ErrorMessage name="therapyType" component="div" className="text-red-600" />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="mt-1 block w-full border p-2"
                    placeholder="Enter phone number"
                  />
                  <ErrorMessage name="phoneNumber" component="div" className="text-red-600" />
                </div>
                <div>
                  <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
                    Date and Time
                  </label>
                  <Field
                    type="datetime-local"
                    id="dateTime"
                    name="dateTime"
                    className="mt-1 block w-full border p-2"
                  />
                  <ErrorMessage name="dateTime" component="div" className="text-red-600" />
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600 w-full"
                    disabled={formikProps.isSubmitting}
                  >
                    {formikProps.isSubmitting ? "Saving..." : "Save Schedule"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* End of Sidebar */}

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {/* Schedule Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {initialScheduleItems.map((item) => (
            <div key={item.id} className="border p-4 text-sm shadow-lg bg-white rounded-md">
              <p className="text-gray-800 font-semibold">Name: {item.name}</p>
              <p className="text-gray-600">Gender: {item.gender}</p>
              <p className="text-gray-600">CelNo: {item.celNo}</p>
              <p className="text-gray-600">Schedule: {item.schedule}</p>
              <p className="text-gray-600">Status: {item.status}</p>
            </div>
          ))} */}
        </div>
      </div>
      {/* End of Main Content */}
    </div>
  );
};

export default UserDashboard;
