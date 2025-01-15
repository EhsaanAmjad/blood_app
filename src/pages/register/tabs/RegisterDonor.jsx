// Packages
import React, { useState, useEffect } from "react";
import { InputField, PasswordField, TextAreaField } from "@/components";
import Select from 'react-select';

// APIs
import { DonorCreateRequest } from "@/requests";

// Utils
import { fetchUserCoordinates, showToast, validateSubmissionData } from "@/utils";
import { useAuth } from "@/context";

const RegisterDonor = () => {
    const INITIAL_FORM = {
        data: {
            name: "",
            phone: "",
            email: "",
            address: "",
            age: "",
            blood_group: "",
            city: "",
            last_donation: "",
            latitude: "",
            longitude: "",
            password: ""
        },
        validations: {
            name: { isRequired: true, min: 3, max: 50 },
            phone: { isRequired: true, min: 10, max: 15 },
            email: { isRequired: true, isEmail: true },
            address: { isRequired: true, min: 3, max: 256 },
            age: { isRequired: true, isNumber: true, min: 18, max: 80 },
            blood_group: { isRequired: true },
            city: { isRequired: true },
            last_donation: { isRequired: true },
            latitude: { isRequired: true },
            longitude: { isRequired: true },
            password: { isRequired: true, min: 8 },
        },
        errors: {},
    };

    const CITIES_LIST = [
        { "value": "london", "label": "London" },
        { "value": "manchester", "label": "Manchester" },
        { "value": "birmingham", "label": "Birmingham" },
        { "value": "leeds", "label": "Leeds" },
        { "value": "glasgow", "label": "Glasgow" },
        { "value": "liverpool", "label": "Liverpool" },
        { "value": "newcastle", "label": "Newcastle" },
        { "value": "sheffield", "label": "Sheffield" },
        { "value": "bristol", "label": "Bristol" },
        { "value": "edinburgh", "label": "Edinburgh" },
        { "value": "cardiff", "label": "Cardiff" },
        { "value": "nottingham", "label": "Nottingham" },
        { "value": "coventry", "label": "Coventry" },
        { "value": "sunderland", "label": "Sunderland" },
        { "value": "brighton", "label": "Brighton" },
        { "value": "hull", "label": "Hull" },
        { "value": "leicester", "label": "Leicester" },
        { "value": "portsmouth", "label": "Portsmouth" },
        { "value": "york", "label": "York" },
        { "value": "oxford", "label": "Oxford" },
        { "value": "cambridge", "label": "Cambridge" },
        { "value": "aberdeen", "label": "Aberdeen" },
        { "value": "derby", "label": "Derby" },
        { "value": "plymouth", "label": "Plymouth" },
        { "value": "southampton", "label": "Southampton" },
        { "value": "stoke", "label": "Stoke-on-Trent" },
        { "value": "norwich", "label": "Norwich" },
        { "value": "wolverhampton", "label": "Wolverhampton" },
        { "value": "preston", "label": "Preston" },
        { "value": "swansea", "label": "Swansea" },
        { "value": "exeter", "label": "Exeter" },
        { "value": "lincoln", "label": "Lincoln" },
        { "value": "dundee", "label": "Dundee" },
        { "value": "chester", "label": "Chester" },
        { "value": "wakefield", "label": "Wakefield" },
        { "value": "durham", "label": "Durham" },
        { "value": "bath", "label": "Bath" },
        { "value": "newport", "label": "Newport" },
        { "value": "new_york", "label": "New York" },
        { "value": "los_angeles", "label": "Los Angeles" },
        { "value": "chicago", "label": "Chicago" },
        { "value": "houston", "label": "Houston" },
        { "value": "phoenix", "label": "Phoenix" },
        { "value": "philadelphia", "label": "Philadelphia" },
        { "value": "san_antonio", "label": "San Antonio" },
        { "value": "san_diego", "label": "San Diego" },
        { "value": "dallas", "label": "Dallas" },
        { "value": "austin", "label": "Austin" },
        { "value": "jacksonville", "label": "Jacksonville" },
        { "value": "san_francisco", "label": "San Francisco" },
        { "value": "miami", "label": "Miami" },
        { "value": "atlanta", "label": "Atlanta" },
        { "value": "boston", "label": "Boston" },
        { "value": "seattle", "label": "Seattle" },
        { "value": "denver", "label": "Denver" },
        { "value": "san_jose", "label": "San Jose" },
        { "value": "detroit", "label": "Detroit" },
        { "value": "nashville", "label": "Nashville" },
        { "value": "memphis", "label": "Memphis" },
        { "value": "baltimore", "label": "Baltimore" },
        { "value": "louisville", "label": "Louisville" },
        { "value": "milwaukee", "label": "Milwaukee" },
        { "value": "portland", "label": "Portland" },
        { "value": "las_vegas", "label": "Las Vegas" },
        { "value": "albuquerque", "label": "Albuquerque" },
        { "value": "tucson", "label": "Tucson" },
        { "value": "fresno", "label": "Fresno" },
        { "value": "sacramento", "label": "Sacramento" }
    ];


    const BLOOD_GROUPS_LIST = [
        { "value": "a_positive", "label": "A+" },
        { "value": "a_negative", "label": "A-" },
        { "value": "b_positive", "label": "B+" },
        { "value": "b_negative", "label": "B-" },
        { "value": "ab_positive", "label": "AB+" },
        { "value": "ab_negative", "label": "AB-" },
        { "value": "o_positive", "label": "O+" },
        { "value": "o_negative", "label": "O-" }
    ]

    const [form, _form] = useState({
        ...INITIAL_FORM,
    });

    const [loading, _isLoading] = useState(false)

    const { _isLoggedIn, _userInfo } = useAuth()

    useEffect(() => {
        fetchCoordinates()
    }, [])

    /****** Handlers ******/

    const fetchCoordinates = async () => {
        try {
            const { latitude, longitude } = await fetchUserCoordinates();
            _form((old) => ({
                ...old,
                data: {
                    ...old.data,
                    latitude,
                    longitude,
                },
            }));
        } catch (error) {
            showToast(error.message, { backgroundColor: "tomato" });
        }
    };

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

    const handleRegisterDonor = () => {
        const isValid = handleValidations();
        if (!isValid) return;

        const dataToSubmit = {
            name: form.data.name,
            phone: form.data.phone,
            email: form.data.email,
            address: form.data.address,
            age: form.data.age,
            blood_group: form.data.blood_group,
            city: form.data.city,
            last_donation: form.data.last_donation,
            latitude: form.data.latitude,
            longitude: form.data.longitude,
            password: form.data.password,
            role: "donor"
        };

        _isLoading(true);

        DonorCreateRequest(dataToSubmit)
            .then((res) => res.json())
            .then((data) => {
                _isLoading(false);

                if (data?.id) {
                    const donorInfo = { id: data?.id, role: data?.role, email: data?.email, name: data?.name };
                    localStorage.setItem("userInfo", JSON.stringify(donorInfo));
                    _userInfo(donorInfo)
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

    const handleFormSelectInput = (name, value) => {
        _form(old => ({
            ...old,
            data: {
                ...old?.data,
                [name]: value
            },
            errors: {
                ...old.errors,
                [name]: value ? null : old.errors[name],
            },
        }));
    };

    /****** Render Functions ******/

    const SECTION_ONE = () => (
        <div>
            <div className="grid grid-cols-12 gap-4 mb-4 w3-white rounded-md shadow-sm sm:px-8 sm:py-10 px-4 py-6 sm:max-w-5xl mx-auto">
                <div className="col-span-12 sm:col-span-6">
                    <InputField
                        name="name"
                        label="Name"
                        onChange={handleFormFieldChange}
                        value={form.data.name}
                        containerClass={`${form?.errors?.name ? "error-field" : ""}`}
                        hasError={form.errors.name}
                    />
                </div>
                <div className="sm:col-span-6 col-span-12">
                    <InputField
                        name="phone"
                        label="Phone"
                        type="number"
                        onChange={handleFormFieldChange}
                        value={form.data.phone}
                        containerClass={`${form?.errors?.phone ? "error-field" : ""}`}
                        hasError={form.errors.phone}
                    />
                </div>
                <div className="sm:col-span-6 col-span-12">
                    <InputField
                        name="email"
                        label="Email"
                        onChange={handleFormFieldChange}
                        value={form.data.email}
                        containerClass={`${form?.errors?.email ? "error-field" : ""}`}
                        hasError={form.errors.email}
                    />
                </div>
                <div className="sm:col-span-6 col-span-12">
                    <Select
                        instanceId={'city-select'}
                        options={CITIES_LIST}
                        menuPosition="fixed"
                        classNamePrefix={`${form?.errors?.city ? "error-field" : ""}`}
                        placeholder="Select City"
                        onChange={option => handleFormSelectInput('city', option?.value)}
                        value={CITIES_LIST?.find(option => option?.value === form?.data?.city)}
                        styles={{
                            menuPortal: (provided) => ({
                                ...provided,
                                zIndex: 1050
                            }),
                        }}
                    />
                    {form.errors.city && <p className="text-red-500 text-sm mt-2">{form.errors.city}</p>}
                </div>
                <div className="col-span-12">
                    <TextAreaField
                        name="address"
                        label="Address"
                        onChange={handleFormFieldChange}
                        value={form.data.address}
                        style={{ resize: 'none' }}
                        containerClass={`${form?.errors?.address ? "error-field" : ""}`}
                        hasError={form.errors.address}
                    />
                </div>
                <div className="col-span-12">
                    {form?.data?.latitude && form?.data?.longitude ? (
                        <div className="w-full border-[1px] border-[#ccc] rounded-lg overflow-hidden">
                            <iframe
                                src={`https://www.google.com/maps?q=${form?.data?.latitude},${form?.data?.longitude}&z=15&output=embed`}
                                width="100%"
                                height="250"
                                loading="lazy"
                                className="w-full"
                            ></iframe>
                        </div>
                    ) : (
                        <>
                            <div className={`relative w-full border-[1px] ${(form.errors.latitude && form.errors.longitude) ? "border-[#dc320a]" : "border-[#ccc]"} rounded-lg overflow-hidden p-4 bg-gray-100 flex items-center justify-center flex-col gap-3`}>
                                <p className="text-gray-500 text-center">
                                    No location selected. Click the button to fetch coordinates.
                                </p>
                                <button
                                    onClick={fetchCoordinates}
                                    className="primary-blue-button sm:!px-3 sm:!py-2 !px-2 !py-1 w3-green sm:!text-sm text-[12px] hover:opacity-75 transition w3-ripple"
                                >
                                    Fetch my location
                                </button>
                            </div>

                            {form.errors.blood_group && <p className="text-red-500 text-sm mt-2">Current location is required</p>}
                        </>
                    )}
                </div>

                <div className="sm:col-span-6 col-span-12">
                    <Select
                        instanceId={'blood-group-select'}
                        options={BLOOD_GROUPS_LIST}
                        menuPosition="fixed"
                        classNamePrefix={`${form?.errors?.blood_group ? "error-field" : ""}`}
                        placeholder="Select Blood Group"
                        onChange={option => handleFormSelectInput('blood_group', option?.value)}
                        value={BLOOD_GROUPS_LIST?.find(option => option?.value === form?.data?.blood_group)}
                        styles={{
                            menuPortal: (provided) => ({
                                ...provided,
                                zIndex: 1050
                            }),
                        }}
                    />
                    {form.errors.blood_group && <p className="text-red-500 text-sm mt-2">{form.errors.blood_group}</p>}
                </div>
                <div className="sm:col-span-6 col-span-12">
                    <InputField
                        name="age"
                        label="Age"
                        type="number"
                        onChange={handleFormFieldChange}
                        value={form.data.age}
                        containerClass={`${form?.errors?.age ? "error-field" : ""}`}
                        hasError={form.errors.age}
                    />
                </div>
                <div className="sm:col-span-6 col-span-12">
                    <InputField
                        name="last_donation"
                        label="Last Donation"
                        type="date"
                        max={new Date().toISOString().split('T')[0]}
                        onChange={handleFormFieldChange}
                        value={form.data.last_donation}
                        containerClass={`${form?.errors?.last_donation ? "error-field" : ""}`}
                        hasError={form.errors.last_donation}
                    />
                </div>
                <div className="sm:col-span-6 col-span-12">
                    <PasswordField
                        name="password"
                        label="Password"
                        onChange={handleFormFieldChange}
                        value={form.data.password}
                        containerClass={`${form?.errors?.password ? "error-field" : ""}`}
                        hasError={form.errors.password}
                    />
                </div>
                <div className="flex justify-end pt-3 col-span-12">
                    <button
                        disabled={loading}
                        onClick={handleRegisterDonor}
                        className="primary-blue-button w3-black hover:opacity-75 transition w3-ripple"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );



    return (
        <div className="mt-8">
            {SECTION_ONE()}
        </div>
    );
};

export default RegisterDonor;
