import { expect, test, mock, describe, beforeEach } from "bun:test";

// Mock User entity to prevent TypeORM decorator errors during import
mock.module("../entity/User", () => ({
    User: class {
        id: string;
        password: string;
    }
}));

// Mock TypeORM getManager
mock.module("typeorm", () => ({
    getManager: () => ({
        findOne: mock(async (entity, criteria) => {
            if (criteria.id === "valid-user" && criteria.password === "correct-password") {
                return { id: "valid-user", name: "Test User" };
            }
            return null;
        })
    })
}));

// Import after mocks
import { AuthServices } from "./AuthServices";

describe("AuthServices", () => {
    let authServices: AuthServices;

    beforeEach(() => {
        authServices = new AuthServices();
    });

    test("fetchUser returns user for valid credentials", async () => {
        const user = await authServices.fetchUser({
            userid: "valid-user",
            password: "correct-password"
        });
        expect(user).toBeDefined();
        expect(user!.id).toBe("valid-user");
    });

    test("fetchUser returns null for invalid credentials", async () => {
        const user = await authServices.fetchUser({
            userid: "invalid-user",
            password: "wrong-password"
        });
        expect(user).toBeNull();
    });
});
