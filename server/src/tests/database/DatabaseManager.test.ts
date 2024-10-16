import DatabaseManager from "../../database/DatabaseManager";

describe("DatabaseManager", () => {
    it("should connect to database", async () => {
        const db = await DatabaseManager.getDatabase();

        expect(db).toBeDefined();
        expect(db.databaseName).toBe(process.env.MONGODB_DATABASE);
    });

    it("should clear database", async () => {
        const db = await DatabaseManager.getDatabase();
        const collection = db.collection("users");
        await collection.insertOne({ test: "test" });

        await DatabaseManager.clearDatabase();
    });
});
