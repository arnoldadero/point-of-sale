import { expect, test, mock, describe, beforeEach } from "bun:test";
import { CrudServices } from "./CrudServices";

const mockEntityManager = {
    find: mock(async () => []),
    findOne: mock(async () => null),
    insert: mock(async () => ({})),
    update: mock(async () => ({})),
    delete: mock(async () => ({})),
    createQueryBuilder: mock(() => ({
        where: mock().mockReturnThis(), // Default implementation
        skip: mock().mockReturnThis(),
        take: mock().mockReturnThis(),
        getMany: mock(async () => []),
        getOne: mock(async () => null),
    }))
};

mock.module("typeorm", () => ({
    getManager: () => mockEntityManager,
    InsertResult: class { },
    UpdateResult: class { }
}));

class MockEntity {
    id: string;
    name: string;
}

describe("CrudServices", () => {
    let crudServices: CrudServices<MockEntity>;

    beforeEach(() => {
        crudServices = new CrudServices<MockEntity>();
        crudServices.setEntity(MockEntity);
        mock.restore();
    });

    test("fetchAll returns array", async () => {
        mockEntityManager.find.mockResolvedValue([{ id: "1", name: "Test" }]);
        const results = await crudServices.fetchAll();
        expect(results).toHaveLength(1);
        expect(results[0].id).toBe("1");
    });

    test("fetchById returns entity", async () => {
        // Explicitly create the mock object to ensure 'this' context works or simply mock return logic
        const expectedEntity = { id: "1", name: "Test" };

        const mockQb = {
            where: mock(() => mockQb), // Manually chain
            getOne: mock(async () => expectedEntity)
        };

        mockEntityManager.createQueryBuilder.mockReturnValue(mockQb);

        const result = await crudServices.fetchById("1");
        expect(result).toBeDefined();
        expect(result!.id).toBe("1");
    });

    test("create sets audit fields", async () => {
        const entity = new MockEntity();
        await crudServices.create("test-user", entity);

        expect((entity as any).createdBy).toBe("test-user");
        expect((entity as any).updatedBy).toBe("test-user");
        expect(mockEntityManager.insert).toHaveBeenCalled();
    });
});
