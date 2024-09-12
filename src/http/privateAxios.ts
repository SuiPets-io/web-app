import { globalEnv } from '@/configs'
import { storageKeys } from '@/constants'
import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

axios.defaults.baseURL = globalEnv.baseURL

axios.interceptors.request.use(
	async (config: InternalAxiosRequestConfig<any>) => {
		if (!config.headers.Authorization) {
			const accessToken = localStorage.getItem(storageKeys.ACCESS_TOKEN)
			if (accessToken) {
				config.headers.setAuthorization(`Bearer ${JSON.parse(accessToken)}`)
			}
		}

		return config
	},
	(error) => Promise.reject(error)
)

axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response?.data?.status === 5) {
			localStorage.removeItem('authen_status')
			localStorage.removeItem(storageKeys.ACCESS_TOKEN)
		}
		return Promise.reject(error)
	}
)
export const axiosPrivate = axios
