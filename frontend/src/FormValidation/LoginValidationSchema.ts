import { string, object } from 'yup';

export const LoginValidationSchema = object().shape({
    email: string()
        .required("Email is required")
        .email("Email is invalid"),
    password: string()
        .required("password is required")
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "password must contains UpperCases, LowerCases, numbers, and specials characters")
})