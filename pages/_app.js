import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { theme } from '../styles/theme';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fontsource/koh-santepheap';
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }) {
  return (
  <GoogleOAuthProvider clientId={process.env.clientId}>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  </GoogleOAuthProvider>
  );
}

export default MyApp;
