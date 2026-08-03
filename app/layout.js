import './globals.css';
import { ContactModalProvider } from '../components/ContactModal';

export const metadata = {
    title: 'Studio Xenos',
    description: 'Creative studio portfolio experience built with Next.js App Router.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ContactModalProvider>
                    {children}
                </ContactModalProvider>
            </body>
        </html>
    );
}