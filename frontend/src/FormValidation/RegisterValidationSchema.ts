import { string, object, ref} from 'yup';

export const RegisterValidationSchema = object().shape({
    firstname: string().required("Firstname required"),
    lastname: string().required("Lastname required"),
    email: string()
        .required("Email is required")
        .email("Email is invalid"),
    password: string()
        .required("password is required")
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                "password must contains UpperCases, LowerCases, numbers, and specials characters"),
    confirmPassword: string()
        .required("Confirm password is required")
        .oneOf([ref("password"), null], "Passwords does not match")       
})