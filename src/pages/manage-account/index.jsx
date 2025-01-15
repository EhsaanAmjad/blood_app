// Packages
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';

// APIs
import {
    DonorDetailsRequest,
    SeekerDetailsRequest,
    DonorUpdateRequest,
    SeekerUpdateRequest
} from '@/requests';

// Utils
import { useAuth } from '@/context';
import { fetchUserCoordinates, showToast } from '@/utils';
import { InputField, PasswordField, TextAreaField } from '@/components';


export default function ManageAccount() {

    const SEEKER_INITIAL_FORM = {
        data: {
            name: "",
            phone: "",
            email: "",
            address: "",
            blood_group: "",
            city: "",
            required_date: "",
            reason: "",
            latitude: "",
            longitude: "",
            password: "",
            role: ""
        },
        validations: {
            name: { isRequired: true, min: 3, max: 50 },
            phone: { isRequired: true, min: 10, max: 15 },
            email: { isRequired: true, isEmail: true },
            address: { isRequired: true, min: 3, max: 256 },
            blood_group: { isRequired: true },
            city: { isRequired: true },
            required_date: { isRequired: true },
            reason: { isRequired: true, min: 3, max: 256 },
            latitude: { isRequired: true },
            longitude: { isRequired: true },
            password: { isRequired: true, min: 8 },
            role: { isRequired: true },
        },
        errors: {},
    };

    const DONOR_INITIAL_FORM = {
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
            password: "",
            role: ""
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
            role: { isRequired: true },
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

    const ROLES_LIST = [
        { "value": "donor", "label": "Donor" },
        { "value": "seeker", "label": "Seeker" },
    ]

    const Router = useRouter();

    const { userInfo, _userInfo } = useAuth();

    const INITIAL_FORM = userInfo?.role === "donor" ? DONOR_INITIAL_FORM : SEEKER_INITIAL_FORM;

    const [form, _form] = useState(INITIAL_FORM);

    const [loading, _loading] = useState(false);

    useEffect(() => {
        const userId = userInfo?.id;
        if (userId) {
            getUserDetails(userId);
        }
    }, [userInfo]);

    const getUserDetails = async (userId) => {
        try {
            _loading(true);

            const response = userInfo?.role === "donor"
                ? await DonorDetailsRequest(userId)
                : await SeekerDetailsRequest(userId);

            const { data } = await response.json();
            if (!data) {
                throw new Error("Failed to fetch user details");
            }
            const formattedData = {
                ...data,
                last_donation: data?.last_donation
                    ? new Date(data?.last_donation).toISOString().split("T")[0]
                    : "",
                required_date: data?.required_date
                    ? new Date(data?.required_date).toISOString().split("T")[0]
                    : "",
            };
            _form((old) => ({
                ...old,
                data: formattedData,
            }));
        } catch (err) {
            showToast(err.message);
            console.error(err);
        } finally {
            _loading(false);
        }
    };


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

    const handleFormFieldChange = (e) => {
        const { name, value } = e.target;
        _form((old) => ({
            ...old,
            data: {
                ...old.data,
                [name]: value,
            },
        }));
    };

    const handleFormSelectInput = (name, value) => {
        _form((old) => ({
            ...old,
            data: {
                ...old.data,
                [name]: value,
            },
        }));
    };

    const handleUpdate = async () => {
        try {
            _loading(true);

            if (userInfo?.role === "donor" && form.data.role === "seeker") {

                if (!form.data.name) {
                    _form((old) => ({
                        ...old,
                        data: {
                            ...old.data,
                            name: form.data.name || "Unnamed Seeker",
                        },
                    }));
                }
            } else if (userInfo?.role === "seeker" && form.data.role === "donor") {

                if (!form.data.name) {
                    _form((old) => ({
                        ...old,
                        data: {
                            ...old.data,
                            name: form.data.name || "NoFirstName",
                        },
                    }));
                }

                if (!form.data.age) {
                    _form((old) => ({
                        ...old,
                        data: {
                            ...old.data,
                            age: 25,
                        },
                    }));
                }
                if (!form.data.last_donation) {
                    _form((old) => ({
                        ...old,
                        data: {
                            ...old.data,
                            last_donation: new Date().toISOString().split("T")[0],
                        },
                    }));
                }
            }

            let dataToSubmit;
            if (userInfo?.role === "donor" && form.data.role === "seeker") {

                dataToSubmit = {
                    name: form.data.name || "",
                    phone: form.data.phone,
                    email: form.data.email,
                    address: form.data.address,
                    blood_group: form.data.blood_group,
                    city: form.data.city,
                    required_date: form.data.required_date,
                    reason: form.data.reason,
                    latitude: form.data.latitude,
                    longitude: form.data.longitude,
                    password: form.data.password,
                    role: "seeker",
                };
            } else if (userInfo?.role === "seeker" && form.data.role === "donor") {

                dataToSubmit = {
                    name: form.data.name || "",
                    phone: form.data.phone,
                    email: form.data.email,
                    address: form.data.address,
                    age: form.data.age || 25,
                    blood_group: form.data.blood_group,
                    city: form.data.city,
                    last_donation: form.data.last_donation || new Date().toISOString().split("T")[0],
                    latitude: form.data.latitude,
                    longitude: form.data.longitude,
                    password: form.data.password,
                    role: "donor",
                };

            } else {

                if (userInfo?.role === "donor") {
                    dataToSubmit = {
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
                        role: form.data.role,
                    };
                } else {

                    dataToSubmit = {
                        name: form.data.name,
                        phone: form.data.phone,
                        email: form.data.email,
                        address: form.data.address,
                        blood_group: form.data.blood_group,
                        city: form.data.city,
                        required_date: form.data.required_date,
                        reason: form.data.reason,
                        latitude: form.data.latitude,
                        longitude: form.data.longitude,
                        password: form.data.password,
                        role: form.data.role,
                    };
                }
            }

            const response = userInfo?.role === "donor"
                ? await DonorUpdateRequest(form?.data?._id, dataToSubmit)
                : await SeekerUpdateRequest(form?.data?._id, dataToSubmit);

            const { data, message } = await response.json()

            const updatedUserInfo = { id: data?._id, role: data?.role, email: data?.email, name: data?.name }

            localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
            _userInfo(updatedUserInfo)

            if (!data) {
                throw new Error(message || "Failed to update user details");
            }

            const formattedData = {
                ...data,
                last_donation: data?.last_donation
                    ? new Date(data.last_donation).toISOString().split("T")[0]
                    : "",
                required_date: data?.required_date
                    ? new Date(data.required_date).toISOString().split("T")[0]
                    : "",
            };

            _form((old) => ({
                ...old,
                data: formattedData,
            }));

            if (message) {
                showToast(message, { backgroundColor: "green" });
            } else {
                showToast("Your account has been updated successfully!", {
                    backgroundColor: "green"
                });
            }

        } catch (err) {
            showToast(err.message);
            console.error(err);
        } finally {
            _loading(false);
        }
    };

    /****** Render Functions ******/

    const SEEKER_FORM = () => (
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
                    <InputField
                        name="required_date"
                        label="Required Date"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        onChange={handleFormFieldChange}
                        value={form.data.required_date}
                        containerClass={`${form?.errors?.required_date ? "error-field" : ""}`}
                        hasError={form.errors.required_date}
                    />
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
                        <div className="relative w-full border-[1px] border-[#ccc] rounded-lg overflow-hidden">
                            <iframe
                                src={`https://www.google.com/maps?q=${form?.data?.latitude},${form?.data?.longitude}&z=15&output=embed`}
                                width="100%"
                                height="250"
                                loading="lazy"
                                className="w-full"
                            ></iframe>
                            <button
                                onClick={fetchCoordinates}
                                className="absolute top-5 right-5 primary-blue-button sm:!px-3 sm:!py-2 !px-2 !py-1 w3-green sm:!text-sm text-[12px] hover:opacity-75 transition w3-ripple"
                            >
                                Fetch my location
                            </button>
                        </div>
                    ) : (
                        <>
                            <div
                                className={`relative w-full border-[1px] ${form.errors.latitude && form.errors.longitude
                                    ? "border-[#dc320a]"
                                    : "border-[#ccc]"
                                    } rounded-lg overflow-hidden p-4 bg-gray-100 flex items-center justify-center flex-col gap-3`}
                            >
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

                            {form.errors.blood_group && (
                                <p className="text-red-500 text-sm mt-2">
                                    Current location is required
                                </p>
                            )}
                        </>
                    )}
                </div>
                <div className="sm:col-span-6 col-span-12">
                    <Select
                        instanceId={"city-select"}
                        options={CITIES_LIST}
                        menuPosition="fixed"
                        classNamePrefix={`${form?.errors?.city ? "error-field" : ""}`}
                        placeholder="Select City"
                        onChange={(option) => handleFormSelectInput("city", option?.value)}
                        value={CITIES_LIST?.find((option) => option?.value === form?.data?.city)}
                        styles={{
                            menuPortal: (provided) => ({
                                ...provided,
                                zIndex: 1050
                            }),
                        }}
                    />
                    {form.errors.city && (
                        <p className="text-red-500 text-sm mt-2">{form.errors.city}</p>
                    )}
                </div>
                <div className="sm:col-span-6 col-span-12">
                    <Select
                        instanceId={"blood-group-select"}
                        options={BLOOD_GROUPS_LIST}
                        menuPosition="fixed"
                        classNamePrefix={`${form?.errors?.blood_group ? "error-field" : ""}`}
                        placeholder="Select Blood Group"
                        onChange={(option) => handleFormSelectInput("blood_group", option?.value)}
                        value={BLOOD_GROUPS_LIST?.find(
                            (option) => option?.value === form?.data?.blood_group
                        )}
                        styles={{
                            menuPortal: (provided) => ({
                                ...provided,
                                zIndex: 1050
                            }),
                        }}
                    />
                    {form.errors.blood_group && (
                        <p className="text-red-500 text-sm mt-2">
                            {form.errors.blood_group}
                        </p>
                    )}
                </div>
                <div className="col-span-12">
                    <TextAreaField
                        name="reason"
                        label="Reason for Blood Request"
                        onChange={handleFormFieldChange}
                        value={form.data.reason}
                        style={{ resize: 'none' }}
                        containerClass={`${form?.errors?.reason ? "error-field" : ""}`}
                        hasError={form.errors.reason}
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
                <div className="sm:col-span-6 col-span-12">
                    <Select
                        instanceId={"role-select"}
                        options={ROLES_LIST}
                        menuPosition="fixed"
                        classNamePrefix={`${form?.errors?.role ? "error-field" : ""}`}
                        placeholder="Select Role"
                        onChange={(option) => handleFormSelectInput("role", option?.value)}
                        value={ROLES_LIST?.find((option) => option?.value === form?.data?.role)}
                        styles={{
                            menuPortal: (provided) => ({
                                ...provided,
                                zIndex: 1050,
                            }),
                        }}
                    />
                    {form.errors.role && (
                        <p className="text-red-500 text-sm mt-2">{form.errors.role}</p>
                    )}
                </div>
                <div className="flex justify-end pt-3 col-span-12">
                    <button
                        onClick={handleUpdate}
                        className="primary-blue-button w3-black hover:opacity-75 transition w3-ripple"
                        disabled={loading}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );

    const DONOR_FORM = () => (
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
                    <Select
                        instanceId={"role-select"}
                        options={ROLES_LIST}
                        menuPosition="fixed"
                        classNamePrefix={`${form?.errors?.role ? "error-field" : ""}`}
                        placeholder="Select Role"
                        onChange={(option) => handleFormSelectInput("role", option?.value)}
                        value={ROLES_LIST?.find((option) => option?.value === form?.data?.role)}
                        styles={{
                            menuPortal: (provided) => ({
                                ...provided,
                                zIndex: 1050,
                            }),
                        }}
                    />
                    {form.errors.role && (
                        <p className="text-red-500 text-sm mt-2">{form.errors.role}</p>
                    )}
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
                        <div className="relative w-full border-[1px] border-[#ccc] rounded-lg overflow-hidden">
                            <iframe
                                src={`https://www.google.com/maps?q=${form?.data?.latitude},${form?.data?.longitude}&z=15&output=embed`}
                                width="100%"
                                height="250"
                                loading="lazy"
                                className="w-full"
                            ></iframe>
                            <button
                                onClick={fetchCoordinates}
                                className="absolute top-5 right-5 primary-blue-button sm:!px-3 sm:!py-2 !px-2 !py-1 w3-green sm:!text-sm text-[12px] hover:opacity-75 transition w3-ripple"
                            >
                                Fetch my location
                            </button>
                        </div>
                    ) : (
                        <>
                            <div
                                className={`relative w-full border-[1px] ${form.errors.latitude && form.errors.longitude
                                    ? "border-[#dc320a]"
                                    : "border-[#ccc]"
                                    } rounded-lg overflow-hidden p-4 bg-gray-100 flex items-center justify-center flex-col gap-3`}
                            >
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

                            {form.errors.blood_group && (
                                <p className="text-red-500 text-sm mt-2">
                                    Current location is required
                                </p>
                            )}
                        </>
                    )}
                </div>
                <div className="sm:col-span-6 col-span-12">
                    <Select
                        instanceId={"city-select"}
                        options={CITIES_LIST}
                        menuPosition="fixed"
                        classNamePrefix={`${form?.errors?.city ? "error-field" : ""}`}
                        placeholder="Select City"
                        onChange={(option) => handleFormSelectInput("city", option?.value)}
                        value={CITIES_LIST?.find((option) => option?.value === form?.data?.city)}
                        styles={{
                            menuPortal: (provided) => ({
                                ...provided,
                                zIndex: 1050
                            }),
                        }}
                    />
                    {form.errors.city && (
                        <p className="text-red-500 text-sm mt-2">{form.errors.city}</p>
                    )}
                </div>
                <div className="sm:col-span-6 col-span-12">
                    <Select
                        instanceId={"blood-group-select"}
                        options={BLOOD_GROUPS_LIST}
                        menuPosition="fixed"
                        classNamePrefix={`${form?.errors?.blood_group ? "error-field" : ""}`}
                        placeholder="Select Blood Group"
                        onChange={(option) => handleFormSelectInput("blood_group", option?.value)}
                        value={BLOOD_GROUPS_LIST?.find(
                            (option) => option?.value === form?.data?.blood_group
                        )}
                        styles={{
                            menuPortal: (provided) => ({
                                ...provided,
                                zIndex: 1050
                            }),
                        }}
                    />
                    {form.errors.blood_group && (
                        <p className="text-red-500 text-sm mt-2">{form.errors.blood_group}</p>
                    )}
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
                <div className="flex justify-end pt-3 col-span-12">
                    <button
                        disabled={loading}
                        onClick={handleUpdate}
                        className="primary-blue-button w3-black hover:opacity-75 transition w3-ripple"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className='screen-content'>
            {userInfo?.role === "donor" ? DONOR_FORM() : SEEKER_FORM()}
        </div>
    )
}
