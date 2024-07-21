import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function Content({ className, children, ...props }: Props) {
	return (
		<section
			className={cn(
				"h-[calc(100dvh-3.5rem)] bg-slate-50 dark:bg-gray-800 px-10 py-5",
				className,
			)}
			{...props}
		>
			{children}
		</section>
	);
}

export default Content;
