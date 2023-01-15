import { server } from './modules/router.js'
import cluster from "cluster";
import { isPrimaryStart } from './cluster/cluster.js';
import { pid } from "process";

const PORT = 3999;

if (cluster.isPrimary) {
    isPrimaryStart();
} else {
    const clusterID = cluster.worker?.id as number;
    const modifiedPORT = PORT + clusterID;
    server.listen(modifiedPORT,  () => {
        console.log(`server start in ${modifiedPORT} port. Pid: ${pid}`);
    });
}

