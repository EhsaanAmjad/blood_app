import React from 'react';

export default function TextAreaField({
    appendClassesIntoDefaultClass,
    containerClass = '',
    hasError,
    ...props
}) {
    const DEFAULT_CLASS = 'w-full w3-input w3-border rounded-md p-10';
    return (
        <div className={`custom-input-field-container ${containerClass}`}>
            <label>{props?.label}</label>
            <textarea
                {...props}
                className={appendClassesIntoDefaultClass
                    ? `${DEFAULT_CLASS} ${appendClassesIntoDefaultClass}`
                    : DEFAULT_CLASS
                }
            />
            {hasError && <p className="text-red-500 text-sm mt-2">{hasError}</p>}
        </div>
    )
}
