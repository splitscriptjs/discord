import request from '../utils/request.js'
import toCamelCase from '../utils/toCamelCase.js'

import type { Snowflake } from '../types'
import type { Channel } from './channels'

class User<isMe extends boolean> implements _User {
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
	premiumType?: PremiumType
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

	constructor(data: unknown, isMe = false) {
		Object.assign(this, toCamelCase(data))

		this.isMe = isMe
		if (isMe) {
			//@ts-expect-error type error
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
		return new User(await request.get(`users/@me`), true)
	},
	/** Edit the requester's user account settings */
	async edit(settings: EditParams): Promise<User<true>> {
		return new User(await request.patch(`users/@me`, settings), true)
	}
}

/** Returns a user object for a given user ID */
async function get(id: Snowflake): Promise<User<false>> {
	return new User(await request.get(`users/${id}`))
}
const dm = {
	/** Create a new DM channel with a user */
	async create(recipientId: Snowflake): Promise<Channel> {
		return (await request.post(`users/@me/channels`, {
			recipientId
		})) as unknown as Channel
	},
	/** Create a new group DM channel with multiple users */
	async createGroup(
		/** access tokens of users that have granted your app the `gdm.join` scope */
		accessTokens: string[],
		/** a dictionary of user ids to their respective nicknames */
		nicks: Record<Snowflake, string>
	): Promise<Channel> {
		return (await request.post(`users/@me/channels`, {
			accessTokens,
			nicks
		})) as unknown as Channel
	}
}
export enum PremiumType {
	None,
	NitroClassic,
	Nitro,
	NitroBasic
}
export { me, get, dm }
export default { me, get, dm }

/** User Object */
type _User = {
	/** user's id */
	id: Snowflake
	/** user's username */
	username: string
	/** user's 4-digit tag */
	discriminator: string
	/** user's avatar hash */
	avatar: string | null
	/** whether user is a bot */
	bot?: boolean
	/** whether user is Offical Discord System user */
	system?: boolean
	/** whether user has 2fa enabled */
	mfaEnabled?: boolean | null | undefined
	/** user's banner color as integer representation of hex color */
	accentColor?: number | null | undefined
	/** user's chosen language option */
	locale?: string
	/** whether user's email has been verified */
	verified?: boolean
	/** user's email */
	email?: string | null
	/** user's flags */
	flags?: number
	/** type of user's nitro subscription */
	premiumType?: PremiumType
	/** user's public flags */
	publicFlags?: number
}
export type { _User as User }
