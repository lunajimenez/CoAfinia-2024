import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Home",
	description: "Home Page",
};

interface Props {
	children: React.ReactNode;
}

function RootLayout({ children }: Readonly<Props>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<Navbar />
				{children}
				<Toaster />
			</body>
		</html>
	);
}

export default RootLayout;
