import {object, string} from "yup";
import { loginSchemaType } from "../types";



const loginSchema = object({
    username: string().defined().required("Please put your username"),
    password: string().defined().required("Please put your password")
}).defined() as loginSchemaType


export default loginSchema