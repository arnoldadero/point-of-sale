import { expect, test, describe } from "bun:test";
import authReducer from "./auth";
import { USER_LOGGED_IN } from "../types";

describe("Auth Reducer", () => {
    test("should return initial state", () => {
        expect(authReducer(undefined, {})).toEqual({});
    });

    test("should handle USER_LOGGED_IN", () => {
        const authInfo = { token: "123", user: "test" };
        const state = authReducer({}, {
            type: USER_LOGGED_IN,
            authInfo
        });
        expect(state).toEqual({ tokens: authInfo });
    });
});
