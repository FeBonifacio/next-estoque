import { SidebarProvider } from "@/contexts/SidebarContext";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <SidebarProvider>
                <Component {...pageProps} />
            </SidebarProvider>
        </ChakraProvider>
    )
}

export default MyApp;