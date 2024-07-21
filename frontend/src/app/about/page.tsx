"use client";

import { Content } from "@/components/ui/Content";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dev } from "@/lib/definitions";
import Link from "next/link";

const devs: Dev[] = [
	{
		name: "Mauro Gonzalez",
		description: "College Student",
		image: "/maurogonzalez.jpg",
		initials: "MG",
		content:
			"Hi! I’m Mauro Gonzalez, a frontend developer. I primarily work with React (Next.js) and TypeScript, along with Tailwind CSS, to create efficient and modern user interfaces. Currently, I’m expanding my skills by learning Nuxt.js (Vue).",
		links: [
			{ href: "https://github.com/MauroGonzalez51", label: "Github" },
		],
	},
	{
		name: "Luna Jimenez",
		description: "College Student",
		image: "https://avatars.githubusercontent.com/u/127508891?v=4",
		initials: "LJ",
		content:
			"Hello everyone! My name is Luna Jimenez, I am currently studying mechatronics and mechanical engineering at the Universidad Tecnológica de Bolívar in Cartagena - Colombia. I like challenges and never stop learning!",
		links: [{ href: "https://github.com/lunajimenez", label: "Github" }],
	},
	{
		name: "Juan Diego",
		description: "College Student",
		image: "",
		initials: "JD",
		content:
			"Hello 👋 , my name is Juan Diego Perez, I am a computer and systems engineering student. I'm passionate about data science, in software development I'm in charge of the backend.",
		links: [{ href: "https://github.com/dosquisd", label: "Github" }],
	},
	{
		name: "Camila García",
		description: "College Student",
		image: "",
		initials: "CG",
		content:
			"Hi! My name is Camila García, I'm currently studying systems and computer engineering degree at the Universidad Tecnológica de Bolívar. I hope that this challenge will allow us to learn new things and that all our team can enjoy it.",
		links: [{ href: "github.com/mcamilags", label: "Github" }],
	},
];

export async function AboutPage() {
	return (
		<Content>
			<div className="flex gap-4 flex-wrap">
				{devs.map((dev) => (
					<Card key={dev.name} className="max-w-96">
						<CardHeader className="flex items-center flex-row">
							<Avatar className="size-12">
								<AvatarImage src={dev.image} />
								<AvatarFallback>{dev.initials}</AvatarFallback>
							</Avatar>
							<div className="ml-4">
								<CardTitle>{dev.name}</CardTitle>
								<CardDescription>
									{dev.description}
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent className="text-sm">
							{dev.content}
						</CardContent>
						<CardFooter>
							{dev.links.map((link) => (
								<Link key={link.label} href={link.href}>
									<Button>{link.label}</Button>
								</Link>
							))}
						</CardFooter>
					</Card>
				))}
			</div>
		</Content>
	);
}

export default AboutPage;
