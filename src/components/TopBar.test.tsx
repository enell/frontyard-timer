import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { TopBar } from "./TopBar";

const fixedDate = new Date("2026-01-01T10:30:45");

describe("TopBar", () => {
	it("renders the app title", () => {
		const { getByText } = render(
			<TopBar now={fixedDate} lapBadge="LAP 3" />,
		);
		expect(getByText("Frontyard Ultra")).toBeInTheDocument();
	});

	it("renders the lap badge", () => {
		const { getByText } = render(
			<TopBar now={fixedDate} lapBadge="LAP 5" />,
		);
		expect(getByText("LAP 5")).toBeInTheDocument();
	});

	it("renders the wall clock time from the provided date", () => {
		const { getByText } = render(
			<TopBar now={fixedDate} lapBadge="LAP 1" />,
		);
		expect(getByText("10:30:45")).toBeInTheDocument();
	});

	it("renders the wall date from the provided date", () => {
		const { getByText } = render(
			<TopBar now={fixedDate} lapBadge="LAP 1" />,
		);
		expect(getByText(/1 jan/i)).toBeInTheDocument();
	});
});
