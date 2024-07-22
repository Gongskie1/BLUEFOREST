import clsx from "clsx";
import { eachDayOfInterval, endOfMonth, format, getDay, isToday, isPast, startOfMonth } from "date-fns";
import { useMemo, useState } from "react";
import Modal from "./Modal";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Event {
  date: Date;
  title: string;
  time: string;
  status: "Accepted" | "Pending"; 
}

interface EventCalendarProps {
  events: Event[];
}

const MAX_CLIENTS_PER_DAY = 5;

const CreateSchedule = ({ events }: EventCalendarProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  // Convert events to a format that groups them by date
  const eventsByDate = useMemo(() => {
    return events.reduce((acc: { [key: string]: Event[] }, event) => {
      try {
        const dateKey = format(event.date, "yyyy-MM-dd");
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(event);
      } catch (error) {
        console.error("Invalid event date format:", event.date);
      }
      return acc;
    }, {});
  }, [events]);

  const handleDayClick = (day: Date) => {
    const dateKey = format(day, "yyyy-MM-dd");
    if (!isPast(day) && (eventsByDate[dateKey]?.length || 0) < MAX_CLIENTS_PER_DAY) {
      setOpen(true);
      setSelectedDate(day);
    } else {
      alert(`Maximum of ${MAX_CLIENTS_PER_DAY} clients already scheduled for this day.`);
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here, such as clearing authentication tokens or state
    // For simplicity, we'll just reload the page to simulate logout
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex w-full flex-col h-full p-[5px_10px_10px_10px]">
      <div className="mb-2 flex justify-between">
        <h2 className="font-medium text-xl">{format(currentDate, "yyyy MMMM")}</h2>
        <h2 className="flex items-center gap-5">
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600"
          >
            Logout
          </button>
        </h2>
      </div>
      <div className="h-full flex flex-col gap-2">
        <div className="grid grid-cols-7 gap-2">
          {WEEKDAYS.map((day) => (
            <div className="text-center border border-blue-500 rounded-md" key={day}>
              {day}
            </div>
          ))}
        </div>
        <div className="h-full grid grid-cols-7 gap-2">
          {Array.from({ length: startingDayIndex }).map((_, index) => (
            <div key={`empty-${index}`} className="border border-green-400 rounded-md p-2 text-center"></div>
          ))}
          {daysInMonth.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const todaysEvents = eventsByDate[dateKey] || [];
            const isDayPast = isPast(day);

            return (
              <div
                onClick={() => handleDayClick(day)}
                key={format(day, "yyyy-MM-dd")}
                className={clsx(
                  "text-end border border-green-400 rounded-md p-2",
                  {
                    "bg-gray-200": isToday(day),
                    "text-gray-900": isToday(day),
                    "bg-gray-300 cursor-not-allowed": isDayPast,
                    "hover:bg-blue-600 hover:text-white": !isDayPast && (todaysEvents.length < MAX_CLIENTS_PER_DAY)
                  }
                )}
              >
                {format(day, "d")}
                {todaysEvents.map((event) => (
                  <div
                    key={`${format(day, "yyyy-MM-dd")}-${event.title}-${event.time}`}
                    className={clsx(
                      "border p-1 mt-1",
                      {
                        "bg-green-500 text-white": event.status === "Accepted",
                        "bg-yellow-500 text-white": event.status === "Pending", // Use a different color for pending
                      }
                    )}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <Modal open={open} onClose={setOpen} day={selectedDate} />
    </div>
  );
};

export default CreateSchedule;
