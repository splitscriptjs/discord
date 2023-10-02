import request from '../utils/request.js'
import toCamelCase from '../utils/toCamelCase.js'

import type { Snowflake } from '../types'
import type { User } from './users'

class GuildMember {
	/** user this guild member represents */
	user!: User
	/** user's guild nickname */
	nick?: string
	/** user's guild avatar hash */
	avatar?: string
	/** array of role object ids */
	roles!: string[]
	/** when user joined guild */
	joinedAt!: string
	/** when user started boosting guild */
	premiumSince?: string | null
	/** whether user is deafened in voice channels */
	deaf!: boolean
	/** whether user is muted in voice channels */
	mute!: boolean
	/** guild member flags as bit set */
	flags!: number
	/** whether user has passed guild's membership screening requirements */
	pending?: boolean
	/** total permissions of member in channel */
	permissions?: string
	/** when user's timeout will expire */
	communicationDisableUntil?: string | null

	guildId: Snowflake

	/** Gets this member
	 *
	 * Also updates this class instance
	 */
	async get() {
		const result = await get(this.guildId, this.user.id)
		Object.assign(this, result)
		return result
	}
	/** Adds the user to another guild
	 *
	 * Returns a new `GuildMember`
	 */
	async add(guildId: Snowflake, options: AddOptions) {
		return await add(guildId, this.user.id, options)
	}

	/** Removes the member from its guild */
	async remove() {
		return await remove(this.guildId, this.user.id)
	}

	/** Updates attributes of this member */
	async edit(newMember: EditParams) {
		const result = await edit(this.guildId, this.user.id, newMember)
		Object.assign(this, result)
		return result
	}

	/** Updates the voice state of this member */
	async updateVoice(newState: EditVoiceOptions) {
		return await voice.update(this.guildId, this.user.id, newState)
	}

	role = {
		/** Adds a role to this user */
		add: async (roleId: Snowflake) => {
			return await roles.add(this.guildId, this.user.id, roleId)
		},
		/** Removes a role from this user */
		remove: async (roleId: Snowflake) => {
			return await roles.remove(this.guildId, this.user.id, roleId)
		}
	}

	constructor(data: unknown, guildId: Snowflake) {
		Object.assign(this, toCamelCase(data))

		this.guildId = guildId
	}
}

/** Returns a guild member object for the specified user. */
async function get(
	guildId: Snowflake,
	userId: Snowflake
): Promise<GuildMember> {
	return new GuildMember(
		(await request.get(`guilds/${guildId}/members/${userId}`)) as unknown[],
		guildId
	)
}
/** Returns a list of guild member objects that are members of the guild. */
async function list(
	guildId: Snowflake,
	options?: {
		/** max number of members to return (1-1000) */
		limit?: number
		/** the highest user id in the previous page */
		after?: Snowflake
	}
): Promise<GuildMember[]> {
	return (
		(await request.get(`guilds/${guildId}/members`, options)) as unknown[]
	).map((v) => new GuildMember(v, guildId))
}
/** Returns a list of guild member objects whose username or nickname starts with a provided string. */
async function search(
	guildId: Snowflake,
	options: {
		/** Query string to match username(s) and nickname(s) against. */
		query: string
		/** max number of members to return (1-1000) */
		limit?: number
	}
): Promise<GuildMember[]> {
	return (
		(await request.get(
			`guilds/${guildId}/members/search`,
			options
		)) as unknown[]
	).map((v) => new GuildMember(v, guildId))
}
type AddOptions = {
	/** an oauth2 access token granted with the `guilds.join` to the bot's application for the user you want to add to the guild */
	accessToken: string
	/** value to set user's nickname to */
	nick?: string
	/** array of role ids the member is assigned */
	roles?: Snowflake[]
	/** whether the user is muted in voice channels */
	mute?: boolean
	/** whether the user is deafened in voice channels */
	deaf?: boolean
}
/** Adds a user to the guild, provided you have a valid oauth2 access token for the user with the guilds.join scope. */
async function add(
	guildId: Snowflake,
	userId: Snowflake,
	options: AddOptions
): Promise<GuildMember> {
	return new GuildMember(
		await request.put(`guilds/${guildId}/members/${userId}`, options),
		guildId
	)
}
/** Remove a member from a guild */
async function remove(guildId: Snowflake, userId: Snowflake): Promise<void> {
	await request.delete(`guilds/${guildId}/members/${userId}`)
}

type EditParams = {
	/** value to set user's nickname to */
	nick: string
	/** array of role ids the member is assigned */
	roles: Snowflake[]
	/** whether the user is muted in voice channels. Will throw a 400 error if the user is not in a voice channel */
	mute: boolean
	/** whether the user is deafened in voice channels. Will throw a 400 error if the user is not in a voice channel */
	deaf: boolean
	/** id of channel to move user to (if they are connected to voice) */
	channelId: Snowflake
	/** when the user's timeout will expire and the user will be able to communicate in the guild again (up to 28 days in the future), set to null to remove timeout. Will throw a 403 error if the user has the ADMINISTRATOR permission or is the owner of the guild */
	communicationDisabledUntil: string
	/** guild member flags */
	flags: number
}
/** Update attributes of a guild member. */
async function edit(
	guildId: Snowflake,
	userId: Snowflake,
	member: EditParams
): Promise<GuildMember> {
	return new GuildMember(
		await request.patch(`guilds/${guildId}/members/${userId}`, member),
		guildId
	)
}
type EditVoiceOptions = {
	/** the id of the channel the user is currently in */
	channelId: Snowflake
	/** toggles the user's suppress state */
	suppress?: boolean
}
const voice = {
	/** Updates the current user's voice state. */
	async updateMe(
		guildId: Snowflake,
		options: {
			/** the id of the channel the user is currently in */
			channelId?: Snowflake
			/** toggles the user's suppress state */
			suppress?: boolean
			/** sets the user's request to speak */
			requestToSpeakTimestamp?: string | null
		}
	): Promise<void> {
		await request.patch(`guilds/${guildId}/voice-states/@me`, options)
	},
	/** Updates another user's voice state. */
	async update(
		guildId: Snowflake,
		userId: Snowflake,
		options: EditVoiceOptions
	): Promise<void> {
		await request.patch(`guilds/${guildId}/voice-states/${userId}`, options)
	}
}
const roles = {
	/** Adds a role to a guild member.  */
	async add(
		guildId: Snowflake,
		userId: Snowflake,
		roleId: Snowflake
	): Promise<void> {
		await request.put(`guilds/${guildId}/members/${userId}/roles/${roleId}`)
	},
	/** Removes a role to a guild member.  */
	async remove(
		guildId: Snowflake,
		userId: Snowflake,
		roleId: Snowflake
	): Promise<void> {
		await request.delete(`guilds/${guildId}/members/${userId}/roles/${roleId}`)
	}
}
export { get, list, search, add, remove, edit, voice, roles }
export default { get, list, search, add, remove, edit, voice, roles }

//#region
/** Guild Member Object */
type _GuildMember = {
	/** user this guild member represents */
	user?: User
	/** user's guild nickname */
	nick?: string
	/** user's guild avatar hash */
	avatar?: string
	/** array of role object ids */
	roles: string[]
	/** when user joined guild */
	joinedAt: string
	/** when user started boosting guild */
	premiumSince?: string | null
	/** whether user is deafened in voice channels */
	deaf: boolean
	/** whether user is muted in voice channels */
	mute: boolean
	/** guild member flags as bit set */
	flags: number
	/** whether user has passed guild's membership screening requirements */
	pending?: boolean
	/** total permissions of member in channel */
	permissions?: string
	/** when user's timeout will expire */
	communicationDisableUntil?: string | null
}
//#endregion
export type { _GuildMember as GuildMember }
