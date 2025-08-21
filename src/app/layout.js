import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

//fonts
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap'
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap'
});

//meta data
export const metadata = {
  title: "Sylvia's Portfolio Website",
  description: "Portfolio website designed and developed by Sylvia Wu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
