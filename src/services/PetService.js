import { Http } from "../utils/http";

export class PetService extends Http {
    constructor() { super("") }

    async all() {
        return await this.get('api/pet/all_pet')
    }

    async types() {
        return await this.get('api/pet/all_type')
    }

    async get(id) {
        return await this.get('api/pet/one_pet?pet_id='+id)
    }

    async addToClinic(petId, clinicId) {
        return await this.post('api/pet/post_clinic_pet?id='+ petId +'&clinic_id='+clinicId)
    }

    async delete(id) {
        return await this.delete('api/pet/delete_pet?pet_id='+id)
    }

}