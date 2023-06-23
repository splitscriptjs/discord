import request from '../utils/request.js'
import { Snowflake, Role as RawRole, RoleTags } from '../types'

class Role implements RawRole {
	/** role id */
	id: Snowflake
	/** role name */
	name: string
	/** integer representation of hex color code */
	color: number
	/** if role is pinned in user listing */
	hoist: boolean
	/** role icon hash */
	icon?: string
	/** role unicode emoji */
	unicode_emoji?: string | null
	/** position of role */
	position: number
	/** permission bit set */
	permissions: string
	/** whether role is managed by an integration */
	managed: boolean
	/** whether role is mentionable */
	mentionable: boolean
	/** tags role has */
	tags?: RoleTags

	guildId: Snowflake

	/** Edits this role
	 *
	 * Also updates this class instance
	 */
	async edit(role: EditParams): Promise<Role> {
		const result = await edit(this.guildId, this.id, role)
		Object.assign(this, result)
		return result
	}

	/** Deletes this role */
	async delete() {
		return await _delete(this.guildId, this.id)
	}

	constructor(role: RawRole, guildId: Snowflake) {
		this.id = role.id
		this.name = role.name
		this.color = role.color
		this.hoist = role.hoist
		this.icon = role.icon
		this.unicode_emoji = role.unicode_emoji
		this.position = role.position
		this.permissions = role.permissions
		this.managed = role.managed
		this.mentionable = role.mentionable
		this.tags = role.tags

		this.guildId = guildId
	}
}

/** Returns a list of role objects for the guild. */
async function list(guildId: Snowflake): Promise<Role[]> {
	return (
		(await request.get(`guilds/${guildId}/roles`)) as unknown as RawRole[]
	).map((r) => new Role(r, guildId))
}
/** Create a new role for the guild. */
async function create(
	guildId: Snowflake,
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
	return new Role(
		(await request.post(`guilds/${guildId}/roles`, role)) as unknown as RawRole,
		guildId
	)
}

type EditParams = {
	/** name of the role, max 100 characters */
	name: string | null
	/** bitwise value of the enabled/disabled permissions */
	permissions: string | null
}

/** Edit a role. */
async function edit(
	guildId: Snowflake,
	roleId: Snowflake,
	role: EditParams
): Promise<Role> {
	return new Role(
		(await request.patch(
			`guilds/${guildId}/roles/${roleId}`,
			role
		)) as unknown as RawRole,
		guildId
	)
}
/** Delete a role.  */
async function _delete(guildId: Snowflake, roleId: Snowflake): Promise<void> {
	return request.delete(`guilds/${guildId}/roles/${roleId}`) as unknown as void
}

export default { list, create, edit, delete: _delete }
