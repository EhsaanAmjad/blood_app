
// Packages
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

// Utils
import { Footer, Header } from "../index"
import { useAuth } from '@/context';

export default function AppLayout({ children }) {

    const Router = useRouter();

    const UNAUTHENTICATED_ROUTES = ['/login', '/register'];

    const { isLoggedIn, userInfo } = useAuth();




    const redirectIfAuthenticated = () => {
        if (typeof window !== 'undefined') {
            if (isLoggedIn && UNAUTHENTICATED_ROUTES.includes(Router.pathname)) {
                Router.replace('/');
            }
        }
    };

    useEffect(() => {
        redirectIfAuthenticated();

        console.log("isLoggedIn", isLoggedIn)
    }, [isLoggedIn, Router.pathname]);

    const ROUTES = useMemo(() => {
        const routes = [
            { name: 'Home', url: '/' },
        ];

        if (isLoggedIn) {
            if (userInfo?.role === 'donor') {
                routes.push({ name: 'Find Seeker', url: '/find-seeker' });
            } else {
                routes.push({ name: 'Find Blood', url: '/find-blood' });
            }
        } else {
            routes.push(
                { name: 'Find Blood', url: '/find-blood' },
                { name: 'Find Seeker', url: '/find-seeker' },
                { name: 'Register Now', url: '/register' },
                { name: 'Login', url: '/login' }
            );
        }

        return routes;
    }, [isLoggedIn, userInfo]);


    /****** Handlers ******/

    /****** Render Functions ******/

    const PAGE_CONTENT = () => (
        <div className={`app-content-area`}>
            {children}
        </div>
    );


    return (
        <Fragment>
            <Header ROUTES={ROUTES} />
            <main>
                {PAGE_CONTENT()}
            </main>

            {Router.pathname !== "/" && <Footer />}

        </Fragment>
    )
}