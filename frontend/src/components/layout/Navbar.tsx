"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
interface NavbarLinks {
	label: string;
	to: string;
}

const items: NavbarLinks[] = [
	{
		label: "Home",
		to: "/",
	},
	{
		label: "Analysis",
		to: "/analysis",
	},
	{
		label: "Saber 11",
		to: "/analysis/saber11",
	},
	{
		label: "Saber Pro",
		to: "/analysis/saber-pro",
	},
	{
		label: "About",
		to: "/about",
	},
];

export function Navbar() {
	return (
		<header className="w-screen h-14 bg-primary px-10">
			<nav className="w-full h-full inline-flex items-center gap-2">
				<div className="text-secondary font-bold">CoAfinia - 2024</div>
				<div className="inline-flex">
					{items.map((item) => (
						<Link key={item.label} href={item.to}>
							<Button>{item.label}</Button>
						</Link>
					))}
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
