import React, { memo } from "react";

import "./styles.scss";

interface Properties {
    name: string;
    label: string;
    error?: string;
    touched?: boolean;
    value: string;
    onBlur?: (evt: React.FocusEvent<HTMLTextAreaElement>) => void;
    onFocus?: (evt: React.FocusEvent<HTMLTextAreaElement>) => void;
    onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaField: React.FC<Properties> = memo(
    ({ name, error, touched, label, value, onBlur, onFocus, onChange }) => {
        return (
            <div className="form-group">
                <label>{label}</label> ({error ? <span className="error">{error}</span> : "*"})
                <textarea
                    name={name}
                    data-touched={touched}
                    rows={5}
                    className="form-control"
                    value={value}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={onChange}
                />
            </div>
        );
    }
);
