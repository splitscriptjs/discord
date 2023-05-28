import request from '../utils/request.js'
import { Snowflake, Invite, InviteMetadata } from '../types.js'

/** List invites in a channel */
async function list(
	channel_id: Snowflake
): Promise<(Invite & InviteMetadata)[]> {
	return request.get(`channels/${channel_id}/invites`) as unknown as (Invite &
		InviteMetadata)[]
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
	channel_id: Snowflake,
	invite: InviteCreateParams
): Promise<Invite> {
	return request.post(
		`channels/${channel_id}/invites`,
		invite ?? {}
	) as unknown as Invite
}
type GetParams = {
	with_counts?: boolean
	with_expiration?: boolean
	guild_scheduled_event_id?: boolean
}
/** Return invite object for given code */
async function get(invite_code: string, params: GetParams): Promise<Invite> {
	return request.get(`invites/${invite_code}`, params) as unknown as Invite
}
/** Delete an invite */
async function _delete(invite_code: string): Promise<void> {
	return request.delete(`invites/${invite_code}`) as unknown as void
}
export default { list, create, get, delete: _delete }
