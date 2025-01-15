// Packages
import React, { useState } from 'react';
import { useRouter } from 'next/router';

// Utils
import RegisterDonor from './tabs/RegisterDonor';
import RegisterSeeker from './tabs/RegisterSeeker';


export default function Register() {

    const tabs = [
        { name: 'Register as Donor', value: 'register_donor' },
        { name: 'Register as Seeker', value: 'register_seeker' },
    ]

    const Router = useRouter();

    const [activeTab, _activeTab] = useState('register_donor');

    /****** Handlers ******/

    const handleTabChange = (tabValue) => {
        _activeTab(tabValue);
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

    return (
        <div className='screen-content'>
            {TABS()}
            {activeTab === 'register_donor' && <RegisterDonor />}
            {activeTab === 'register_seeker' && <RegisterSeeker />}
        </div>
    )
}