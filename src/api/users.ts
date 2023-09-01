import request from '../utils/request.js'
import { Channel, Snowflake, User as RawUser } from '../types'
import toCamelCase from '../utils/toCamelCase.js'

class User<isMe extends boolean> implements RawUser {
	id!: Snowflake
	username!: string
	discriminator!: string
	avatar!: string | null
	bot?: boolean
	system?: boolean
	mfaEnabled?: boolean | null | undefined
	accentColor?: number | null | undefined
	locale?: string
	verified?: boolean
	email?: string | null
	flags?: number
	premiumType?: number
	publicFlags?: number
	isMe: boolean

	/** Gets this user
	 *
	 * Also updates this class instance
	 */
	async get() {
		const result: User<boolean> = this.isMe
			? await me.get()
			: await get(this.id)
		Object.assign(this, result)
		return result
	}

	/** Creates a dm channel with this user */
	async dm() {
		return await dm.create(this.id)
	}

	/** Edits this user (if it is the bots account)
	 *
	 * Also updates this class instance
	 */
	edit!: isMe extends true
		? (settings: EditParams) => Promise<User<true>>
		: never

	constructor(data: RawUser, isMe: boolean = false) {
		Object.assign(this, toCamelCase(data))

		this.isMe = isMe
		if (isMe) {
			//@ts-expect-error
			this.edit = async (settings: EditParams) => {
				const result = await me.edit(settings)
				Object.assign(this, result)
				return result
			}
		}
	}
}

type EditParams = {
	/** user's username, if changed may cause the user's discriminator to be randomized. */
	username?: string
	/** if passed, modifies the user's avatar */
	avatar?: string | null
}

const me = {
	/** Returns the user object of the requester's account */
	async get(): Promise<User<true>> {
		return new User(
			(await request.get(`users/@me`)) as unknown as RawUser,
			true
		)
	},
	/** Edit the requester's user account settings */
	async edit(settings: EditParams): Promise<User<true>> {
		return new User(
			(await request.patch(`users/@me`, settings)) as unknown as RawUser,
			true
		)
	}
}

/** Returns a user object for a given user ID */
async function get(id: Snowflake): Promise<User<false>> {
	return new User((await request.get(`users/${id}`)) as unknown as RawUser)
}
const dm = {
	/** Create a new DM channel with a user */
	async create(recipientId: Snowflake): Promise<Channel> {
		return request.post(`users/@me/channels`, {
			recipient_id: recipientId
		}) as unknown as Channel
	},
	/** Create a new group DM channel with multiple users */
	async createGroup(
		/** access tokens of users that have granted your app the `gdm.join` scope */
		accessTokens: string[],
		/** a dictionary of user ids to their respective nicknames */
		nicks: {
			[key: Snowflake]: string
		}
	): Promise<Channel> {
		return request.post(`users/@me/channels`, {
			access_tokens: accessTokens,
			nicks: nicks
		}) as unknown as Channel
	}
}
export default { me, get, dm }
