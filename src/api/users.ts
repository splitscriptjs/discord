import request from '../utils/request.js'
import { Channel, Snowflake, User } from '../types'
const me = {
	/** Returns the user object of the requester's account */
	async get(): Promise<User> {
		return request.get(`users/@me`) as unknown as User
	},
	/** Modify the requester's user account settings */
	async modify(settings: {
		/** user's username, if changed may cause the user's discriminator to be randomized. */
		username?: string
		/** if passed, modifies the user's avatar */
		avatar?: string | null
	}): Promise<User> {
		return request.patch(`users/@me`, settings) as unknown as User
	}
}
/** Returns a user object for a given user ID */
async function get(id: Snowflake): Promise<User> {
	return request.get(`users/${id}`) as unknown as User
}
const dm = {
	/** Create a new DM channel with a user */
	async create(recipient_id: Snowflake): Promise<Channel> {
		return request.post(`users/@me/channels`, {
			recipient_id: recipient_id
		}) as unknown as Channel
	},
	/** Create a new group DM channel with multiple users */
	async createGroup(
		/** access tokens of users that have granted your app the `gdm.join` scope */
		access_tokens: string[],
		/** a dictionary of user ids to their respective nicknames */
		nicks: {
			[key: Snowflake]: string
		}
	): Promise<Channel> {
		return request.post(`users/@me/channels`, {
			access_tokens: access_tokens,
			nicks: nicks
		}) as unknown as Channel
	}
}
export default { me, get, dm }
