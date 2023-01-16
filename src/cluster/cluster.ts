import cluster from "cluster";
import os from "os";

export const isPrimaryStart = () =>{
    const cpuCount = os.cpus().length;
    for (let i = 0; i < cpuCount; i++){
        cluster.schedulingPolicy = cluster.SCHED_NONE;
        const worker = cluster.fork();
    
        worker.on('exit', () => {
            console.log(`worker died. Pid: ${worker.process.pid}`);
            cluster.fork();
        })
    }
}
