import { Http } from "../utils/http";

export class AuthService extends Http {
    constructor() { super("") }

    async register(firstName, lastName, email, password, phone) {
        return await this.post('api/auth/signup', {
            "first_name": firstName,
            "last_name": lastName,
            "password1": password,
            "password2": password,
            "email": email,
            "phone_number": phone
        })
    }

    async login(user, password) {
        return await this.post('api/auth/sign_in', {
            "user": user,
            "password": password
        })
    }

    async me() {
        return await this.get('api/auth/me')
    }

    async updateProfile(firstName, lastName, address, gender) {
        return await this.put('api/auth/update_account',{
            "user": {
              "first_name": firstName,
              "last_name": lastName,
              "address": address
            },
            "member": {
              "gender": gender
            }
          })
    }
}