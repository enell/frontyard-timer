import { defineConfig, devices } from "@playwright/experimental-ct-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	testDir: "./playwright/visual",
	snapshotPathTemplate:
		"{testDir}/__screenshots__/{testFileDir}/{testFileName}/{arg}{ext}",
	use: {
		ctPort: 3102,
		ctSetupFile: "./playwright/index.tsx",
		ctViteConfig: {
			plugins: [tailwindcss()],
		},
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});
