import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/app/globals.css';
import NavigationMenuMainPage from "@/customcomponents/menu/NavigationMenuMainPage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "админпанель",
  description: "управление складом",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <NavigationMenuMainPage />
        {children}
        </body>
    </html>
  );
}
