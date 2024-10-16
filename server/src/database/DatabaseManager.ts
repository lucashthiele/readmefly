import { Db, MongoClient, ServerApiVersion } from "mongodb";

export default class DatabaseManager {
    static async getDatabase(): Promise<Db> {
        const client = this.initializeClient();

        await client.connect();
        await client.db("admin").command({ ping: 1 });

        const db = client.db(process.env.MONGODB_DATABASE);

        return db;
    }

    static async clearDatabase() {
        const client = this.initializeClient();

        await client.connect();
        await client.db("admin").command({ ping: 1 });

        const db = client.db(process.env.MONGODB_DATABASE);

        // in here should be listed all collections that should be dropped
        // mongo currently dont support dropping databases without giving admin rights
        await db.dropCollection("users");
    }

    private static initializeClient() {
        const uri = process.env.MONGODB_CONNECTION_STRING as string;

        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        return client;
    }
}
