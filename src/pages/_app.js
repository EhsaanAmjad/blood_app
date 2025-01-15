// Packages
import Head from 'next/head';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

// Utils
import { AppLayout } from '@/components';
import { APP_NAME } from '@/utils/index';
import { AuthProvider } from '@/context';
import '../styles/tw.css';
import '../styles/w3.css';
import '../styles/default.css'
import '../styles/toastify.min.css';

const App = ({ Component, pageProps }) => {

  const Router = useRouter();

  return (
    <Fragment>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{APP_NAME}</title>
      </Head>
      <AuthProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </AuthProvider>
    </Fragment>
  )
};

export default App;