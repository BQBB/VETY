import { Http } from "../utils/http";

export class PetService extends Http {
    constructor() { super("") }

    async all() {
        return await this.get('api/pet/all_pet')
    }

    async types() {
        return await this.get('api/pet/all_type')
    }

    async getPet(id) {
        return await this.get('api/pet/one_pet?pet_id='+id)
    }

    async addToClinic(petId, clinicId) {
        return await this.post('api/pet/post_clinic_pet?id='+ petId +'&clinic_id='+clinicId)
    }

    async deletePet(id) {
        return await this.delete('api/pet/delete_pet?pet_id='+id)
    }


    async create(formData) {

    // {
    //     type_id: id,
    //     name: name,
    //     gender: gender,
    //     family: family,
    //     weight: weight,
    //     adopt_date: date,
    //     age: age,
    //     chip_num: chip_num,
    //     image: img}

        return await this.post('api/pet/create_pet_form', formData, `multipart/form-data; boundary=${formData._boundary}`)
    }

    async getVaccines(id) {
        return await this.get('api/vaccine/all_pet_vaccine?pet_id='+id)
    }

    async getReports(id) {
        return await this.get('api/report/all_pet_report?pet_id='+id)
    }

}