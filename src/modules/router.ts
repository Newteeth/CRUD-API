import http, { RequestListener, ServerResponse } from 'http';
import userController from '../controllers.js';

export const server = http.createServer((req, res) => {
    const query = req.url?.lastIndexOf('/');
    let method = req.method;

    if (req.url === '/api/users') {
        switch(method) {
            case 'GET': userController.getAll(req, res);
            break;
            case 'POST': userController.create(req, res);
            break;
        }
    } else if (req.url?.length === 47){
        switch(method){
            case 'GET': userController.getOne(req, res);
            break;
            case 'PUT': userController.update(req, res);
            break;       
            case 'DELETE': userController.delete(req, res);
            break;
        }
    } else {
        console.error('URL OR ID NOT CORRECT');
    }
});

