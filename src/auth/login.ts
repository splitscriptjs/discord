import variable from '../utils/variable.js'
import tokenToId from '../utils/tokenToId.js'
export function login(token: string) {
	if (!token) throw new Error('token must be provided')

	variable.set('token', token)
	variable.set('app_id', tokenToId(token))
}
