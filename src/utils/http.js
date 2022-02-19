import axiosInstance from './axios'


export class Http {

    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

    constructor(url_prefix = "") {
        this.url_prefix = url_prefix
    }

    async get(url) {
        try {
            let response = await axiosInstance.get(url, {
                headers: this.headers
            })
            
            return response
        } catch (error) {
            return null
        }
    }

    async post(url, body={}, content=null) {
            try {

                let response = await axiosInstance.post(url,body ,{
                    method: "POST",
                    headers: (content? {'Content-Type': content} : this.headers)
                })
                return response
            } catch (error) {
                return error
            }
            
        

        }

    async put(url, body={}) {
        try {
            let response = await fetch(url, {
                method: "PUT",
                headers: this.headers,
                body: JSON.stringify(body)
            })
           
            return response
        } catch (error) {
            return null
        }
    }

    async delete(url) {
        try {
            let response = await fetch(url, {
                method: "DELETE",
                headers: this.headers
            })
           
            return response
        } catch (error) {
            return null
        }
    }

}