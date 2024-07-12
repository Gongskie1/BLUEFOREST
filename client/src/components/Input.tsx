import { customInputTypes } from "../types"

const Input = ({inputTitle,inputClass,inputID,boilerPlate}:customInputTypes) => {
  return (
    <div className="flex flex-col">
        <label htmlFor={inputID}>{inputTitle}</label>
        <input 
        type="text" 
        className={`${inputClass} p-[4px_6px] w-full outline-none rounded-md`}
        placeholder={inputTitle}
        {...boilerPlate}
        />
    </div>
  )
}

export default Input