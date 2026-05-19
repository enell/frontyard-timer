import { beforeEach, describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import { ConfigForm } from "./ConfigForm";

function renderWithProvider() {
	return render(
		<Provider>
			<ConfigForm />
		</Provider>,
	);
}

describe("ConfigForm", () => {
	beforeEach(() => {
		window.history.replaceState(null, "", "/");
	});

	it("renders the app title", () => {
		const { getByText } = renderWithProvider();
		expect(getByText("Frontyard Ultra")).toBeInTheDocument();
	});

	it("renders all field labels", () => {
		const { getByText } = renderWithProvider();
		expect(getByText("Startdatum & tid")).toBeInTheDocument();
		expect(getByText("Varv 1 tid (min)")).toBeInTheDocument();
		expect(getByText("Minskning/varv (min)")).toBeInTheDocument();
		expect(getByText("Banlängd (km)")).toBeInTheDocument();
	});

	it("renders the submit button", () => {
		const { getByRole } = renderWithProvider();
		expect(
			getByRole("button", { name: /Spara & starta display/i }),
		).toBeInTheDocument();
	});

	it("has default values for first lap and decrement", () => {
		const { getByDisplayValue } = renderWithProvider();
		expect(getByDisplayValue("30")).toBeInTheDocument();
		expect(getByDisplayValue("1")).toBeInTheDocument();
	});

	it("has default value for distance", () => {
		const { getByDisplayValue } = renderWithProvider();
		expect(getByDisplayValue("3")).toBeInTheDocument();
	});

	it("allows changing the first lap duration", async () => {
		const { getByDisplayValue } = renderWithProvider();
		const input = getByDisplayValue("30") as HTMLInputElement;
		await userEvent.clear(input);
		await userEvent.type(input, "45");
		expect(input.value).toBe("45");
	});

	it("shows hint about bookmark link", () => {
		const { getByText } = renderWithProvider();
		expect(getByText(/Bokmärk länken/i)).toBeInTheDocument();
	});
});
