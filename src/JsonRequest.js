class JsonRequest {

    constructor(data_name, host_name = "http://localhost:3000/") {
        this.data_name = data_name;
        this.host_name = host_name;
    }

    async getData() {
        let response = await fetch(this.host_name + this.data_name);
        return await response.json();
    }

    async addData(data) {
        console.log(this.host_name +this.data_name);
        await fetch(this.host_name + this.data_name, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    async editData(data, id) {
        await fetch(this.host_name + this.data_name + "/" + id, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    async deleteData(id) {
        await fetch(this.host_name + this.data_name + "/" + id,
            {method: "DELETE"}
        );
    }
}

export default JsonRequest;