import { beforeAll, afterEach, afterAll } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "whatwg-fetch"

// as a response to the request for the list of countries
import response from "./mockResponse.json";

export const restHandlers = [
    rest.get("http://localhost:3001/api/load", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(response));
    })
];

const server = setupServer(...restHandlers);

// Run before all tests start
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Run after all test
afterAll(() => server.close());

// Run after each test 'isolation'
afterEach(() => server.resetHandlers());