import {HTTP} from "../http-common";

class RegistrationService {
    getAll(id) {
        return HTTP.get('/getList')
    }

    getById(id){
        return HTTP.get(`/GetUser/${id}`)
    }

    create(data) {
        return HTTP.post('/List', data);
    }

    update(id, data) {
        return HTTP.put(`/List/${id}`, data);
    }

    delete(id) {
        return HTTP.delete(`/List/${id}`)
    }

    findByName(name) {
        return HTTP.get(`/SearchUser/${name}`)
    }

    deleteAll(){
        return HTTP.get(`/deleteAll`)
    }
}

export default new RegistrationService();
