import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/vue";

vi.mock('../services/ServiceTable', async () => {
    return {
        serviceTable: {
            records: []
        }
    }
})
describe("DataTableInput", () => {
    it.todo("Fix an css import extension error for VCombobox.css component")

    // it("renders an input", async () => {
    //     render(DataTableInputs, {
    //         global: {
    //             provide: {
    //                 'serviceTable.records': []
    //             }
    //         }
    //     });

    //     const inputs = await screen.findByTestId("data-table-inputs");

    //     expect(inputs.nodeName).toBe("DIV");
    // });
});