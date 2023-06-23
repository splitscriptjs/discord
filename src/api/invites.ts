import request from '../utils/request.js'
import { Snowflake, Invite as RawInvite } from '../types.js'
import { Guild } from '../types.js'
import { Channel } from '../types.js'
import { User } from '../types.js'
import { InviteStageInstance } from '../types.js'
import { Application } from '../types.js'
import { GuildScheduledEvent } from '../types.js'

type NeverIfFalse<B extends boolean, T> = B extends true ? T : never

class Invite<hasMetadata extends boolean> implements RawInvite {
	code: string
	guild?: Guild
	channel: Channel | null | undefined
	inviter?: User
	target_type?: number
	target_user?: User
	target_application?: Partial<Application>
	approximate_presence_count?: number
	approximate_member_count?: number
	expires_at?: string | null
	stage_instance?: InviteStageInstance
	guild_scheduled_event?: GuildScheduledEvent

	/** number of times this invite has been used */
	uses?: NeverIfFalse<hasMetadata, number>
	/** max number of times this invite can be used */
	max_uses?: NeverIfFalse<hasMetadata, number>
	/** duration (in seconds) after which the invite expires */
	max_age?: NeverIfFalse<hasMetadata, number>
	/** whether this invite only grants temporary membership */
	temporary?: NeverIfFalse<hasMetadata, number>
	/** when this invite was created */
	created_at?: NeverIfFalse<hasMetadata, number>

	/** Gets this invite
	 *
	 * Also updates this class instance
	 */
	async get(params?: GetParams) {
		const result = await get(this.code, params)
		Object.assign(this, result)
		return result
	}
	/** Deletes this invite */
	async delete() {
		return await _delete(this.code)
	}

	constructor(
		data: RawInvite & {
			uses?: NeverIfFalse<hasMetadata, number>
			max_uses?: NeverIfFalse<hasMetadata, number>
			max_age?: NeverIfFalse<hasMetadata, number>
			temporary?: NeverIfFalse<hasMetadata, number>
			created_at?: NeverIfFalse<hasMetadata, number>
		}
	) {
		this.code = data.code
		this.guild = data.guild
		this.channel = data.channel
		this.inviter = data.inviter
		this.target_type = data.target_type
		this.target_user = data.target_user
		this.target_application = data.target_application
		this.approximate_presence_count = data.approximate_presence_count
		this.approximate_member_count = data.approximate_member_count
		this.expires_at = data.expires_at
		this.stage_instance = data.stage_instance
		this.guild_scheduled_event = data.guild_scheduled_event

		this.uses = data.uses
		this.max_uses = data.max_uses
		this.max_age = data.max_age
		this.temporary = data.temporary
		this.created_at = data.created_at
	}
}

/** List invites in a channel */
async function list(channelId: Snowflake): Promise<Invite<true>[]> {
	return (
		(await request.get(
			`channels/${channelId}/invites`
		)) as unknown as RawInvite[]
	).map((v) => new Invite(v))
}

type InviteCreateParams = Partial<{
	/** duration of invite in seconds before expiry, or 0 for never. between 0 and 604800 (7 days) */
	max_age: number
	/** max number of uses or 0 for unlimited. between 0 and 100 */
	max_uses: number
	/** whether this invite only grants temporary membership */
	temporary: boolean
	/** if true, don't try to reuse a similar invite (useful for creating many unique one time use invites) */
	unique: boolean
	/** the type of target for this voice channel invite */
	target_type: 1 | 2
	/** the id of the user whose stream to display for this invite, required if `target_type` is 1, the user must be streaming in the channel */
	target_user_id: Snowflake
	/** the id of the embedded application to open for this invite, required if `target_type` is 2, the application must have the `EMBEDDED` flag */
	target_application_id: Snowflake
}>
/** Create invite in a channel */
async function create(
	channelId: Snowflake,
	invite?: InviteCreateParams
): Promise<Invite<false>> {
	return new Invite(
		(await request.post(
			`channels/${channelId}/invites`,
			invite ?? {}
		)) as unknown as RawInvite
	)
}
type GetParams = {
	with_counts?: boolean
	with_expiration?: boolean
	guild_scheduled_event_id?: boolean
}
/** Return invite object for given code */
async function get(
	invite_code: string,
	params?: GetParams
): Promise<Invite<false>> {
	return new Invite(
		(await request.get(
			`invites/${invite_code}`,
			params
		)) as unknown as RawInvite
	)
}
/** Delete an invite */
async function _delete(invite_code: string): Promise<void> {
	return request.delete(`invites/${invite_code}`) as unknown as void
}
export default { list, create, get, delete: _delete }
