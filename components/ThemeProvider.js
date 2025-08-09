import { ThemeProvider as NextThemeProvider } from 'next-themes';

export default function ThemeProvider({ children }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </NextThemeProvider>
  );
}
