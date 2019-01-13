import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://bgxtgjkjrj.execute-api.eu-central-1.amazonaws.com/dev'
})