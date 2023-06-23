import request from '../utils/request.js'
import { Snowflake, Ban as BanObject, User } from '../types'

/** Represents a ban */
class Ban<isCreate extends boolean> {
	/** The reason for the ban */
	reason?: isCreate extends true ? never : string | null
	/** The user object that is banned (just contains `id` if this ban is from the `create` function) */
	user: isCreate extends true ? { id: Snowflake } : User
	/** The guild id that the user is banned in */
	guild_id: Snowflake
	/** Gets this ban
	 *
	 * Also updates this class instance
	 */
	async get() {
		const rule = await get(this.guild_id, this.user.id)
		Object.assign(this, rule)
		return rule
	}
	/** Removes this ban */
	async remove() {
		return await remove(this.guild_id, this.user.id)
	}
	constructor(
		ban: {
			reason?: isCreate extends true ? never : string | null
			user: isCreate extends true ? { id: Snowflake } : User
		},
		guild_id: Snowflake
	) {
		this.guild_id = guild_id
		this.reason = ban.reason
		this.user = ban.user
	}
}

/** Returns a list of ban objects for the users banned from this guild */
async function list(
	guildId: Snowflake,
	params?: {
		/** number of users to return (up to maximum 1000) */
		limit?: number
		/** consider only users before given user id */
		before?: Snowflake
		/** consider only users after given user id */
		after?: Snowflake
	}
): Promise<Ban<false>[]> {
	const bans = (await request.get(
		`guilds/${guildId}/bans`,
		params
	)) as unknown as BanObject[]
	return bans.map((ban) => new Ban(ban, guildId))
}
/** Returns a ban object for the given user or errors if the ban cannot be found */
async function get(guildId: Snowflake, userId: Snowflake): Promise<Ban<false>> {
	return request.get(
		`guilds/${guildId}/bans/${userId}`
	) as unknown as Ban<false>
}
/** Create a guild ban, and optionally delete previous messages sent by the banned user */
async function create(
	guildId: Snowflake,
	userId: Snowflake,
	options?: {
		/** number of days to delete messages for (0-7) - **deprecated** */
		delete_message_days?: number
		/** number of seconds to delete messages for, between 0 and 604800 (7 days) */
		delete_message_seconds?: number
	}
): Promise<Ban<true>> {
	await request.put(`guilds/${guildId}/bans/${userId}`, options ?? {})
	return new Ban(
		{
			user: {
				id: userId
			}
		},
		guildId
	)
}
/** Remove the ban for a user */
async function remove(guildId: Snowflake, userId: Snowflake): Promise<void> {
	return request.delete(`guilds/${guildId}/bans/${userId}`) as unknown as void
}

export default { list, get, create, remove }
