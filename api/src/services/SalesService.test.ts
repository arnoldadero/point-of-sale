import { expect, test, mock, describe, beforeEach } from "bun:test";
import { SalesService } from "./SalesService";
import { TransactionId } from "../entity/TransactionId";
import { TransactionHeader } from "../entity/TransactionHeader";

// Mock QueryRunner
const mockQueryRunner = {
    connect: mock(async () => { }),
    startTransaction: mock(async () => { }),
    commitTransaction: mock(async () => { }),
    rollbackTransaction: mock(async () => { }),
    release: mock(async () => { }),
    manager: {
        count: mock(async () => 0),
        increment: mock(async () => { }),
        findOne: mock(async () => null),
        insert: mock(async () => { }),
        save: mock(async () => { })
    }
};

const mockEntityManager = {
    save: mock(async (item) => item),
    findOne: mock(async () => null),
    createQueryBuilder: mock(() => ({
        delete: mock().mockReturnThis(),
        from: mock().mockReturnThis(),
        where: mock().mockReturnThis(),
        execute: mock(async () => { }),
        select: mock().mockReturnThis(),
        addSelect: mock().mockReturnThis(),
        getRawOne: mock(async () => ({ totalPrice: 100, netTotalPrice: 100, totalDiscount: 0 }))
    }))
};

mock.module("typeorm", () => ({
    getManager: () => mockEntityManager,
    getConnection: () => ({
        createQueryRunner: () => mockQueryRunner
    })
}));

// Mock messages
mock.module("./messages", () => ({
    TRANSACTION_ID_NOT_FOUND: new Error("TRANSACTION_ID_NOT_FOUND")
}));

mock.module("../entity/TransactionId", () => ({ TransactionId: class { } }));
mock.module("../entity/TransactionHeader", () => ({
    TransactionHeader: class { id: number; },
    TransactionStatus: { Init: 0, Pending: 1, Done: 2 },
    SalesType: { CounterSale: 0 }
}));

describe("SalesService", () => {
    let salesService: SalesService;

    beforeEach(() => {
        salesService = new SalesService();
        mock.restore();
    });

    test("initTransaction creates new transaction ID if none exists", async () => {
        mockQueryRunner.manager.count.mockResolvedValue(0); // No existing

        const returnId = await salesService.initTransaction("user");

        expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
        expect(mockQueryRunner.manager.insert).toHaveBeenCalledTimes(2); // TransactionId + TransactionHeader
        expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
        expect(returnId).toBeDefined();
    });
});
