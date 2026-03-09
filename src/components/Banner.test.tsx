import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Banner } from "./Banner";

describe("Banner", () => {
	it("renders message text", () => {
		render(<Banner message="VARV 3 STARTAR" visible={true} />);
		expect(screen.getByText("VARV 3 STARTAR")).toBeInTheDocument();
	});

	it("is visible when visible=true", () => {
		const { container } = render(<Banner message="GO!" visible={true} />);
		const el = container.firstChild as HTMLElement;
		expect(el.className).toContain("translate-y-0");
		expect(el.className).not.toContain("-translate-y-full");
	});

	it("is hidden when visible=false", () => {
		const { container } = render(<Banner message="GO!" visible={false} />);
		const el = container.firstChild as HTMLElement;
		expect(el.className).toContain("-translate-y-full");
	});
});
