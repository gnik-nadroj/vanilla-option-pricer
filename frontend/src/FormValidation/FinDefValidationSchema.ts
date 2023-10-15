import { string, object, number, date } from 'yup';

export const FinDefValidationSchema = object().shape({
    strike: number()
        .required("Email is required")
        .positive("strike should be positive"),

    maturity: date()
        .required("maturity is required")
})