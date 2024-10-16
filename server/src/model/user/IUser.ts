import { ObjectId } from "mongodb";

export default interface IUser {
    _id?: ObjectId;
    name: String;
    username: String;
    email: String;
    gitHubToken?: String
}