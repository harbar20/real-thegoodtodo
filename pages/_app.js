import { ThemeProvider } from "theme-ui";
import theme from "../components/theme";

export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
