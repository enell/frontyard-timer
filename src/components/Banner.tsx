import { clsx } from "clsx";

interface BannerProps {
	message: string;
	visible: boolean;
}

export function Banner({ message, visible }: BannerProps) {
	return (
		<div
			className={clsx(
				"fixed top-0 left-0 right-0 z-50 py-3 text-center font-black text-4xl tracking-widest uppercase",
				"bg-lime-300 text-black transition-transform duration-300",
				visible ? "translate-y-0" : "-translate-y-full",
			)}
		>
			{message}
		</div>
	);
}
