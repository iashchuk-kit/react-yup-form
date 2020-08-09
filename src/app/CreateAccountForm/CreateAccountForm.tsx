import React, { useCallback, useState } from "react";
import * as yup from "yup";

import { InputTextField } from "../components/InputTextField/InputTextField";
import { TextAreaField } from "../components/TextAreaField/TextAreaField";
import { delay, validateFieldBySchema, validateFieldsBySchema } from "../helpers";

import "./styles.scss";

type FocusEvent = React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

interface FormFields {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    info: string;
}

interface FormErrors {
    [key: string]: string;
}

interface FormTouched {
    [key: string]: boolean;
}

const initialInputs: FormFields = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    info: "",
};

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(50),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords don't match")
        .required()
        .min(6),
    info: yup.string().required().min(3).max(500),
});

export const CreateAccountForm = () => {
    const [inputs, setInputs] = useState<FormFields>(initialInputs);
    const [touched, setTouched] = useState<FormTouched>({});
    const [errors, setErrors] = useState<FormErrors>({});
    const [disabledSubmit, setDisabledSubmit] = useState(false);

    const validateField = useCallback(
        async (name: string, value: string) => {
            let inputErrors = await validateFieldBySchema(schema, inputs, { name, value });

            if (name === "password" && inputs.confirmPassword) {
                let extraErrors = await validateFieldBySchema(schema, inputs, {
                    name: "confirmPassword",
                    value,
                });
                inputErrors = { ...inputErrors, ...extraErrors };
            }
            setErrors((errors) => ({ ...errors, ...inputErrors }));
        },
        [inputs]
    );

    const handleBlur = useCallback(
        async (evt: FocusEvent) => {
            const { name, value, dataset } = evt.target;
            if (dataset.touched) {
                return;
            }
            await validateField(name, value);
            setTouched((touched) => ({ ...touched, [name]: true }));
        },
        [validateField]
    );

    const handleChange = useCallback(
        async (evt: ChangeEvent) => {
            const { name, value, dataset } = evt.target;
            setInputs((inputs) => ({ ...inputs, [name]: value }));

            if (dataset.touched) {
                await validateField(name, value);
            }
        },
        [validateField]
    );

    const onSubmit = (afterSubmit: (inputs: FormFields) => void) => {
        return async (evt: React.FormEvent) => {
            evt.preventDefault();
            setDisabledSubmit(true);

            const inputErrors = await validateFieldsBySchema(schema, inputs);
            setErrors(inputErrors);

            if (Object.keys(inputErrors).length) {
                setDisabledSubmit(false);
                return;
            }

            await afterSubmit(inputs);
            setInputs(initialInputs);
            setDisabledSubmit(false);
        };
    };

    const handleSubmit = async (inputs: FormFields) => {
        await delay(3500);
        alert(JSON.stringify(inputs));
    };

    return (
        <div className="p-3">
            <h1 className="h3 mb-3">Create account</h1>
            <form
                autoComplete="off"
                style={{ maxWidth: "800px" }}
                onSubmit={onSubmit(handleSubmit)}
            >
                <InputTextField
                    label={"Name"}
                    name={"name"}
                    touched={touched.name}
                    error={errors.name}
                    value={inputs.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <InputTextField
                    label={"Email"}
                    name={"email"}
                    touched={touched.email}
                    error={errors.email}
                    value={inputs.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <InputTextField
                    label={"Password"}
                    type={"password"}
                    name={"password"}
                    touched={touched.password}
                    error={errors.password}
                    value={inputs.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <InputTextField
                    label={"Confirm Password"}
                    type={"password"}
                    name={"confirmPassword"}
                    touched={touched.confirmPassword}
                    error={errors.confirmPassword}
                    value={inputs.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <TextAreaField
                    label={"Info"}
                    name={"info"}
                    error={errors.info}
                    value={inputs.info}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <div>
                    <button className="btn btn-primary" disabled={disabledSubmit}>
                        Create{" "}
                        {disabledSubmit && <i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i>}
                    </button>
                </div>
            </form>
        </div>
    );
};
