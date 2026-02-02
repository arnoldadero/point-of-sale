import { expect, test, describe } from "bun:test";
import transactionReducer from "./transaction";
import { INIT_TRANSACTION, CANCEL_TRANSACTION } from "../types";

describe("Transaction Reducer", () => {
    test("should return initial state", () => {
        const initialState = { existing: true };
        expect(transactionReducer(initialState, { type: 'UNKNOWN' })).toEqual(initialState);
    });

    test("should handle INIT_TRANSACTION", () => {
        const state = transactionReducer({}, {
            type: INIT_TRANSACTION,
            data: 123
        });
        expect(state.id).toBe(123);
    });

    test("should handle CANCEL_TRANSACTION", () => {
        const state = transactionReducer({ id: 123 }, {
            type: CANCEL_TRANSACTION
        });
        expect(state).toEqual({});
    });
});
