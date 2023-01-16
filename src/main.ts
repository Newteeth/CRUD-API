import { server } from './modules/router.js'
import cluster from 'cluster';
import { isPrimaryStart } from './cluster/cluster.js';
import { pid } from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

const arg = process.argv[2];
const PORT = process.env.DEV_PORT || 4000;

if (arg === 'cluster') {
    if (cluster.isPrimary) {
        isPrimaryStart();
    } else {
        const clusterID = cluster.worker?.id as number;
        const modifiedPORT = +PORT + clusterID - 1;
        server.listen(modifiedPORT,  () => {
            console.log(`server start in ${modifiedPORT} port. Pid: ${pid}`);
        });
    }
} else {
    server.listen(PORT,  () => {
        console.log(`server start in ${PORT} port. Pid: ${pid}`);
    });
}
process.on('SIGINT', () => {
    server.close((error) => {
        if (error) return error;
    }); 
});



