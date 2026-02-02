import { expect, test, describe } from "bun:test";
import cartReducer from "./cart";
import { ADD_ITEM_TO_CART, EMPTY_CART } from "../types";

describe("Cart Reducer", () => {
    const initialState = {
        items: {},
        summary: {
            noOfItems: 0,
            noOfInividualItems: 0,
            tax: "0",
            taxAmount: "0.00",
            discountOnTotal: "0.00",
            discountOnItems: "0.00",
            total: "0.00",
            netTotal: "0.00"
        }
    };

    test("should return initial state", () => {
        const state = cartReducer(undefined, {});
        // use JSON stringify for comparison to avoid reference issues with initial state object
        expect(JSON.stringify(state)).toBe(JSON.stringify(initialState));
    });

    test("should handle ADD_ITEM_TO_CART", () => {
        const item = {
            id: 1,
            name: "Test Item",
            qty: 2,
            price: 100,
            discount: 0
        };

        const state = cartReducer(initialState, {
            type: ADD_ITEM_TO_CART,
            data: item
        });

        expect(state.summary.noOfItems).toBe(1);
        expect(state.summary.noOfInividualItems).toBe(2);
        expect(Number(state.summary.total)).toBe(200);
        expect(state.items[1].name).toBe("Test Item");
    });

    test("should handle EMPTY_CART", () => {
        const item = {
            id: 1,
            name: "Test Item",
            qty: 2,
            price: 100,
            discount: 0
        };
        let state = cartReducer(initialState, {
            type: ADD_ITEM_TO_CART,
            data: item
        });

        state = cartReducer(state, { type: EMPTY_CART });
        expect(state.summary.noOfItems).toBe(0);
        expect(Object.keys(state.items)).toHaveLength(0);
    });
});
