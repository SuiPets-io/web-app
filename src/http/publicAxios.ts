/* eslint-disable no-underscore-dangle */
import { globalEnv } from '@/configs'
import axios from 'axios'

export const axiosPublic = axios.create({
	baseURL: globalEnv.baseURL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
})
