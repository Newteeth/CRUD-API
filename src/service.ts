import { IUsers } from './endpoints/user.js';
import { DB } from './DB.js';
import { v4  as uuidv4, validate as uuidValidate }  from 'uuid';

class userServece {
    async getAll() {
        return DB;
    }

    async getOne(id: string) {
        if(!id && uuidValidate(id) === false){
            console.error('not correct id or was not specified');
        }
        const user = DB.find(elem => {
            if (elem.id === id) {
                return elem;
            }
        });
        return user;
    }

    async create(user: IUsers){
        if (
            typeof user === 'object' && 
            (user.username && typeof user.username === 'string') && 
            (user.age  && typeof user.age === 'number') && 
            (user.hobbies && Array.isArray(user.hobbies))) {
            user.id = uuidv4();
            DB.push(user);
            return user;
        } else {
            return user;            
        }
    }

    async delete(id: string) {
        if (!id || uuidValidate(id) === false) {
            return 0;
        }
        DB.forEach(elem => {
            if (elem.id !== id) {
                return 0;
            }
            if (elem.id === id) {
                const num: number = DB.indexOf(elem);
                DB.splice(num, 1);
                return 1;
            }
        });
    }
}

export default new userServece();