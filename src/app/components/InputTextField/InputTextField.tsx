import React from "react";

import "./styles.scss";

interface Properties {
    name: string;
    label: string;
    type?: string;
    error?: string;
    value: string;
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputTextField: React.FC<Properties> = ({
    name,
    error,
    type = "text",
    label,
    value,
    onChange,
}) => {
    return (
        <div className="form-group">
            <label>{label}</label> ({error ? <span className="error">{error}</span> : "*"})
            <input
                name={name}
                className="form-control"
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
