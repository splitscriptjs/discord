import request from '../utils/request.js'
import { Snowflake } from '../types.js'
import toCamelCase from '../utils/toCamelCase.js'
import type { User } from './users'

class Integration {
	id!: Snowflake
	name!: string
	type!: string
	enabled!: boolean
	syncing?: boolean
	roleId?: Snowflake
	enableEmoticons?: boolean
	expireBehavior?: ExpireBehaviour
	expireGracePeriod?: number
	user?: User
	account!: Account
	syncedAt?: string
	subscriberCount?: number
	revoked?: boolean
	application?: IntegrationApplication
	scopes?: OAuth2Scope[]

	guildId: Snowflake

	/** Deletes this integration */
	async delete(): Promise<void> {
		return await _delete(this.guildId, this.id)
	}
	constructor(data: unknown, guildId: Snowflake) {
		Object.assign(this, toCamelCase(data))

		this.guildId = guildId
	}
}

/** Returns a list of integration objects for the guild. */
async function list(guildId: Snowflake): Promise<Integration[]> {
	return (
		(await request.get(`guilds/${guildId}/integrations`)) as unknown[]
	).map((integration) => new Integration(integration, guildId))
}
/** Delete the attached integration object for the guild. */
async function _delete(
	guildId: Snowflake,
	integrationId: Snowflake
): Promise<void> {
	await request.delete(`guilds/${guildId}/integrations/${integrationId}`)
}
export enum ExpireBehaviour {
	RemoveRole = 0,
	Kick = 1
}
type _Integration = {
	id: Snowflake
	name: string
	type: string
	enabled: boolean
	syncing?: boolean
	roleId?: Snowflake
	enableEmoticons?: boolean
	expireBehavior?: ExpireBehaviour
	expireGracePeriod?: number
	user?: User
	account: Account
	syncedAt?: string
	subscriberCount?: number
	revoked?: boolean
	application?: IntegrationApplication
	scopes?: OAuth2Scope[]
}
type IntegrationApplication = {
	/** the id of the app */
	id: Snowflake
	/** the name of the app */
	name: string
	/** the icon hash of the app */
	icon: string | null
	/** the description of the app */
	description: string
	/** the bot associated with this application */
	bot?: User
}
type Account = {
	/** id of the account */
	id: string
	/** name of the account */
	name: string
}
type OAuth2Scope =
	//#region
	| 'activities.read'
	| 'activities.write'
	| 'applications.builds.read'
	| 'applications.builds.upload'
	| 'applications.commands'
	| 'applications.commands.update'
	| 'applications.commands.permissions.update'
	| 'applications.entitlements'
	| 'applications.store.update'
	| 'bot'
	| 'connections'
	| 'dm_channels.read'
	| 'email'
	| 'gdm.join'
	| 'guilds'
	| 'guilds.join'
	| 'guilds.members.read'
	| 'identify'
	| 'messages.read'
	| 'relationships.read'
	| 'role_connections.write'
	| 'rpc'
	| 'rpc.activities.write'
	| 'rpc.notifications.read'
	| 'rpc.voice.read'
	| 'rpc.voice.write'
	| 'voice'
	| 'webhook.incoming'
//#endregion
export type { _Integration as Integration }
/** Used to manage integrations */
export { list, _delete as Delete }
/** Used to manage integrations */
export default { list, delete: _delete }
