import { Http } from "../utils/http";

export class ClinicService extends Http {
    constructor() { super("") }

    async all() {
        return await this.get('api/clinic/all_clinics')
    }

    async getClinic(id) {
        return await this.get('api/clinic/one_clinics?id='+id)
    }

    async rate(point, clinic) {
        return await this.post('api/clinic_rating/rate_clinic', {point: point, clinic: clinic})
    }

    async getRate(id) {
        return await this.get('api/clinic_rating/one_clinic_rate?clinic_id='+id)
    }

    async deleteRate(id) {
        return await this.delete('api/clinic_rating/delete_clinic_rate?clinic_id='+id)
    }
}