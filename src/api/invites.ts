import request from '../utils/request.js'
import toCamelCase from '../utils/toCamelCase.js'

import type { Snowflake, Application } from '../types'
import type { Channel } from './channels'
import type { User } from './users.js'
import type { Guild } from './guilds'
import type { GuildMember } from './members'
import type { ScheduledEvent } from './scheduledEvents'

type NeverIfFalse<B extends boolean, T> = B extends true ? T : never

class Invite<hasMetadata extends boolean> implements _Invite {
	code!: string
	guild?: Guild
	channel: Channel | null | undefined
	inviter?: User
	targetType?: TargetType
	targetUser?: User
	targetApplication?: Partial<Application>
	approximatePresenceCount?: number
	approximateMemberCount?: number
	expiresAt?: string | null
	stageInstance?: InviteStageInstance
	guildScheduledEvent?: ScheduledEvent

	/** number of times this invite has been used */
	uses?: NeverIfFalse<hasMetadata, number>
	/** max number of times this invite can be used */
	maxUses?: NeverIfFalse<hasMetadata, number>
	/** duration (in seconds) after which the invite expires */
	maxAge?: NeverIfFalse<hasMetadata, number>
	/** whether this invite only grants temporary membership */
	temporary?: NeverIfFalse<hasMetadata, boolean>
	/** when this invite was created */
	createdAt?: NeverIfFalse<hasMetadata, string>

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

	constructor(data: unknown) {
		Object.assign(this, toCamelCase(data))
	}
}

/** List invites in a channel */
async function list(channelId: Snowflake): Promise<Invite<true>[]> {
	return (
		(await request.get(`channels/${channelId}/invites`)) as unknown[]
	).map((v) => new Invite(v))
}

type InviteCreateParams = Partial<{
	/** duration of invite in seconds before expiry, or 0 for never. between 0 and 604800 (7 days) */
	maxAge: number
	/** max number of uses or 0 for unlimited. between 0 and 100 */
	maxUses: number
	/** whether this invite only grants temporary membership */
	temporary: boolean
	/** if true, don't try to reuse a similar invite (useful for creating many unique one time use invites) */
	unique: boolean
	/** the type of target for this voice channel invite */
	targetType: TargetType
	/** the id of the user whose stream to display for this invite, required if `targetType` is 1, the user must be streaming in the channel */
	targetUserId: Snowflake
	/** the id of the embedded application to open for this invite, required if `targetType` is 2, the application must have the `EMBEDDED` flag */
	targetApplicationId: Snowflake
}>
/** Create invite in a channel */
async function create(
	channelId: Snowflake,
	invite?: InviteCreateParams
): Promise<Invite<false>> {
	return new Invite(
		await request.post(`channels/${channelId}/invites`, invite ?? {})
	)
}
type GetParams = {
	withCounts?: boolean
	withExpiration?: boolean
	guildScheduledEventId?: boolean
}
/** Return invite object for given code */
async function get(
	inviteCode: string,
	params?: GetParams
): Promise<Invite<false>> {
	return new Invite(await request.get(`invites/${inviteCode}`, params))
}
/** Delete an invite */
async function _delete(inviteCode: string): Promise<void> {
	await request.delete(`invites/${inviteCode}`)
}

export enum TargetType {
	Stream = 1,
	EmbeddedApplication = 2
}

export { list, create, get, _delete as delete }
export default { list, create, get, delete: _delete }

//#region
/** Invite Object */
type _Invite = {
	/** invite code (unique id) */
	code: string
	/** guild this invite is for */
	guild?: Guild
	/** channel this invite is for */
	channel: Channel | null | undefined
	/** user who created invite */
	inviter?: User
	/** type of target for this voice channel invite */
	targetType?: TargetType
	/** user whose stream to display for this voice channel stream invite */
	targetUser?: User
	/** embedded application to open for this voice channel embedded application invite */
	targetApplication?: Partial<Application>
	/** approx count of online members */
	approximatePresenceCount?: number
	/** approx count of total members */
	approximateMemberCount?: number
	/** expiration date of this invite */
	expiresAt?: string | null
	/** **deprecated** - stage instance data if there is a public Stage instance in the Stage channel this invite is for */
	stageInstance?: InviteStageInstance
	/** guild scheduled event data */
	guildScheduledEvent?: ScheduledEvent
}
type InviteStageInstance = {
	/** members speaking in Stage */
	members: GuildMember[]
	/** number of users in Stage */
	participantCount: number
	/** number of users speaking in Stage */
	speakerCount: number
	/** topic of Stage instance */
	topic: string
}
//#endregion
export type { _Invite as Invite }
