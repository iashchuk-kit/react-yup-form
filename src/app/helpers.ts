import { ObjectSchema, ValidationError } from "yup";

interface Errors {
    [key: string]: string;
}

export const validateFieldBySchema = <T>(
    schema: ObjectSchema,
    fields: T,
    { name, value }: { name: string; value: string }
) => {
    return schema
        .validateAt(name, { ...fields, [name]: value }, { abortEarly: false })
        .then(() => ({ [name]: "" }))
        .catch(convertYupErrors);
};

export const validateFieldsBySchema = <T>(schema: ObjectSchema, fields: T) => {
    return schema
        .validate(fields, { abortEarly: false })
        .then(() => ({}))
        .catch(convertYupErrors);
};

export const convertYupErrors = (yupErrors: ValidationError) => {
    const errors: Errors = {};
    return yupErrors.inner.reduce((acc, item) => {
        const name = item.path;
        return acc[name] ? acc : { ...acc, [name]: item.message };
    }, errors);
};

export const delay = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
