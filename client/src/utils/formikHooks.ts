import { useFormik } from "formik";
import { initialValuesTypes, loginSchemaType, onSubmitType } from "../types";

const useCustomFormik = (
    initialValues: initialValuesTypes,
    validationSchema: loginSchemaType,
    onSubmit: onSubmitType,
)=>{
    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:validationSchema,
        onSubmit:onSubmit
    })

    return formik
}

export default useCustomFormik;