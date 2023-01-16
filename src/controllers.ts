import { IncomingMessage, ServerResponse } from 'http';
import userServece from './service.js';
import { IUsers } from './endpoints/user.js';
import { typeCheck } from './modules/type.js';
import { DB } from './DB.js';
import { code200, errorID400, errorID404, error500, errorBody400 } from './modules/errormessage.js';

class userController {

    async getAll (req: IncomingMessage, res: ServerResponse) {

        try{
            const users = await userServece.getAll();
            res.setHeader('Content-type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(users));
        } catch {
            res.statusCode = 500;
            res.end(JSON.stringify(error500()));
        }
    }

    async getOne(req: IncomingMessage, res: ServerResponse) {

        const url = req.url as string;
        const id = url.split('/');

        try{
            const user = await userServece.getOne(id[3]);
            if (!user) {
                res.statusCode = 400;
                res.end(JSON.stringify(errorBody400()));
            } else {
                res.setHeader('Content-type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify(user));
            }
        } catch {
            res.statusCode = 500;
            res.end(JSON.stringify(error500()));
        }
    }

    async create(req: IncomingMessage, res: ServerResponse) {
        
        let data: Array<string> = [];
        
        try{          
            req.on('data', (chunk) => {
                data.push(chunk.toString());
            });
            req.on('end', () => {
                JSON.parse(data.toString());
                data.forEach(async elem => {
                    elem = elem.replace(/(\r\n|\n|\r)/gm," ");
                    const user = await userServece.create(JSON.parse(elem)) as IUsers;
                    const lengthObj = Object.keys(user).length;

                    if (lengthObj < 4) {
                        res.statusCode = 400;
                        res.end(JSON.stringify(errorBody400()));
                    } else {
                        res.setHeader('Content-type', 'application/json');
                        res.statusCode = 201;
                        res.end(JSON.stringify(user));
                    } 
                });         
            });   
        } catch {
            res.statusCode = 500;
            res.end(JSON.stringify(error500()));
        }
    }

    async update(req: IncomingMessage, res: ServerResponse) {

        const url = req.url as string;
        const id = url.split('/');
        let user = await userServece.getOne(id[3]) as IUsers;

        try{
            let data: Array<string> = [];
            req.on('data', (chunk) => {
                data.push(chunk.toString());
            });
            req.on('end', () => {
                JSON.parse(data.toString());
                data.forEach(elem => {
                    elem = elem.replace(/(\r\n|\n|\r)/gm," ");
                    let jsonElem: IUsers = JSON.parse(elem);
                    const userCheck = typeCheck(jsonElem);

                    if (userCheck === undefined) {
                        res.statusCode = 400;
                        res.end(JSON.stringify(errorID400()));
                    } else {
                        user.username = userCheck.username;
                        user.age = userCheck.age;
                        user.hobbies = userCheck.hobbies;  
                        res.setHeader('Content-type', 'application/json');
                        res.statusCode = 200;
                        res.end(JSON.stringify(user));
                    }
                });    
            });
        } catch {
            res.statusCode = 500;
            res.end(JSON.stringify(error500()));
        }
    }

    async delete(req: IncomingMessage, res: ServerResponse) {
        
        const url = req.url as string;
        const id = url.split('/');
        const booleanRes = await userServece.delete(id[3]);

        try{
            if (booleanRes === 0) {
                res.statusCode = 400;
                res.end(JSON.stringify(errorID400()));
            } else if (booleanRes === undefined) { 
                res.statusCode = 404;
                res.end(JSON.stringify(errorID404()));
            } else {
                res.setHeader('Content-type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify(code200(DB)));
            }            
        } catch {
            res.statusCode = 500;
            res.end(JSON.stringify(error500()));
        }
    }
}
export default new userController();
