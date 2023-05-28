import https from '@splitscript.js/https'
import httpTypes from 'node:http'

import variable from './variable.js'

const url = `https://discord.com/api/v10/`

function handeErr(res: httpTypes.IncomingMessage, data: any) {
	if (res.statusCode && res.statusCode >= 400) {
		throw new Error(
			`${res.statusCode ? res.statusCode : ''} ${
				res.statusMessage ? res.statusMessage : ''
			}\n${JSON.stringify(data, null, 2)}`
		)
	}
}
export async function get(path: string, params?: object) {
	if (path.includes('{APP_ID}')) {
		const APP_ID = variable.get('app_id')
		if (!APP_ID) throw new Error('Not logged in')
		path = path.replace('{APP_ID}', APP_ID)
	}
	const { res, data } = await https.get(url + path, {
		params: params,
		headers: {
			Authorization: `Bot ${variable.get('token')}`,
			'Content-Type': 'application/json'
		}
	})
	handeErr(res, data)
	return data
}
export async function post(path: string, body?: any, params?: any) {
	if (path.includes('{APP_ID}')) {
		const APP_ID = variable.get('app_id')
		if (!APP_ID) throw new Error('Not logged in')
		path = path.replace('{APP_ID}', APP_ID)
	}
	const { res, data } = await https.post(url + path, {
		body: body,
		params: params,
		headers: {
			Authorization: `Bot ${variable.get('token')}`,
			'Content-Type': 'application/json'
		}
	})
	handeErr(res, data)
	return data
}
export async function patch(path: string, body?: any, params?: any) {
	if (path.includes('{APP_ID}')) {
		const APP_ID = variable.get('app_id')
		if (!APP_ID) throw new Error('Not logged in')
		path = path.replace('{APP_ID}', APP_ID)
	}
	const { res, data } = await https.patch(url + path, {
		body: body,
		params: params,
		headers: {
			Authorization: `Bot ${variable.get('token')}`,
			'Content-Type': 'application/json'
		}
	})
	handeErr(res, data)
	return data
}
export async function put(path: string, body?: any) {
	if (path.includes('{APP_ID}')) {
		const APP_ID = variable.get('app_id')
		if (!APP_ID) throw new Error('Not logged in')
		path = path.replace('{APP_ID}', APP_ID)
	}
	const { res, data } = await https.put(url + path, {
		body: body,
		headers: {
			Authorization: `Bot ${variable.get('token')}`,
			'Content-Type': 'application/json'
		}
	})
	handeErr(res, data)
	return data
}
async function _delete(path: string, body?: any, params?: any) {
	if (path.includes('{APP_ID}')) {
		const APP_ID = variable.get('app_id')
		if (!APP_ID) throw new Error('Not logged in')
		path = path.replace('{APP_ID}', APP_ID)
	}
	const { res, data } = await https.delete(url + path, {
		body: body,
		params: params,
		headers: {
			Authorization: `Bot ${variable.get('token')}`,
			'Content-Type': 'application/json'
		}
	})
	handeErr(res, data)
	return data
}
export default { get, post, patch, put, delete: _delete }
