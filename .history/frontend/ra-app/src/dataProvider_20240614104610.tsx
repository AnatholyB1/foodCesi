const dataProvider = {
    getList: async (resource : string,) => {
        return fetch(`http://localhost:8000/${resource}`)
            .then(response => response.json())
            .then(({ data }) => ({
                data,
                total: data.length,
            }));
    },
    getOne: async (resource : string, params : any) => {
        return fetch(`http://localhost:8000/${resource}/${params.id}`)
            .then(response => response.json())
            .then(({ data }) => ({
                data,
            }));
    },
    getMany: async (resource : string, params : any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return fetch(`http://localhost:8000/${resource}?${stringify(query)}`)
            .then(response => response.json())
            .then(({ data }) => ({
                data,
            }));
    },
    getManyReference: async (resource : string, params : any) => {
        const query = {
            filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
        };
        return fetch(`http://localhost:8000/${resource}?${stringify(query)}`)
            .then(response => response.json())
            .then(({ data }) => ({
                data,
                total: data.length,
            }));
    },
    update: async (resource : string, params : any) =>
        fetch(`http://localhost:8000/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        })
            .then(response => response.json())
            .then(({ data }) => ({
                data,
            })),
    updateMany: async (resource : string, params : any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return fetch(`http://localhost:8000/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        })
            .then(response => response.json())
            .then(({ data }) => ({
                data,
            }));
    },
    create: async (resource : string, params : any) =>
        fetch(`http://localhost:8000/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        })
            .then(response => response.json())
            .then(({ data }) => ({
                data,
            })),
    delete: async (resource : string, params : any) =>
        fetch(`http://localhost:8000/${resource}/${params.id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(({ data }) => ({
                data,
            })),
    deleteMany: async (resource : string, params : any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return fetch(`http://localhost:8000/${resource}?${stringify(query)}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(({ data }) => ({
                data,
            }));
    }
};


export default dataProvider;