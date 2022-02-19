import { Http } from "../utils/http";

export class BlogService extends Http {
    constructor() { super("") }

    async all() {
        return await this.get('api/blog/all_blog')
    }

    async getBlog(id) {
        return await this.get('api/blog/one_blog?blog_id='+id)
    }

    async delete(id) {
        return await this.delete('api/blog/delete_blog?id='+id)
    }

    async like(id) {
        return await this.post('api/blog_rating/like_blog?blog_id='+id)
    }

    async dislike(id) {
        return await this.post('api/blog_rating/dislike_blog?blog_id='+id)
    }

}