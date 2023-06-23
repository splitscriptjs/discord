import request from '../utils/request.js'
import {
	Account,
	IntegrationApplication,
	OAuth2Scope,
	Integration as RawIntegration,
	Snowflake,
	User
} from '../types.js'

class Integration {
	id: Snowflake
	name: string
	type: string
	enabled: boolean
	syncing?: boolean
	role_id?: Snowflake
	enable_emoticons?: boolean
	expire_behavior?: 0 | 1
	expire_grace_period?: number
	user?: User
	account: Account
	synced_at?: string
	subscriber_count?: number
	revoked?: boolean
	application?: IntegrationApplication
	scopes?: OAuth2Scope[]

	guild_id: Snowflake

	/** Deletes this integration */
	async delete() {
		return await _delete(this.guild_id, this.id)
	}
	constructor(data: RawIntegration, guild_id: Snowflake) {
		this.id = data.id
		this.name = data.name
		this.type = data.type
		this.enabled = data.enabled
		this.syncing = data.syncing
		this.role_id = data.role_id
		this.enable_emoticons = data.enable_emoticons
		this.expire_behavior = data.expire_behavior
		this.expire_grace_period = data.expire_grace_period
		this.user = data.user
		this.account = data.account
		this.synced_at = data.synced_at
		this.subscriber_count = data.subscriber_count
		this.revoked = data.revoked
		this.application = data.application
		this.scopes = data.scopes

		this.guild_id = guild_id
	}
}

/** Returns a list of integration objects for the guild. */
async function list(guildId: Snowflake): Promise<Integration[]> {
	return (
		(await request.get(
			`guilds/${guildId}/integrations`
		)) as unknown as RawIntegration[]
	).map((integration) => new Integration(integration, guildId))
}
/** Delete the attached integration object for the guild. */
async function _delete(
	guildId: Snowflake,
	integrationId: Snowflake
): Promise<void> {
	return request.delete(
		`guilds/${guildId}/integrations/${integrationId}`
	) as unknown as void
}
export default { list, delete: _delete }
