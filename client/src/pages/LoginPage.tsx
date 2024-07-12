import { CustomInput } from "../components"
import loginProcess from "../process/logic.process";
import loginSchema from "../schema/loginShema";
import { initialValuesTypes } from "../types";
import useCustomFormik from "../utils/formikHooks";
import { FaFacebook,FaGoogle } from "react-icons/fa";



const LoginPage = () => {

  const initialValues = {
    username:"",
    password:""
  }

  async function onSubmit(values: initialValuesTypes) {
    try {
      const findUser = await loginProcess(values);
      if (!findUser) {
        console.log(findUser);
      } else {
        console.log("No user found");
      }
    } catch (error) {
      console.log("Onsubmit login error:", error);
    }
  }

  const {getFieldProps,touched,errors,handleSubmit} = useCustomFormik(initialValues, loginSchema, onSubmit);

  return (
    <>
    <div className="h-screen flex justify-center items-center">
      <div
      className="bg-gradient-to-r from-green-500 to-blue-500 w-full h-full p-[50px_100px_50px_100px] flex"
      >
        <div
        className="bg-slate-200	 h-full flex-1 flex flex-col px-5"
        >
          <h1 className="text-blue-500 text-2xl font-medium drop-shadow-md pl-4 pt-4">Blue Forest</h1>
          <h1 className="text-xl font-medium pb-3">Login</h1>

          <form
          className=" mb-10 flex flex-col gap-2" 
          onSubmit={handleSubmit}>
            <CustomInput inputTitle={"username"} boilerPlate={getFieldProps("username")}/>
            {touched.username && errors.username && <div className="text-red-500">{errors.username}</div>}

            <CustomInput inputTitle={"password"} boilerPlate={getFieldProps("password")}/>
            {touched.password && errors.password && <div className="text-red-500">{errors.password}</div>}

            <button 
            type="submit"
            className="bg-green-500 w-full text-[#000000] py-2 rounded-md mt-4 active:opacity-50"
            >Login</button>
          </form>

          <div className="flex flex-col">
            <div className="flex flex-row items-center text-[grey] ">
              <span className="border-b-[1px] w-full h-[1px] border-[grey]"></span>
              <span className="text-nowrap px-2">login using</span>
              <span className="border-b-[1px] w-full h-[1px] border-[grey]"></span>
            </div>

            <div>
              <div 
              className="bg-white border-[1px] border-black w-full text-[#000000] py-2 rounded-md mt-4 active:opacity-50 text-center flex justify-center items-center gap-5">
                <span className="text-blue-700"><FaFacebook/></span>
                login using facebook
              </div>

              <div 
              className="bg-white border-[1px] border-black w-full text-[#000000] py-2 rounded-md mt-4 active:opacity-50 text-center flex justify-center items-center gap-5">
                <span className="text-orange-300"> <FaGoogle/> </span>
                login using email
              </div>

            </div>

          </div>
        </div>

        <div
        className="flex-[2] bg-slate-600"
        >
          
        </div>

      </div>
    </div>
    </>
  )
}

export default LoginPage;
