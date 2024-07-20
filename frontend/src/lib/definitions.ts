interface DevLink {
	label: string;
	href: string;
}

export interface Dev {
	name: string;
	description: string;
	image: string;
	initials: string;
	content: string;
	links: DevLink[];
}
