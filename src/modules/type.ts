import { IUsers } from "../endpoints/user.js";

export const typeCheck = (user: IUsers) => {
    if (
        typeof user === 'object' && 
        (user.username && typeof user.username === 'string') && 
        (user.age  && typeof user.age === 'number') && 
        (user.hobbies && Array.isArray(user.hobbies))) return user;
}

