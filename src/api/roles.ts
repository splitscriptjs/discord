import request from '../utils/request.js'
import { Snowflake } from '../types'
import toCamelCase from '../utils/toCamelCase.js'

class Role implements _Role {
	/** role id */
	id!: Snowflake
	/** role name */
	name!: string
	/** integer representation of hex color code */
	color!: number
	/** if role is pinned in user listing */
	hoist!: boolean
	/** role icon hash */
	icon?: string
	/** role unicode emoji */
	unicodeEmoji?: string | null
	/** position of role */
	position!: number
	/** permission bit set */
	permissions!: string
	/** whether role is managed by an integration */
	managed!: boolean
	/** whether role is mentionable */
	mentionable!: boolean
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
	async delete(): Promise<void> {
		return await _delete(this.guildId, this.id)
	}

	constructor(role: unknown, guildId: Snowflake) {
		Object.assign(this, toCamelCase(role))
		this.guildId = guildId
	}
}

/** Returns a list of role objects for the guild. */
async function list(guildId: Snowflake): Promise<Role[]> {
	return ((await request.get(`guilds/${guildId}/roles`)) as unknown[]).map(
		(r) => new Role(r, guildId)
	)
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
	return new Role(await request.post(`guilds/${guildId}/roles`, role), guildId)
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
		await request.patch(`guilds/${guildId}/roles/${roleId}`, role),
		guildId
	)
}
/** Delete a role. */
async function _delete(guildId: Snowflake, roleId: Snowflake): Promise<void> {
	await request.delete(`guilds/${guildId}/roles/${roleId}`)
}

/** Used to manage guild roles */
export { list, create, edit, _delete as delete }
/** Used to manage guild roles */
export default { list, create, edit, delete: _delete }

//#region
type _Role = {
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
	unicodeEmoji?: string | null
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
}
type RoleTags = {
	/** id of the bot role belongs to */
	botId?: Snowflake
	/** id of the integration role belongs to */
	integrationId?: Snowflake
	/** whether this is guild's booster role
	 *
	 * `null` if "true", not present if "false" */
	premiumSubscriber?: null
	/** id of this role's subscription sku and listing */
	subscriptionListingId?: Snowflake
	/** whether role is available for purchase
	 *
	 * `null` if "true", not present if "false" */
	availableForPurchase?: null
	/** whether role is guild's linked role
	 *
	 * `null` if "true", not present if "false" */
	guildConnections?: null
}
//#endregion
export type { _Role as Role, RoleTags }
