import { expect, test, mock, describe, beforeEach } from "bun:test";
import { ReceivingServices } from "./ReceivingServices";

const mockEntityManager = {
    find: mock(async () => []),
    findOne: mock(async () => null),
    create: mock(() => ({})),
    save: mock(async (entity) => entity),
    createQueryBuilder: mock(() => ({
        where: mock().mockReturnThis(),
        getMany: mock(async () => []),
        getOne: mock(async () => null),
        skip: mock().mockReturnThis(),
        take: mock().mockReturnThis(),
    }))
};

mock.module("typeorm", () => ({
    getManager: () => mockEntityManager,
    getConnection: () => ({
        transaction: mock(async (cb) => await cb(mockEntityManager))
    })
}));

describe("ReceivingServices", () => {
    let receivingServices: ReceivingServices;

    beforeEach(() => {
        receivingServices = new ReceivingServices();
    });

    test("fetchPages returns array", async () => {
        // Since fetchPages uses cruderServices, which uses getManager().createQueryBuilder() or getManager().find()?
        // CrudServices.fetchPages uses createQueryBuilder.
        const mockQb = {
            where: mock().mockReturnThis(),
            skip: mock().mockReturnThis(),
            take: mock().mockReturnThis(),
            getMany: mock(async () => [{ id: 1 }])
        };
        mockEntityManager.createQueryBuilder.mockReturnValue(mockQb);

        const results = await receivingServices.fetchPages({
            page: 1,
            perPage: 10,
            search: ""
        });
        expect(results).toHaveLength(1);
    });
});
