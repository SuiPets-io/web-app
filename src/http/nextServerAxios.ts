/* eslint-disable no-underscore-dangle */
import { globalEnv } from '@/configs'
import axios from 'axios'

export const axiosNextServer = axios.create({
	baseURL: globalEnv.hostname,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
})
