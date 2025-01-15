// Packages
import { useRouter } from 'next/router';

// Utils
import { Logo } from "@/components";
import { APP_NAME } from '@/utils';

export default function Footer() {
    const router = useRouter();

    /******* Handlers *******/

    const handleNavigation = (route) => {
        router.push(route);
    };

    /****** Render Functions ******/

    const LOGO_SECTION = () => (
        <Logo className="bg-white p-2 rounded-full sm:size-14 size-12 flex justify-center items-center shadow-sm cursor-pointer" />
    );

    const NAVIGATION_LINKS = () => (
        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
            <li>
                <button
                    onClick={() => handleNavigation('/about')}
                    className="hover:underline me-4 md:me-6 w3-ripple"
                >
                    About
                </button>
            </li>
            <li>
                <button
                    onClick={() => handleNavigation('/privacy-policy')}
                    className="hover:underline me-4 md:me-6 w3-ripple"
                >
                    Privacy Policy
                </button>
            </li>
            <li>
                <button
                    onClick={() => handleNavigation('/licensing')}
                    className="hover:underline me-4 md:me-6 w3-ripple"
                >
                    Licensing
                </button>
            </li>
            <li>
                <button
                    onClick={() => handleNavigation('/contact')}
                    className="hover:underline w3-ripple"
                >
                    Contact
                </button>
            </li>
        </ul>
    );

    const COPYRIGHT_SECTION = () => (
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025{' '}
            <a href="https://flowbite.com/" className="hover:underline">
                {APP_NAME}
            </a>
            . All Rights Reserved.
        </span>
    );

    return (
        <footer className="shadow bg-black mt-[120px]">
            <div className="w-full sm:max-w-7xl mx-auto px-6 py-8 md:py-8">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {LOGO_SECTION()}
                    {/* {NAVIGATION_LINKS()} */}
                </div>
                <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
                {COPYRIGHT_SECTION()}
            </div>
        </footer>
    );
}
