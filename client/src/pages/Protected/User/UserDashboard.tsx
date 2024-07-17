import { useState } from "react";
import { Formik, Form, Field, ErrorMessage,FormikHelpers } from "formik";
import * as Yup from "yup";

type initialValuesTypes = {
  therapyType:string;
  phoneNumber:string;
  dateTime: string;
}

const UserDashboard = () => {
  const [scheduleItems, setScheduleItems] = useState([]);

  const initialScheduleItems = [
    { id: 1, name: "Mark Joseph Tiempo", gender: "Male", celNo: "09816442772", schedule: "May 10 - 1pm", status: "Accepted" },
    { id: 2, name: "Mark Joseph Tiempo", gender: "Male", celNo: "09816442772", schedule: "May 10 - 1pm", status: "Accepted" },
    { id: 3, name: "Mark Joseph Tiempo", gender: "Male", celNo: "09816442772", schedule: "May 10 - 1pm", status: "Accepted" },
    { id: 4, name: "Mark Joseph Tiempo", gender: "Male", celNo: "09816442772", schedule: "May 10 - 1pm", status: "Accepted" },
    { id: 5, name: "Mark Joseph Tiempo", gender: "Male", celNo: "09816442772", schedule: "May 10 - 1pm", status: "Accepted" },
    { id: 6, name: "Mark Joseph Tiempo", gender: "Male", celNo: "09816442772", schedule: "May 10 - 1pm", status: "Accepted" },
  ];

  const initialValues = {
    therapyType: "",
    phoneNumber: "",
    dateTime: "",
  };

  const validationSchema = Yup.object({
    therapyType: Yup.string().required("Therapy Type is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    dateTime: Yup.date().required("Date and Time are required").nullable(),
  });

  const handleSubmit = async (values: initialValuesTypes,actions: FormikHelpers<initialValuesTypes>) => {
    console.log("Form values:", values);
    actions.resetForm()
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Mark Joseph Tiempo</h1>

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
          {initialScheduleItems.map((item) => (
            <div key={item.id} className="border p-4 text-sm shadow-lg bg-white rounded-md">
              <p className="text-gray-800 font-semibold">Name: {item.name}</p>
              <p className="text-gray-600">Gender: {item.gender}</p>
              <p className="text-gray-600">CelNo: {item.celNo}</p>
              <p className="text-gray-600">Schedule: {item.schedule}</p>
              <p className="text-gray-600">Status: {item.status}</p>
            </div>
          ))}
        </div>
      </div>
      {/* End of Main Content */}
    </div>
  );
};

export default UserDashboard;
