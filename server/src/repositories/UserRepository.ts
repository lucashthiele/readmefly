import { Db } from "mongodb";
import DatabaseManager from "../database/DatabaseManager";
import User from "../model/user/User";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError";
import IUser from "../model/user/IUser";

export default class UserRepository {
    db: Db;

    constructor() {
        this.db = null as any;
    }

    async init(): Promise<UserRepository> {
        this.db = await DatabaseManager.getDatabase();
        return this;
    }

    async createUser(user: User): Promise<User> {
        const userCollection = this.db.collection("users");
        
        const cursor = await userCollection.findOne<IUser>({
            email: user.email,
        });
        if (cursor) throw new UserAlreadyExistsError();
        const result = await userCollection.insertOne(user);

        return new User({ _id: result.insertedId, ...user });
    }
}
