import request from '../utils/request.js'
import { GuildMember as RawMember, Snowflake } from '../types'
import { User } from '../types'

class GuildMember implements RawMember {
	/** user this guild member represents */
	user: User
	/** user's guild nickname */
	nick?: string
	/** user's guild avatar hash */
	avatar?: string
	/** array of role object ids */
	roles: string[]
	/** when user joined guild */
	joined_at: string
	/** when user started boosting guild */
	premium_since?: string | null
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
	communication_disable_until?: string | null

	guild_id: Snowflake

	/** Gets this member
	 *
	 * Also updates this class instance
	 */
	async get() {
		const result = await get(this.guild_id, this.user.id)
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
		return await remove(this.guild_id, this.user.id)
	}

	/** Updates attributes of this member */
	async edit(newMember: EditParams) {
		const result = await edit(this.guild_id, this.user.id, newMember)
		Object.assign(this, result)
		return result
	}

	/** Updates the voice state of this member */
	async updateVoice(newState: EditVoiceOptions) {
		return await voice.update(this.guild_id, this.user.id, newState)
	}

	role = {
		/** Adds a role to this user */
		add: async (roleId: Snowflake) => {
			return await roles.add(this.guild_id, this.user.id, roleId)
		},
		/** Removes a role from this user */
		remove: async (roleId: Snowflake) => {
			return await roles.remove(this.guild_id, this.user.id, roleId)
		}
	}

	constructor(data: RawMember & { user: User }, guild_id: Snowflake) {
		this.user = data.user
		this.nick = data.nick
		this.avatar = data.avatar
		this.roles = data.roles
		this.joined_at = data.joined_at
		this.premium_since = data.premium_since
		this.deaf = data.deaf
		this.mute = data.mute
		this.flags = data.flags
		this.pending = data.pending
		this.permissions = data.permissions
		this.communication_disable_until = data.communication_disable_until

		this.guild_id = guild_id
	}
}

/** Returns a guild member object for the specified user. */
async function get(
	guildId: Snowflake,
	userId: Snowflake
): Promise<GuildMember> {
	return new GuildMember(
		(await request.get(
			`guilds/${guildId}/members/${userId}`
		)) as unknown as RawMember & { user: User },
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
		(await request.get(
			`guilds/${guildId}/members`,
			options
		)) as unknown as (RawMember & { user: User })[]
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
		)) as unknown as (RawMember & { user: User })[]
	).map((v) => new GuildMember(v, guildId))
}
type AddOptions = {
	/** an oauth2 access token granted with the `guilds.join` to the bot's application for the user you want to add to the guild */
	access_token: string
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
		(await request.put(
			`guilds/${guildId}/members/${userId}`,
			options
		)) as unknown as RawMember & { user: User },
		guildId
	)
}
/** Remove a member from a guild */
async function remove(guildId: Snowflake, userId: Snowflake): Promise<void> {
	return (await request.delete(
		`guilds/${guildId}/members/${userId}`
	)) as unknown as void
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
	channel_id: Snowflake
	/** when the user's timeout will expire and the user will be able to communicate in the guild again (up to 28 days in the future), set to null to remove timeout. Will throw a 403 error if the user has the ADMINISTRATOR permission or is the owner of the guild */
	communication_disabled_until: string
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
		(await request.patch(
			`guilds/${guildId}/members/${userId}`,
			member
		)) as unknown as GuildMember,
		guildId
	)
}
type EditVoiceOptions = {
	/** the id of the channel the user is currently in */
	channel_id: Snowflake
	/** toggles the user's suppress state */
	suppress?: boolean
}
const voice = {
	/** Updates the current user's voice state. */
	async updateMe(
		guildId: Snowflake,
		options: {
			/** the id of the channel the user is currently in */
			channel_id?: Snowflake
			/** toggles the user's suppress state */
			suppress?: boolean
			/** sets the user's request to speak */
			request_to_speak_timestamp?: string | null
		}
	): Promise<void> {
		return request.patch(
			`guilds/${guildId}/voice-states/@me`,
			options
		) as unknown as void
	},
	/** Updates another user's voice state. */
	async update(
		guildId: Snowflake,
		userId: Snowflake,
		options: EditVoiceOptions
	): Promise<void> {
		return request.patch(
			`guilds/${guildId}/voice-states/${userId}`,
			options
		) as unknown as void
	}
}
const roles = {
	/** Adds a role to a guild member.  */
	async add(
		guildId: Snowflake,
		userId: Snowflake,
		roleId: Snowflake
	): Promise<void> {
		return request.put(
			`guilds/${guildId}/members/${userId}/roles/${roleId}`
		) as unknown as void
	},
	/** Removes a role to a guild member.  */
	async remove(
		guildId: Snowflake,
		userId: Snowflake,
		roleId: Snowflake
	): Promise<void> {
		return request.delete(
			`guilds/${guildId}/members/${userId}/roles/${roleId}`
		) as unknown as void
	}
}
export default { get, list, search, add, remove, edit, voice, roles }
