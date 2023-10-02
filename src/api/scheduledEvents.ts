import request from '../utils/request.js'
import type { Snowflake } from '../types'
import type { User } from './users'
import toCamelCase from '../utils/toCamelCase.js'
import { GuildMember } from './members.js'

class ScheduledEvent {
	//#region
	id!: Snowflake
	guildId!: Snowflake
	channelId!: Snowflake | null
	creatorId?: Snowflake | null
	name!: string
	description?: string | null
	scheduledStartTime!: string
	scheduledEndTime!: string | null
	privacyLevel!: PrivacyLevel
	status!: EventStatus
	entityType!: EntityType
	entityId!: Snowflake | null
	entityMetadata: EntityMetadata | null | undefined
	creator?: User
	userCount?: number
	image?: string
	//#endregion

	/** Gets this scheduled event
	 *
	 * Also updates this class instance
	 */
	async get(withUserCount?: boolean): Promise<ScheduledEvent> {
		const result = await get(this.guildId, this.id, withUserCount)
		Object.assign(this, result)
		return result
	}

	/** Gets a list of users subscribed to this scheduled event */
	async getUsers(options?: GetUserOptions) {
		return await getUsers(this.guildId, this.id, options)
	}

	/** Updates this scheduled event
	 *
	 * Also updates this class instance
	 */
	async edit(scheduledEvent: EditParams): Promise<ScheduledEvent> {
		const result = await edit(this.guildId, this.id, scheduledEvent)
		Object.assign(this, result)
		return result
	}

	/** Deletes this scheduled event */
	async delete() {
		return await _delete(this.guildId, this.id)
	}

	constructor(data: unknown) {
		Object.assign(this, toCamelCase(data))
	}
}

/** Returns a list of scheduled events for the given guild. */
async function list(
	guildId: Snowflake,
	withUserCount?: boolean
): Promise<ScheduledEvent[]> {
	return (
		(await request.get(`guilds/${guildId}/scheduled-events`, {
			withUserCount
		})) as unknown[]
	).map((v) => new ScheduledEvent(v))
}
/** Create a scheduled event in the guild */
async function create(
	guildId: Snowflake,
	scheduledEvent: {
		/** the channel id of the scheduled event. */
		channelId?: Snowflake
		/** the entity metadata of the scheduled event */
		entityMetadata?: EntityMetadata
		/** the name of the scheduled event */
		name: string
		/** the privacy level of the scheduled event */
		privacyLevel: PrivacyLevel
		/** the time to schedule the scheduled event */
		scheduledStartTime: string
		/** the time when the scheduled event is scheduled to end */
		scheduledEndTime?: string
		/** the description of the scheduled event */
		description?: string
		/** the entity type of the scheduled event */
		entityType: EntityType
		/** the cover image of the scheduled event */
		image?: string
	} & (
		| {
				entityType: EntityType.External
				entityMetadata: EntityMetadata
				scheduledEndTime: string
		  }
		| {
				entityType: EntityType.StageInstance | EntityType.Voice
				channelId: Snowflake
		  }
	)
): Promise<ScheduledEvent> {
	return new ScheduledEvent(
		await request.post(`guilds/${guildId}/scheduled-events`, scheduledEvent)
	)
}
/** Get a scheduled event. */
async function get(
	guildId: Snowflake,
	scheduledEventId: Snowflake,
	withUserCount?: boolean
): Promise<ScheduledEvent> {
	return new ScheduledEvent(
		await request.get(
			`guilds/${guildId}/scheduled-events/${scheduledEventId}`,
			{
				withUserCount
			}
		)
	)
}
type EditParams = {
	/** the channel id of the scheduled event, set to `null` if changing entity type to `EXTERNAL` */
	channelId?: Snowflake | null
	/** the entity metadata of the scheduled event */
	entityMetadata?: EntityMetadata | null
	/** the name of the scheduled event */
	name?: string
	/** the privacy level of the scheduled event */
	privacyLevel?: PrivacyLevel
	/** the time to schedule the scheduled event */
	scheduledStartTime?: string
	/** the time when the scheduled event is scheduled to end */
	scheduledEndTime?: string
	/** the description of the scheduled event */
	description?: string | null
	/** the entity type of the scheduled event */
	entityType?: EntityType
	/** the status of the scheduled event */
	status?: EventStatus
	/** the cover image of the scheduled event */
	image?: string
}
/** Edit a scheduled event */
async function edit(
	guildId: Snowflake,
	scheduledEventId: Snowflake,
	scheduledEvent: EditParams
): Promise<ScheduledEvent> {
	return new ScheduledEvent(
		await request.get(
			`guilds/${guildId}/scheduled-events/${scheduledEventId}`,
			scheduledEvent
		)
	)
}
/** Delete a guild scheduled event */
async function _delete(
	guildId: Snowflake,
	scheduledEventId: Snowflake
): Promise<void> {
	await request.delete(`guilds/${guildId}/scheduled-events/${scheduledEventId}`)
}
type GetUserOptions = {
	/** number of users to return (up to maximum 100) */
	limit?: number
	/** include guild member data if it exists */
	withMember?: boolean
	/** consider only users before given user id */
	before?: Snowflake
	/** consider only users after given user id */
	after?: Snowflake
}
/** Get a list of scheduled event users subscribed to a scheduled event.  */
async function getUsers(
	guildId: Snowflake,
	scheduledEventId: Snowflake,
	options?: GetUserOptions
): Promise<ScheduledEventUser[]> {
	return (await request.get(
		`guilds/${guildId}/scheduled-events/${scheduledEventId}/users`,
		options
	)) as unknown as ScheduledEventUser[]
}

enum EntityType {
	StageInstance = 1,
	Voice = 2,
	External = 3
}
enum PrivacyLevel {
	GuildOnly = 2
}
enum EventStatus {
	Scheduled = 1,
	Active = 2,
	Completed = 3,
	Canceled = 4
}

export {
	list,
	create,
	get,
	edit,
	_delete as delete,
	getUsers,
	EntityType,
	PrivacyLevel,
	EventStatus
}
export default {
	list,
	create,
	get,
	edit,
	delete: _delete,
	getUsers,
	EntityType,
	PrivacyLevel,
	EventStatus
}

type EntityMetadata = {
	/** location of event */
	location?: string
}
type _ScheduledEvent = {
	/** id of scheduled event */
	id: Snowflake
	/** guild id that scheduled event belongs to */
	guildId: Snowflake
	/** channel id which scheduled event will be hosted, or `null` if schedule entity type is `EXTERNAL` */
	channelId: Snowflake | null
	/** id of user that created scheduled event */
	creatorId?: Snowflake | null
	/** name of scheduled event */
	name: string
	/** description of scheduled event */
	description?: string | null
	/** time scheduled event will start */
	scheduledStartTime: string
	/** time scheduled event will end */
	scheduledEndTime: string | null
	/** privacy level of scheduled content */
	privacyLevel: PrivacyLevel
	/** status of scheduled event */
	status: EventStatus
	/** type of scheduled event */
	entityType: EntityType
	/** id of entity associated with guild scheduled event */
	entityId: Snowflake | null
	/** addotional metadata for guild scheduled event */
	entityMetadata: EntityMetadata | null | undefined
	/** user that created scheduled event */
	creator?: User
	/** number of users subscribe to scheduled event */
	userCount?: number
	/** cover image hash */
	image?: string
}
type ScheduledEventUser = {
	/** the scheduled event id which the user subscribed to */
	guildScheduledEventId: Snowflake
	/** user which subscribed to an event */
	user: User
	/** guild member data for this user for the guild which this event belongs to, if any */
	member?: GuildMember
}
export type { EntityMetadata, _ScheduledEvent as ScheduledEvent }
