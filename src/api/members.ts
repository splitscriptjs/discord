import request from '../utils/request.js'
import { GuildMember, Snowflake } from '../types'

/** Returns a guild member object for the specified user. */
async function get(
	guild_id: Snowflake,
	user_id: Snowflake
): Promise<GuildMember> {
	return request.get(
		`guilds/${guild_id}/members/${user_id}`
	) as unknown as GuildMember
}
/** Returns a list of guild member objects that are members of the guild. */
async function list(
	guild_id: Snowflake,
	options?: {
		/** max number of members to return (1-1000) */
		limit?: number
		/** the highest user id in the previous page */
		after?: Snowflake
	}
): Promise<GuildMember[]> {
	return request.get(
		`guilds/${guild_id}/members`,
		options
	) as unknown as GuildMember[]
}
/** Returns a list of guild member objects whose username or nickname starts with a provided string. */
async function search(
	guild_id: Snowflake,
	options: {
		/** Query string to match username(s) and nickname(s) against. */
		query: string
		/** max number of members to return (1-1000) */
		limit?: number
	}
): Promise<GuildMember[]> {
	return request.get(
		`guilds/${guild_id}/members/search`,
		options
	) as unknown as GuildMember[]
}
/** Adds a user to the guild, provided you have a valid oauth2 access token for the user with the guilds.join scope. */
async function add(
	guild_id: Snowflake,
	user_id: Snowflake,
	options: {
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
): Promise<GuildMember> {
	return request.put(
		`guilds/${guild_id}/members/${user_id}`,
		options
	) as unknown as GuildMember
}
/** Remove a member from a guild */
async function remove(guild_id: Snowflake, user_id: Snowflake): Promise<void> {
	return request.delete(
		`guilds/${guild_id}/members/${user_id}`
	) as unknown as void
}
/** Modify attributes of a guild member. */
async function modify(
	guild_id: Snowflake,
	user_id: Snowflake,
	member: {
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
): Promise<GuildMember> {
	return request.patch(
		`guilds/${guild_id}/members/${user_id}`,
		member
	) as unknown as GuildMember
}
const voice = {
	/** Updates the current user's voice state. */
	async modifyMe(
		guild_id: Snowflake,
		options?: {
			/** the id of the channel the user is currently in */
			channel_id?: Snowflake
			/** toggles the user's suppress state */
			suppress?: boolean
			/** sets the user's request to speak */
			request_to_speak_timestamp?: string | null
		}
	): Promise<void> {
		return request.patch(
			`guilds/${guild_id}/voice-states/@me`,
			options
		) as unknown as void
	},
	/** Updates another user's voice state. */
	async modify(
		guild_id: Snowflake,
		user_id: Snowflake,
		options?: {
			/** the id of the channel the user is currently in */
			channel_id?: Snowflake
			/** toggles the user's suppress state */
			suppress?: boolean
			/** sets the user's request to speak */
			request_to_speak_timestamp?: string | null
		}
	): Promise<void> {
		return request.patch(
			`guilds/${guild_id}/voice-states/${user_id}`,
			options
		) as unknown as void
	}
}
const roles = {
	/** Adds a role to a guild member.  */
	async add(
		guild_id: Snowflake,
		user_id: Snowflake,
		role_id: Snowflake
	): Promise<void> {
		return request.put(
			`guilds/${guild_id}/members/${user_id}/roles/${role_id}`
		) as unknown as void
	},
	/** Removes a role to a guild member.  */
	async remove(
		guild_id: Snowflake,
		user_id: Snowflake,
		role_id: Snowflake
	): Promise<void> {
		return request.delete(
			`guilds/${guild_id}/members/${user_id}/roles/${role_id}`
		) as unknown as void
	}
}
export default { get, list, search, add, remove, modify, voice, roles }
