import { IncomingMessage, ServerResponse } from 'http';
import { DB } from './DB.js';
import userServece from './service.js';
import { IUsers } from './endpoints/user.js';
import { typeCheck } from './modules/type.js';

class userController {

    async getAll (req: IncomingMessage, res: ServerResponse) {

        try{
            const users = await userServece.getAll();
            res.setHeader('Content-type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(users));
        } catch (error) {
            res.statusCode = 404;
            res.end(JSON.stringify({code: 400, massege: `Body has no necessary fields. Error: ${error}`}));
        }
    }

    async getOne(req: IncomingMessage, res: ServerResponse) {

        const url = req.url as string;
        const id = url.split('/');

        try{
            const user = await userServece.getOne(id[3]);
            res.setHeader('Content-type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(user));
        } catch (error) {
            res.statusCode = 404;
            res.end(JSON.stringify({code: 404, massege: `User not find by ID. Error: ${error}`}));
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
                        res.end(JSON.stringify({code: 400, massege: `Body has no necessary fields`}));
                    } else {
                        res.setHeader('Content-type', 'application/json');
                        res.statusCode = 201;
                        res.end(JSON.stringify(user));
                    } 
                });         
            });   
        } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({code: 400, massege: `Body has no necessary fields. Error: ${error}`}));
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
                        res.end(JSON.stringify({code: 400, massege: 'the body has no necessary fields'}));
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
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({code: 500, massege: `YOU LUKY, SERVER ERROR: ${error}`}));
        }
    }

    async delete(req: IncomingMessage, res: ServerResponse) {
        
        const url = req.url as string;
        const id = url.split('/');
        const user = await userServece.delete(id[3]);

        try{            
            res.setHeader('Content-type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(user));
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({code: 500, massege: `YOU LUKY, SERVER ERROR: ${error}`}));
        }
    }
}
export default new userController();
