import { FieldInputProps } from "formik";
import { ObjectSchema } from "yup";

export type customInputTypes = {
    inputTitle:string;
    inputID?:string;
    inputClass?:string;
    boilerPlate: FieldInputProps<string>;
}

export type initialValuesTypes = {
    username:string;
    password:string;
}

export type onSubmitType = (values: initialValuesTypes) => void;


interface User {
    username:string;
    password:string
}

export type loginSchemaType = ObjectSchema<User>;