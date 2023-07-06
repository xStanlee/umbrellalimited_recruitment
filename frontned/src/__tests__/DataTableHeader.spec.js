import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/vue";

import DataTableHeader from "../components/DataTableHeader.vue";

describe("DataTableHeader", () => {
    
    beforeEach(() => {
        render(DataTableHeader, {
            props: {
                headers: ["AT", "BE", "BG", "CE"]
            }
        });
    })
    
    it("renders a table header", () => {
        const header = screen.getByTestId("thead");
        expect(header.nodeName).toBe("THEAD");
    });

    it("first element should be empty cell", () => {
        const header = screen.getByTestId("thead");
        expect(header.children[0].innerHTML).toBe("");
    });

    it("second element should be cell wit 'AT' value", () => {
        const header = screen.getByTestId("thead");
        expect(header.children[1].innerHTML).toBe("AT");
    });

    it("last element should be cell wit 'CE' value", () => {
        const header = screen.getByTestId("thead");
        expect(header.children[1].innerHTML).toBe("AT");
    });
});