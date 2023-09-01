import request from '../utils/request.js'
import {
	Account,
	IntegrationApplication,
	OAuth2Scope,
	Integration as RawIntegration,
	Snowflake,
	User
} from '../types.js'
import toCamelCase from '../utils/toCamelCase.js'

class Integration {
	id!: Snowflake
	name!: string
	type!: string
	enabled!: boolean
	syncing?: boolean
	roleId?: Snowflake
	enableEmoticons?: boolean
	expireBehavior?: 0 | 1
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
	async delete() {
		return await _delete(this.guildId, this.id)
	}
	constructor(data: RawIntegration, guildId: Snowflake) {
		Object.assign(this, toCamelCase(data))

		this.guildId = guildId
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
