import { Button } from "@/components/ui/button";
import { useId } from "react";

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
		label: "Saber",
		to: "/saber",
	},
	{
		label: "Saber Pro",
		to: "/saber-pro",
	},
];

// TODO: Do something here :P
/**
 * Bases de datos:
 * 	- Saber
 * 	- Saber normal
 *
 * Descripcion por departamento
 *
 *
 *
 *
 *
 */

export function Navbar() {
	return (
		<header className="w-screen h-14 bg-primary px-10">
			<nav className="w-full h-full inline-flex items-center gap-2">
				<div className="text-secondary font-bold">CoAfinia - 2024</div>
				<div>
					{items.map((item) => (
						<Button key={item.label}>{item.label}</Button>
					))}
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
