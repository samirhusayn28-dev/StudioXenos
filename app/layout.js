import './globals.css';
import { ContactModalProvider } from '../components/ContactModal';
import { Outfit, Fira_Code, Poppins, Syne, Barlow_Condensed } from 'next/font/google';

// Self-hosted variable fonts optimized at build time
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code', display: 'swap' });
const poppins = Poppins({ weight: ['600', '700', '800'], subsets: ['latin'], variable: '--font-poppins', display: 'swap' });
const syne = Syne({ weight: ['700', '800'], subsets: ['latin'], variable: '--font-syne', display: 'swap' });
const barlowCondensed = Barlow_Condensed({ weight: ['700', '800', '900'], subsets: ['latin'], variable: '--font-barlow-condensed', display: 'swap' });

export const metadata = {
    title: 'Studio Xenos',
    description: 'Creative studio portfolio experience built with Next.js App Router.',
    icons: {
        icon: '/assets/X Logo.png',
    },
};

export function generateViewport() {
    return {
        width: 'device-width',
        initialScale: 1,
    };
}

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${outfit.variable} ${firaCode.variable} ${poppins.variable} ${syne.variable} ${barlowCondensed.variable}`}
        >
            <body>
                <ContactModalProvider>
                    {children}
                </ContactModalProvider>
            </body>
        </html>
    );
}