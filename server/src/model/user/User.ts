import { ObjectId } from "mongodb";
import IUser from "./IUser.ts";

export default class User implements IUser {
    _id?: ObjectId;
    name: String;
    username: String;
    email: String;
    gitHubToken?: String;

    constructor(user: IUser) {
        this._id = user._id;
        this.name = user.name;
        this.username = user.username;
        this.email = user.email;
        this.gitHubToken = user.gitHubToken;
    }
}
