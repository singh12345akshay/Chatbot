import { Provider } from 'react-redux';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import store from 'src/store/store';
import { SnackbarProvider } from 'notistack';
import AuthProvider from 'src/components/authProvider/authProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (

    <SnackbarProvider>
        <AuthProvider>
      <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
      </AuthProvider>
    </SnackbarProvider>
    
  );
}


