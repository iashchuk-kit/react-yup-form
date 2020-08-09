import React, { memo } from "react";

import "./styles.scss";

interface Properties {
    name: string;
    label: string;
    type?: string;
    touched?: boolean;
    error?: string;
    value: string;
    onBlur?: (evt: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (evt: React.FocusEvent<HTMLInputElement>) => void;
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputTextField: React.FC<Properties> = memo(
    ({ name, error, type = "text", touched, label, value, onBlur, onFocus, onChange }) => {
        return (
            <div className="form-group">
                <label>{label}</label> ({error ? <span className="error">{error}</span> : "*"})
                <input
                    name={name}
                    className="form-control"
                    type={type}
                    data-touched={touched}
                    value={value}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={onChange}
                />
            </div>
        );
    }
);
