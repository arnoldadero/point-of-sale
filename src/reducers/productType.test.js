import { expect, test, describe } from "bun:test";
import productTypeReducer from "./productType";
import { LOAD_PRODUCT_TYPE } from "../types";

describe("ProductType Reducer", () => {
    test("should return initial state", () => {
        expect(productTypeReducer(undefined, {})).toEqual({});
    });

    test("should handle LOAD_PRODUCT_TYPE", () => {
        const data = {
            list: [1, 2],
            paginationInfo: { page: 1 },
            isFiltered: true
        };
        const state = productTypeReducer({}, {
            type: LOAD_PRODUCT_TYPE,
            data
        });

        expect(state.list).toEqual([1, 2]);
        expect(state.paginationInfo).toEqual({ page: 1 });
        expect(state.meta.isFiltered).toBe(true);
    });
});
