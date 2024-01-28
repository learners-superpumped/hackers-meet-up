import axios from 'axios'

export const llmHackApi = axios.create({
    baseURL: 'https://llm-hack-wild-wind-7127.fly.dev/'
});
