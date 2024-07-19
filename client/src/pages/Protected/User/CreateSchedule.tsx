import clsx from "clsx";
import { eachDayOfInterval, endOfMonth, format, getDay, isSameDay, isToday, startOfMonth } from "date-fns";
import { useMemo } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Event {
  date: Date;
  title: string;
}

interface EventCalendarProps {
  events: Event[];
}

const CreateSchedule = ({ events }: EventCalendarProps) => {
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  const eventsByDate = useMemo(()=>{
    return events.reduce((acc:{ [key:string]:Event[]},event) =>{
      const dateKey = format(event.date, "yyyy-MM-dd");
      if(!acc[dateKey]){
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    },{});
  },[events])

  return (
    <div className="flex w-full flex-col h-full">
      <div className="mb-4">
        <h2 className="text-center">{format(currentDate, "yyyy MMMM d")}</h2>
      </div>
      <div className="h-full flex flex-col gap-2">
        <div className="grid grid-cols-7 gap-2">
          {WEEKDAYS.map(day => (
            <div className="text-center border rounded-md" key={day}>{day}</div>
          ))}
        </div>
        <div className="h-full grid grid-cols-7 gap-2">
          {Array.from({ length: startingDayIndex }).map((_, index) => (
            <div key={`empty-${index}`} className="border rounded-md p-2 text-center"></div>
          ))}
          {daysInMonth.map((day, index) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const todaysEvents = eventsByDate[dateKey] || [];
            return <div key={index} className={clsx("text-end border rounded-md hover:bg-slate-600 p-2", {
              "bg-gray-200": isToday(day),
              "text-gray-900": isToday(day)
            })}>
              {format(day, "d")}
              {todaysEvents.map((event)=>{
                return <div key={event.title}>{event.title}</div>
              })}
            </div>
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateSchedule;
