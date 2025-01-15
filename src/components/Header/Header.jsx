// Packages
import { useRouter } from 'next/router';
import { useState } from 'react';

// Utils
import { Dropdown, Footer, HomeSection, Logo } from "@/components";
import { useAuth } from '@/context';
import FeatherIcon from 'feather-icons-react';

export default function Header({ ROUTES }) {
    const BG_IMAGE = '/images/background.svg';
    const router = useRouter();

    const { handleLogout, userInfo } = useAuth();

    const [profileDropdown, _profileDropdown] = useState(false);
    const [languageDropdown, _languageDropdown] = useState(false);
    const [mobileMenuOpen, _mobileMenuOpen] = useState(false);

    /****** Handlers ******/

    const handleChangeRoute = (route) => {
        router.push(route);

        _mobileMenuOpen(false);
    };

    const handleRouteToManageAccount = () => {
        router.push('/manage-account');
        _profileDropdown(false);
        _mobileMenuOpen(false);
    };

    const handleClickUserProfile = () => {
        _profileDropdown(!profileDropdown);
    };

    const handleClickLanguage = () => {
        _languageDropdown(!languageDropdown);
    };

    const handleToggleMobileMenu = () => {
        _mobileMenuOpen(!mobileMenuOpen);
    };

    const PROFILE_DROPDOWN = () => (
        <Dropdown
            _isOpen={_profileDropdown}
            isOpen={profileDropdown}
            className="max-h-[500px] overflow-y-auto bg-white w3-border rounded-[10px] !p-2 right-0 top-12"
            buttonContent={
                <div
                    className='w-10 h-10 rounded-full flex justify-center items-center text-xl text-white cursor-pointer select-none'
                    style={{
                        background: "linear-gradient(to right, #B32346, #A8174E, #991747, #6A0B37, #670A37, #610834, #5E0933)",
                    }}
                    onClick={handleClickUserProfile}
                >
                    {userInfo?.name?.slice(0, 1)}
                </div>
            }
        >
            <ul className="whitespace-nowrap max-w-[90vw] select-none">
                <li className='pb-2 border-b'>
                    <p className='text-sm font-bold'>
                        {userInfo?.name}{" "}
                        <span className='capitalize font-normal'>({userInfo?.role})</span>
                    </p>
                    <p className='text-sm font-bold'>{userInfo?.email}</p>
                </li>
                <li
                    className='text-sm py-2 cursor-pointer hover:opacity-70 transition w-fit'
                    onClick={handleRouteToManageAccount}
                >
                    Manage Account
                </li>
                <li
                    className='text-sm cursor-pointer hover:opacity-70 transition w-fit'
                    onClick={() => {
                        handleLogout();
                        _profileDropdown(false);
                    }}
                >
                    Log out
                </li>
            </ul>
        </Dropdown>
    );

    /****** Render Functions ******/

    const TOP_RIGHT_MENU = () => (
        <ul className="sm:flex flex-row xl:gap-[40px] md:gap-[30px] sm:gap-[20px] hidden select-none items-center">
            <Dropdown
                _isOpen={_languageDropdown}
                isOpen={languageDropdown}
                className="max-h-[500px] overflow-y-auto bg-white w3-border rounded-[10px] !p-2 right-0 top-8"
                buttonContent={
                    <li onClick={handleClickLanguage} title='Language'>
                        <FeatherIcon icon='globe' />
                    </li>
                }
            >
                <ul className="whitespace-nowrap max-w-[90vw] select-none">
                    <li className='text-sm cursor-pointer hover:opacity-70 transition w-fit'>English (Default)</li>
                    <li className='text-sm cursor-pointer hover:opacity-70 transition w-fit'>Arabic</li>
                    <li className='text-sm cursor-pointer hover:opacity-70 transition w-fit'>Hindi</li>
                    <li className='text-sm cursor-pointer hover:opacity-70 transition w-fit'>Urdu</li>
                </ul>
            </Dropdown>

            {ROUTES.map((route, key) => (
                <li
                    key={key}
                    onClick={() => handleChangeRoute(route.url)}
                    className={`cursor-pointer md:text-xl text-[17px] ${router.pathname === route.url
                        ? 'font-bold underline'
                        : 'text-black hover:opacity-55'
                        }`}
                >
                    {route.name}
                </li>
            ))}

            {userInfo?.id && (
                <li>
                    {PROFILE_DROPDOWN()}
                </li>
            )}
        </ul>
    );

    const MOBILE_SIDEBAR = () => (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40"
                onClick={handleToggleMobileMenu}
            />

            <div className="fixed inset-y-0 left-0 w-[250px] bg-white shadow z-50 p-4 flex flex-col">
                <div className="flex justify-end mb-4">
                    <FeatherIcon
                        icon="x"
                        className="cursor-pointer"
                        onClick={handleToggleMobileMenu}
                    />
                </div>

                <div className="mb-4">
                    <ul className="space-y-4">
                        {ROUTES.map((route, key) => (
                            <li
                                key={key}
                                onClick={() => handleChangeRoute(route.url)}
                                className={`cursor-pointer text-base ${router.pathname === route.url
                                    ? 'font-bold underline'
                                    : 'hover:opacity-70'
                                    }`}
                            >
                                {route.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="">
                    <p className="font-bold mb-2">Language</p>
                    <ul className="space-y-2">
                        <li className="cursor-pointer hover:opacity-70 transition w-fit">English (Default)</li>
                        <li className="cursor-pointer hover:opacity-70 transition w-fit">Arabic</li>
                        <li className="cursor-pointer hover:opacity-70 transition w-fit">Hindi</li>
                        <li className="cursor-pointer hover:opacity-70 transition w-fit">Urdu</li>
                    </ul>
                </div>



                {userInfo?.id && (
                    <div className="mt-auto pt-4 border-t">
                        <div onClick={handleClickUserProfile} className="flex items-center gap-2">
                            <div
                                className='w-8 h-8 rounded-full flex justify-center items-center text-white select-none'
                                style={{
                                    background: "linear-gradient(to right, #B32346, #A8174E, #991747, #6A0B37, #670A37, #610834, #5E0933)",
                                }}
                            >
                                {userInfo?.name?.slice(0, 1)}
                            </div>
                            <div>
                                <p className="text-sm font-bold">
                                    {userInfo?.name}{" "}
                                    <span className='capitalize font-normal'>({userInfo?.role})</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col mt-3">
                            <button
                                onClick={handleRouteToManageAccount}
                                className="text-sm text-left mb-2 hover:opacity-70 transition"
                            >
                                Manage Account
                            </button>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    _profileDropdown(false);
                                }}
                                className="text-sm text-left hover:opacity-70 transition"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );

    const TOP_LEFT_MENU = () => (
        <div
            className=""
            onClick={() => router.push('/')}
        >
            <Logo className="bg-white p-2 rounded-full sm:size-14 size-12 flex justify-center items-center shadow-sm cursor-pointer" />
        </div>
    );

    const HERO_SECTION = () => (
        <div className="mt-[160px] flex flex-col items-end p-[43px]">
            <div className="sm:max-w-2xl space-y-5">
                <div className="text-5xl font-bold space-y-2">
                    <p>Save Life Donate</p>
                    <p>Blood</p>
                </div>
                <div>
                    Every second, someone is in need of blood. By donating, you are giving the most precious gift
                    of all—the gift of life. Your contribution can save lives, help patients recover faster, and
                    make a real difference in your community.
                </div>
                {userInfo?.role === "donor" ? (
                    <button
                        className="primary-blue-button w3-black w3-ripple"
                        onClick={() => router.push('/find-seeker')}
                    >
                        Donate Blood Now
                    </button>
                ) : (
                    <button
                        className="primary-blue-button w3-black w3-ripple"
                        onClick={() => router.push('/find-blood')}
                    >
                        Get Blood Now
                    </button>
                )}
            </div>
        </div>
    );

    const HOME_PAGE_CONTENT = () => (
        <div>
            <HomeSection />
            <Footer />
        </div>
    );

    return (
        <div
            className={`relative w-full ${router.pathname === '/' ? 'h-[970px] bg-object bg-no-repeat' : 'h-auto'
                }`}
            style={router.pathname === '/' ? { backgroundImage: `url(${BG_IMAGE})` } : {}}
        >
            <div className="flex justify-between items-center px-6 py-4">
                {TOP_LEFT_MENU()}
                {TOP_RIGHT_MENU()}
                <div className="sm:hidden flex items-center">
                    <FeatherIcon
                        icon="menu"
                        className="cursor-pointer select-none"
                        onClick={handleToggleMobileMenu}
                        strokeWidth={2.4}
                        size={28}
                    />
                </div>
            </div>

            <div className="sm:hidden">
                {mobileMenuOpen && MOBILE_SIDEBAR()}
            </div>

            {router.pathname === '/' && (
                <>
                    {HERO_SECTION()}
                    {HOME_PAGE_CONTENT()}
                </>
            )}
        </div>
    );
}
