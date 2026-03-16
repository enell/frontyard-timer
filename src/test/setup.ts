import { GlobalRegistrator } from "@happy-dom/global-registrator";
import "@testing-library/jest-dom";
import { afterEach } from "bun:test";
import { cleanup } from "@testing-library/react";

GlobalRegistrator.register();

afterEach(() => {
  cleanup();
});
