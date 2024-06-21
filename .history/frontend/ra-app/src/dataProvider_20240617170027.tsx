import { DataProvider } from "react-admin"

const transformData = (data: any) => {
   const t = data.map((item: any)=>{
        return {
            ...item,
            id: item._id ? item._id : item.id,
        };
    })
    return t
};

const dataProvider: DataProvider = {
    getList: (resource : string, params:any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        return fetch(`api/${resource}?${new URLSearchParams(query)}`)
            .then(response => {
                return response.json()})
            .then(( data ) => {
                return {
                data: transformData(data),
                total: data?.length,
            }});
    },
    getOne: (resource : string, params : any) => {
        return fetch(`api/${resource}/${params.id}`)
            .then(response => response.json())
            .then((data) => ({
                data,
            }));
    },
    getMany: (resource : string, params : any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return fetch(`api/${resource}?${String(query)}`)
            .then(response => response.json())
            .then((data) => ({
                data,
            }));
    },
    getManyReference: (resource : string, params : any) => {
        const query = {
            filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
        };
        return fetch(`api/${resource}?${String(query)}`)
            .then(response => response.json())
            .then((data) => ({
                data,
                total: data.length,
            }));
    },
    update: (resource : string, params : any) =>
        fetch(`api/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json', // Change the content type here
                'Accept': 'application/json',
            })
        })
            .then(response => response.json())
            .then((data) => ({
                data,
            })),
    updateMany: (resource : string, params : any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return fetch(`api/${resource}?${String(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        })
            .then(response => response.json())
            .then((data) => ({
                data,
            }));
    },
    create: (resource : string, params : any) =>
        fetch(`api/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        })
            .then(response => response.json())
            .then((data) => ({
                data,
            })),
    delete: (resource : string, params : any) =>
        fetch(`api/${resource}/${params.id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then((data) => ({
                data,
            })),
    deleteMany: (resource : string, params : any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return fetch(`api/${resource}?${String(query)}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then((data) => ({
                data,
            }));
    }
};


export default dataProvider;