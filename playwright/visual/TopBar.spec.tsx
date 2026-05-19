import { expect, test } from "@playwright/experimental-ct-react";
import { TopBar } from "../../src/components/TopBar";

const fixedDate = new Date("2026-01-01T10:30:45");

test.use({ viewport: { width: 1280, height: 72 } });

test("TopBar — lap badge and fixed clock", async ({ mount }) => {
	const component = await mount(
		<div className="h-[72px]">
			<TopBar now={fixedDate} lapBadge="LAP 3" />
		</div>,
	);
	await expect(component).toHaveScreenshot("topbar-lap3.png");
});
