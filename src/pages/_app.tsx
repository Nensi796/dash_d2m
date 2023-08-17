import { useState, useEffect } from 'react';
import '@assets/styles/globals.css';
import 'react-phone-input-2/lib/style.css';
import { ApolloProvider } from '@apollo/client';
import { AppContextProvider } from '@contexts/appContext';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { useApollo, theme } from '@config';
import { Rubik } from 'next/font/google';
import { getCookie } from 'cookies-next';
import MetaTitle from '@components/MetaTitle';
import Layout from '@components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.css';

// const rubikFonts = Rubik({
//   subsets: ['latin'],
//   style: ['normal', 'italic'],
//   weight: ['300', '400', '500', '600', '700', '800', '900'],
// });

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // useEffect(() => {
  //   const token = !!getCookie('token');
  //   if (token) {
  //     setIsAuthenticated(true);
  //   }
  // }, [isAuthenticated]);

  return (
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <MetaTitle showDefaultTags />
          <main id="next-main" className={styles.main}>
            {isAuthenticated ? (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            ) : (
              <Component {...pageProps} />
            )}
          </main>
        </ThemeProvider>
        <ToastContainer theme="dark" />
      </AppContextProvider>
    </ApolloProvider>
  );
}
