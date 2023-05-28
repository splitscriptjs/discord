import request from '../utils/request.js'
import { Snowflake, Ban } from '../types'

/** Returns a list of ban objects for the users banned from this guild. */
async function list(
	guild_id: Snowflake,
	params: {
		/** number of users to return (up to maximum 1000) */
		limit?: number
		/** consider only users before given user id */
		before?: Snowflake
		/** consider only users after given user id */
		after?: Snowflake
	}
): Promise<Ban> {
	return request.get(`guilds/${guild_id}/bans`, params) as unknown as Ban
}
/** Returns a ban object for the given user or errors if the ban cannot be found. */
async function get(guild_id: Snowflake, user_id: Snowflake): Promise<Ban> {
	return request.get(`guilds/${guild_id}/bans/${user_id}`) as unknown as Ban
}
/** Create a guild ban, and optionally delete previous messages sent by the banned user. */
async function create(
	guild_id: Snowflake,
	user_id: Snowflake,
	options?: {
		/** number of days to delete messages for (0-7) - **deprecated** */
		delete_message_days?: number
		/** number of seconds to delete messages for, between 0 and 604800 (7 days) */
		delete_message_seconds?: number
	}
): Promise<void> {
	return request.post(
		`guilds/${guild_id}/bans/${user_id}`,
		options
	) as unknown as void
}
/** Remove the ban for a user */
async function remove(guild_id: Snowflake, user_id: Snowflake): Promise<void> {
	return request.delete(`guilds/${guild_id}/bans/${user_id}`) as unknown as void
}
export default { list, get, create, remove }
