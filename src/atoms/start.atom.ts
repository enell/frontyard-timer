import { atom } from "jotai";
import { locationAtom } from "./location.atom";

export const startAtom = atom(
	(get) => get(locationAtom).searchParams?.get("start") ?? undefined,
);

export const setStartAtom = atom(
	null,
	(_get, set, start: string | undefined) => {
		set(locationAtom, (prev) => {
			const searchParams = new URLSearchParams(prev.searchParams);
			if (start && start.trim().length > 0) searchParams.set("start", start);
			else searchParams.delete("start");

			return {
				...prev,
				searchParams,
			};
		});
	},
);
