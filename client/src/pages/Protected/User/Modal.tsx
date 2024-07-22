import { Field, Form, Formik } from "formik";
import TimeSchedule from "./TimeSchedule";
import { format } from "date-fns";
import createSchedule from "./data.create";


interface ModalProps {
  open: boolean;
  onClose: (value: boolean) => void;
  day: Date | null;
}


interface UserScheduleType {
  email: string;
  cellno: string;
  quantity: number;
  userId: number;
  year: number;
  month: string;
  day: number;
  time: string;
  therapyType: string;
}

interface UserData {
  id:number;
  cellno:string;
  email:string;
}


const Modal = ({ open, onClose, day }: ModalProps) => {
  const userDataString = localStorage.getItem("data");
  const userData:UserData = userDataString ? JSON.parse(userDataString) : null;
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onSubmit =async (values: { time: string; therapyType: string; quantity: number; }) => {
    if (day === null) {
      alert("Day is not selected");
      return;
    }

    const date = {
      userId: userData.id,
      year: parseInt(format(day, "yyyy"), 10),
      month: format(day, "MMMM"),
      day: parseInt(format(day, "dd"), 10),
      cellno: userData.cellno,
      email: userData.email
    }
    const allValues:UserScheduleType = {
      ...date,
      ...values,
    }

    if (values.time === "" ||  values.therapyType === "") {
      alert("Some of the values are not filled");
    } else {
      const create = await createSchedule(allValues);

      if(create.status){
        alert(create.message);
        console.log(allValues);
        onClose(false);
        window.location.reload();
      }else{
        alert(create.message)
        console.log("Something Wrong");
      }
    }
  };

  return (
    <div
      onClick={() => onClose(!open)}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={handleContentClick}
        className={`relative bg-slate-300 p-5 rounded-md shadow-md ${open ? "scale-100" : "scale-90 opacity-0"} duration-200`}
      >
        <div>
          <Formik
            initialValues={{
              time: '',
              type: '',
              therapyType: '',
              quantity: 1
            }}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="mb-2">
                  <h1 className="font-semibold mb-2">Time Schedule</h1>
                  <TimeSchedule setFieldValue={setFieldValue}  />
                </div>

                <div role="group">
                  <h1 className="font-semibold">Client Type</h1>
                  <label>
                    <Field type="radio" name="type" value="group" />
                    Group
                  </label>
                  <label>
                    <Field type="radio" name="type" value="individual" />
                    Individual
                  </label>
                </div>

                <div>
                  <h1 className="font-semibold">Therapy Type</h1>
                  <label>
                    <Field type="radio" name="therapyType" value="Tecar" />
                    Tecar
                  </label>
                  <label>
                    <Field type="radio" name="therapyType" value="Aquatic" />
                    Aquatic
                  </label>
                </div>

                {values.type === "group" && (
                  <div className="mt-2">
                    <label className="block">
                      Quantity
                      <Field
                        type="number"
                        name="quantity"
                        min="1"
                        placeholder="Enter quantity"
                        className="mt-1 p-1 border border-gray-300 rounded-md"
                      />
                    </label>
                  </div>
                )}

                <div className="flex justify-end mt-4">
                  <button
                    className="p-1 bg-blue-600 text-white border border-black rounded-md"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Modal;
