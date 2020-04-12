import axios from '../utils/axios'

export default class {
    static async listAll() {
        return axios.get('/projects')
    }

    static async getById(projectId) {
        return axios.get(`/projects/${projectId}`)
    }
}