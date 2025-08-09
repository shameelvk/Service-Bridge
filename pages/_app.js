import '../styles/globals.css';
import ThemeProvider from '../components/ThemeProvider';
import { LocationProvider } from '../components/LocationContext';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <LocationProvider>
        <Component {...pageProps} />
      </LocationProvider>
    </ThemeProvider>
  );
}
