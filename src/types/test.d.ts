import type { expect } from "bun:test";
import type * as matchers from "@testing-library/jest-dom/matchers";

declare module "bun:test" {
	interface Matchers<T = unknown>
		extends matchers.TestingLibraryMatchers<
			ReturnType<typeof expect.stringContaining>,
			T
		> {}
}
