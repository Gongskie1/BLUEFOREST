import { useState } from "react";


interface SetfieldProps {
  setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void;
}

const timeSchedule = ["8:00am", "10:00am", "12:00pm", "1:00pm", "3:00pm"];

const TimeSchedule = ({ setFieldValue }: SetfieldProps) => {
  const [activeTime, setActiveTime] = useState<string | null>(null);

  function handleClick(time: string) {
    setActiveTime(time);
    setFieldValue("time", time);
  }

  return (
    <div className="grid grid-cols-5 gap-2">
      {timeSchedule.map((time) => {
        return (
          <div key={time}>
            <button
              className={`
                border border-blue-600 p-1 rounded-md hover:bg-blue-600 hover:text-white active:opacity-50 
                ${activeTime === time ? "bg-blue-500 text-white" : "bg-gray-200"}
              `}
              type="button"
              onClick={() => handleClick(time)}
            >
              {time}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TimeSchedule;
