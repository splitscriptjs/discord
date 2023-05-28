import request from '../utils/request.js'
import { Integration, Snowflake } from '../types.js'

/** Returns a list of integration objects for the guild. */
async function list(guild_id: Snowflake): Promise<Integration[]> {
	return request.get(
		`guilds/${guild_id}/integrations`
	) as unknown as Integration[]
}
/** Delete the attached integration object for the guild. */
async function _delete(
	guild_id: Snowflake,
	integration_id: Snowflake
): Promise<void> {
	return request.delete(
		`guilds/${guild_id}/integrations/${integration_id}`
	) as unknown as void
}
export default { list, delete: _delete }
