import { useEffect, useState } from "react";

function getValueByVariableName(
    variableName: string,
    variables: any[]
): string | undefined {
    const variable = variables.find((v) => v.Variable_name === variableName);
    return variable ? variable.Value : undefined;
}

export const StatMongoDbList = () => {
    const [mongoStats, setMongoStats]: any = useState(null);
    const [mysqlStats, setMysqlStats]: any = useState(null);
    const [dockerStats, setDockerStats]: any = useState(null);

    useEffect(() => {
        fetch("api/stats/mongodb")
            .then((response) => response.json())
            .then((data) => {
                return setMongoStats(data);
            });

        fetch("api/stats/mysql")
            .then((response) => response.json())
            .then((data) => {
                const data_prep = {
                    Threads_connected: getValueByVariableName(
                        "Threads_connected",
                        data
                    ),
                    Threads_running: getValueByVariableName(
                        "Threads_running",
                        data
                    ),
                    Questions: getValueByVariableName(
                        "Questions",
                        data
                    ),
                    Slow_queries: getValueByVariableName(
                        "Slow_queries",
                        data
                    ),                 
                    Connections: getValueByVariableName(
                        "Connections",
                        data
                    ),
                    Connection_errors_internal : getValueByVariableName(
                        "Connection_errors_internal",
                        data
                    ),
                    Connection_errors_max_connections : getValueByVariableName(
                        "Connection_errors_max_connections",
                        data
                    ),
                };
                return setMysqlStats(data_prep);
            });

        fetch("api/stats/docker")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return setDockerStats(data);
            });
    }, []);

    return (
        <div>
            <h1>Conteneurs</h1>

            {dockerStats != null && dockerStats.map((container: any) => (
                <div key={container.id}>
                    <b>Nom du conteneur : </b>{container?.stats?.name} {container?.stats?.name == "/foodcesi-database-1" && "~MongoDB"}{container?.stats?.name == "/foodcesi-database2-1" && "~MySQL"}
                    <br />
                    Nombre de processus en cours d'exécution : {container?.stats?.pids_stats?.current}
                    <br />
                    Utilisation totale du CPU : {container?.stats?.cpu_stats?.cpu_usage?.total_usage} ns
                    <br />
                    Utilisation totale de la mémoire : {container?.stats?.memory_stats?.usage} o
                    <br />
                    Utilisation maximale enregistrée de la mémoire : {container?.stats?.memory_stats?.max_usage} o
                    <br />
                    Limite maximale d'utilisation de la mémoire : {container?.stats?.memory_stats?.limit} o
                    <br />
                    Mémoire cache utilisée : {container?.stats?.memory_stats?.stats.cache} o
                    <br />
                    Nombre de packets reçus : {container?.stats?.networks?.eth0?.rx_packets}
                    <br />
                    Nombre de packets envoyés : {container?.stats?.networks?.eth0?.tx_packets}
                    <br />
                    Nombre d'octets reçus sur l'interface réseau : {container?.stats?.networks?.eth0?.rx_bytes} o
                    <br />
                    Nombre d'octets envoyés sur l'interface réseau : {container?.stats?.networks?.eth0?.tx_bytes} o
                    <br />                    
                    <br />
                </div>
            ))}


            <h1>MySQL</h1>
            <b>Threads actuellement connectés : </b>
            {mysqlStats?.Threads_connected}
            <br />
            <b>Threads en cours d'exécution : </b>
            {mysqlStats?.Threads_running}
            <br />
            <b>Nombre de requêtes du serveur : </b>
            {mysqlStats?.Questions}
            <br />
            <b>Requêtes lentes : </b>
            {mysqlStats?.Slow_queries}
            
            <br /><br />
            <b>Tentatives de connexion : </b>
            {mysqlStats?.Connections}
            <br />
            <b>Erreurs de connexion liées à une erreur interne du serveur : </b>
            {mysqlStats?.Connection_errors_internal}
            <br />
            <b>Erreurs de connexion liées au nombre maximum de connexions : </b>
            {mysqlStats?.Connection_errors_max_connections }



            <h1>MongoDB</h1>
            <b>Quantité totale de données stockées : </b>
            {mongoStats?.dataSize} o
            <br />
            <b>Quantité d'espace de stockage utilisé : </b>
            {mongoStats?.storageSize} o

            <br /><br /> 
            <b>Nombre total d'objets : </b>
            {mongoStats?.objects}
            <br />
            <b>Taille moyenne d'un objet : </b>
            {mongoStats?.avgObjSize} o

        </div>
    );
};
