import { handleRedirection } from "@/actions/";

interface Props {
	href: string;
	children: React.ReactNode;
}

export function RedirectTo({ href, children }: Props) {
	return (
		<form action={handleRedirection}>
			<input type="hidden" name="href" defaultValue={href} />
			{children}
		</form>
	);
}

export default RedirectTo;
