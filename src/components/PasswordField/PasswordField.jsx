import FeatherIcon from 'feather-icons-react';
import React, { useState } from 'react';

export default function PasswordField({
    appendClassesIntoDefaultClass,
    containerClass = '',
    hasError,
    ...props
}) {
    const [isPasswordVisible, _passwordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
        _passwordVisibility(!isPasswordVisible);
    };

    const DEFAULT_CLASS = 'w-full w3-input w3-border rounded-md p-10';
    return (
        <div className={`custom-input-field-container ${containerClass}`}>
            <label>{props?.label}</label>
            <div className='relative'>
                <input
                    {...props}
                    type={isPasswordVisible ? 'text' : 'password'}
                    className={appendClassesIntoDefaultClass
                        ? `${DEFAULT_CLASS} ${appendClassesIntoDefaultClass}`
                        : DEFAULT_CLASS
                    }
                />
                <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer select-none"
                >
                    <FeatherIcon icon={isPasswordVisible ? 'eye' : 'eye-off'} size={20} className={`${hasError ? "text-[#dc320a]" : "text-[#848484]"}`} />
                </span>
            </div>

            {hasError && <p className="text-red-500 text-sm mt-2">{hasError}</p>}
        </div>
    );
}
