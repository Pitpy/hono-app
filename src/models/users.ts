import type { User } from "../types";

const pathToFile = "./src/json/users.json"
const data = async () => await (Bun.file(pathToFile)).json()

export async function getAll() {
    const users: User[] = await data();
    return users;
}

export async function getById(id: string) {
    const users: User[] = await data();
    const findUser = users.find((e: User) => e.id === id);
    return findUser;
}

export async function addUser(user: User) {
    try {
        let users: User[] = await data()
        users.push(user)
        await Bun.write(pathToFile, JSON.stringify(users))
        return true
    } catch (error: any) {
        console.log('err', error.message);
        return false;
    }
}

export async function delUser(id: string) {
    try {
        let users: User[] = await data()
        let filterUser = users.filter((e: User) => e.id != id);
        await Bun.write(pathToFile, JSON.stringify(filterUser))
        return true
    } catch (error: any) {
        console.log('err', error.message);
        return false;
    }
}