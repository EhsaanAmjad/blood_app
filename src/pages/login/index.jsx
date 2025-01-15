// Packages
import React, { useState } from "react";
import { InputField, PasswordField } from "@/components";
import { useRouter } from 'next/router';

// Utils
import { showToast, validateSubmissionData } from "@/utils";
import { UserLoginRequest } from "@/requests";
import { useAuth } from "@/context";

export default function Login() {

    const tabs = [
        { name: 'Login as Donor', value: 'login_donor' },
        { name: 'Login as Seeker', value: 'login_seeker' },
    ]

    const INITIAL_FORM = {
        data: {
            email: "",
            password: ""
        },
        validations: {
            email: { isRequired: true, isEmail: true },
            password: { isRequired: true },
        },
        errors: {},
    };

    const Router = useRouter();

    const [activeTab, _activeTab] = useState('login_donor');

    const [form, _form] = useState({
        ...INITIAL_FORM,
    });

    const [loading, _isLoading] = useState(false)

    const { _isLoggedIn, _userInfo } = useAuth()

    /****** Handlers ******/

    const handleTabChange = (tabValue) => {
        _activeTab(tabValue);
    };

    const handleRouteToRegister = () => {
        Router.push("/register")
    }


    const handleValidations = () => {
        const { allValid, errors } = validateSubmissionData(form?.data, INITIAL_FORM?.validations);
        if (!allValid) {
            _form((old) => ({
                ...old,
                errors,
            }));
            showToast("Please fix the validation errors", { backgroundColor: "tomato" });
        } else {
            _form((old) => ({
                ...old,
                errors: {},
            }));
        }
        return allValid;
    };

    const handleFormFieldChange = (e) => {
        const { name, value } = e.target;
        _form((old) => ({
            ...old,
            data: {
                ...old.data,
                [name]: value,
            },
            errors: {
                ...old.errors,
                [name]: value ? null : old.errors[name],
            },
        }));
    };

    const handleLogin = () => {
        const isValid = handleValidations();
        if (!isValid) return;

        const dataToSubmit = {
            email: form.data.email,
            password: form.data.password,
            role: activeTab === "login_donor" ? "donor" : "seeker"
        };

        _isLoading(true);

        UserLoginRequest(dataToSubmit)
            .then((res) => res.json())
            .then((data) => {
                _isLoading(false);

                if (data?.id) {
                    const userInfo = { id: data?.id, role: data?.role, email: data?.email, name: data?.name }
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
                    _userInfo(userInfo)
                    showToast(data?.message, { backgroundColor: "green" });
                    _isLoggedIn(true)
                    _form({ ...INITIAL_FORM });
                } else {
                    if (data?.errors) {
                        Object.values(data.errors).forEach((error) => {
                            showToast(error, { backgroundColor: "tomato" });
                        });
                    } else if (data?.message) {
                        showToast(data.message, { backgroundColor: "tomato" });
                    }
                }
            })
            .catch((err) => {
                _isLoading(false);
                showToast("An unexpected error occurred. Please try again later.", { backgroundColor: "tomato" });
                console.error("Error during donor registration:", err);
            });
    };

    /****** Render Functions ******/

    const TABS = () => (
        <div>
            <nav className="sm:space-x-3 flex flex-wrap justify-center">
                {tabs?.map((tab) => (
                    <a
                        key={tab?.name}
                        onClick={() => handleTabChange(tab?.value)}
                        style={{
                            background: activeTab === tab?.value
                                ? "linear-gradient(to right, #B32346, #A8174E, #991747, #6A0B37, #670A37, #610834, #5E0933)"
                                : "transparent",
                        }}
                        className={`
                                ${activeTab === tab?.value
                                ? 'text-white'
                                : 'text-gray-500'}
                                    sm:text-[16px] text-[12px] rounded-md sm:px-3 sm:py-2 px-2 py-1 font-medium whitespace-nowrap cursor-pointer select-none transition duration-300
                                    `}
                    >
                        {tab?.name}
                    </a>
                ))}
            </nav>
        </div>
    );

    const LOGIN_FORM_SECTION = () => (
        <div className="mt-8">
            <div className="grid grid-cols-12 gap-4 mb-4 w3-white rounded-md shadow-sm sm:px-8 sm:py-10 px-4 py-6 sm:max-w-xl mx-auto">

                <div className="col-span-12">
                    <InputField
                        name="email"
                        label="Email"
                        onChange={handleFormFieldChange}
                        value={form.data.email}
                        containerClass={`${form?.errors?.email ? "error-field" : ""}`}
                        hasError={form.errors.email}
                    />
                </div>
                <div className="col-span-12">
                    <PasswordField
                        name="password"
                        label="Password"
                        onChange={handleFormFieldChange}
                        value={form.data.password}
                        containerClass={`${form?.errors?.password ? "error-field" : ""}`}
                        hasError={form.errors.password}
                    />
                </div>
                <div className="pt-3 col-span-12">
                    <button
                        onClick={handleLogin}
                        className="primary-blue-button w-full w3-black hover:opacity-75 transition w3-ripple"
                        disabled={loading}
                    >
                        Login
                    </button>
                </div>
                <div className="pt-3 col-span-12 flex justify-end text-sm">
                    Don't have an account? <p className='text-sm text-[#1B77F2] hover:opacity-80 cursor-pointer ml-1' onClick={handleRouteToRegister}> Register Now</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className='screen-content'>
            {TABS()}
            {LOGIN_FORM_SECTION()}
        </div>
    )
}