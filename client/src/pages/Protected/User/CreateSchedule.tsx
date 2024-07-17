import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Transition } from '@headlessui/react';

type ModalPropsType = {
  modal: boolean;
  closeModal: (val: boolean) => void;
}

const CreateSchedule = ({ modal, closeModal }: ModalPropsType) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [therapyType, setTherapyType] = useState<string>(''); // Tecar or Aquatic
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const toggleModal = () => { closeModal(!modal) };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your submit logic here
    console.log('Date:', startDate);
    console.log('Time:', startTime);
    console.log('Therapy Type:', therapyType);
    console.log('Phone Number:', phoneNumber);
    // Optionally, you can close the modal here
    closeModal(false);
  };

  return (
    <Transition
      show={modal}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="therapyType" className="block text-sm font-medium text-gray-700">Therapy Type</label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Tecar"
                    checked={therapyType === 'Tecar'}
                    onChange={(e) => setTherapyType(e.target.value)}
                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                  <span className="text-sm font-medium text-gray-900">Tecar</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Aquatic"
                    checked={therapyType === 'Aquatic'}
                    onChange={(e) => setTherapyType(e.target.value)}
                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                  <span className="text-sm font-medium text-gray-900">Aquatic</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM d, yyyy"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
              <DatePicker
                selected={startTime}
                onChange={(time) => setStartTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  );
}

export default CreateSchedule;
