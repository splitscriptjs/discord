import request from '../utils/request.js'
import { Snowflake } from '../types'
import type { User } from './users'

/** Represents a ban */
class Ban<isCreate extends boolean> {
	/** The reason for the ban */
	reason?: isCreate extends true ? never : string | null
	/** The user object that is banned (just contains `id` if this ban is from the `create` function) */
	user: isCreate extends true ? { id: Snowflake } : User
	/** The guild id that the user is banned in */
	guildId: Snowflake
	/** Gets this ban
	 *
	 * Also updates this class instance
	 */
	async get(): Promise<Ban<false>> {
		const rule = await get(this.guildId, this.user.id)
		Object.assign(this, rule)
		return rule
	}
	/** Removes this ban */
	async remove(): Promise<void> {
		return await remove(this.guildId, this.user.id)
	}
	constructor(
		ban: {
			reason?: isCreate extends true ? never : string | null
			user: isCreate extends true ? { id: Snowflake } : User
		},
		guildId: Snowflake
	) {
		this.guildId = guildId
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
	const bans = (await request.get(`guilds/${guildId}/bans`, params)) as _Ban[]
	return bans.map((ban) => new Ban(ban, guildId))
}
/** Returns a ban object for the given user or errors if the ban cannot be found */
async function get(guildId: Snowflake, userId: Snowflake): Promise<Ban<false>> {
	return (await request.get(`guilds/${guildId}/bans/${userId}`)) as Ban<false>
}
/** Create a guild ban, and optionally delete previous messages sent by the banned user */
async function create(
	guildId: Snowflake,
	userId: Snowflake,
	options?: {
		/** number of days to delete messages for (0-7) - **deprecated** */
		deleteMessageDays?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
		/** number of seconds to delete messages for, between 0 and 604800 (7 days) */
		deleteMessageSeconds?: number
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
	await request.delete(`guilds/${guildId}/bans/${userId}`)
}

type _Ban = {
	reason: string | null
	/** the banned user */
	user: User
}
/** Used to manage bans */
export { list, get, create, remove }
/** Used to manage bans */
export default { list, get, create, remove }
