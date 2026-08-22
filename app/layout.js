import './globals.css';
import { ContactModalProvider } from '../components/ContactModal';

export const metadata = {
    title: 'Studio Xenos',
    description: 'Creative studio portfolio experience built with Next.js App Router.',
    icons: {
        icon: '/assets/X Logo.png',
    },
};

// Warm up Google Fonts connections before JS even runs.
// This alone saves 200–400ms on first font load.
export function generateViewport() {
    return {
        width: 'device-width',
        initialScale: 1,
    };
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Warm up Google Fonts DNS+TLS before JS runs — saves 200–400ms on font load */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>
                <ContactModalProvider>
                    {children}
                </ContactModalProvider>
            </body>
        </html>
    );
}