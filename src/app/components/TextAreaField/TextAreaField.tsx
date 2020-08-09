import React from "react";

import "./styles.scss";

interface Properties {
    name: string;
    label: string;
    error?: string;
    value: string;
    onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaField: React.FC<Properties> = ({ name, error, label, value, onChange }) => {
    return (
        <div className="form-group">
            <label>{label}</label> ({error ? <span className="error">{error}</span> : "*"})
            <textarea
                name={name}
                rows={5}
                className="form-control"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
