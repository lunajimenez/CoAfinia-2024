import { RedirectTo } from "@/components/ui/RedirectTo";
import { Button } from "@/components/ui/button";

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
						<RedirectTo key={item.label} href={item.to}>
							<Button>{item.label}</Button>
						</RedirectTo>
					))}
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
