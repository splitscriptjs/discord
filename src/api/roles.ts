import request from '../utils/request.js'
import { Snowflake, Role } from '../types'

/** Returns a list of role objects for the guild. */
async function list(guild_id: Snowflake): Promise<Role[]> {
	return request.get(`guilds/${guild_id}/roles`) as unknown as Role[]
}
/** Create a new role for the guild. */
async function create(
	guild_id: Snowflake,
	role: {
		/** name of the role, max 100 characters */
		name?: string
		/** bitwise value of the enabled/disabled permissions */
		permissions?: string
		/** RGB color value */
		color?: number
		/** whether the role should be displayed separately in the sidebar */
		hoist?: boolean
		/** the role's icon image (if the guild has the `ROLE_ICONS` feature) */
		icon?: string | null
		/** the role's unicode emoji as a standard emoji (if the guild has the `ROLE_ICONS` feature) */
		unicode_emoji?: string | null
		/** whether the role should be mentionable */
		mentionable?: boolean
	}
): Promise<Role> {
	return request.post(`guilds/${guild_id}/roles`, role) as unknown as Role
}
/** Modify a guild role. */
async function modify(
	guild_id: Snowflake,
	role_id: Snowflake,
	role: {
		name: string | null
		permissions: string | null
	}
): Promise<Role> {
	return request.patch(
		`guilds/${guild_id}/roles/${role_id}`,
		role
	) as unknown as Role
}
/** Delete a guild role.  */
async function _delete(guild_id: Snowflake, role_id: Snowflake): Promise<void> {
	return request.delete(
		`guilds/${guild_id}/roles/${role_id}`
	) as unknown as void
}

export default { list, create, modify, delete: _delete }
