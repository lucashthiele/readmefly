import DatabaseManager from "../../database/DatabaseManager";
import { UserAlreadyExistsError } from "../../errors/UserAlreadyExistsError";
import User from "../../model/user/User";
import UserRepository from "../../repositories/UserRepository";
import "dotenv/config";

describe("UserRepository", () => {
    let userRepository: UserRepository;

    beforeAll(async () => {
        userRepository = await new UserRepository().init();
    });

    afterAll(async () => {
        await DatabaseManager.clearDatabase();
    });

    it("should write user to database", async () => {
        const mockUser = new User({
            email: "test@test.com",
            name: "test",
            username: "test",
        });
        const user = await userRepository.createUser(mockUser);

        expect(user).toBeDefined();
        expect(user._id).toBeDefined();
    });

    it("should throw error when user already exists", async () => {
        const mockUser = new User({
            email: "test@test.com",
            name: "test",
            username: "test",
        });
        const t = async () => {
            await userRepository.createUser(mockUser);
            await userRepository.createUser(mockUser);
        }
        
        expect(t).rejects.toThrow(UserAlreadyExistsError);
    });
});
