import request from '../utils/request.js'
import {
	EntityMetadata,
	GuildScheduledEvent,
	GuildScheduledEventEntityType,
	GuildScheduledEventPrivacyLevel,
	GuildScheduledEventStatus,
	GuildScheduledEventUser,
	Snowflake,
	User
} from '../types'
import toCamelCase from '../utils/toCamelCase.js'

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
	privacyLevel!: number
	status!: number
	entityType!: number
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

	constructor(data: GuildScheduledEvent) {
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
		})) as unknown as GuildScheduledEvent[]
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
		privacyLevel: GuildScheduledEventPrivacyLevel
		/** the time to schedule the scheduled event */
		scheduledStartTime: string
		/** the time when the scheduled event is scheduled to end */
		scheduledEndTime?: string
		/** the description of the scheduled event */
		description?: string
		/** the entity type of the scheduled event */
		entityType: GuildScheduledEventEntityType
		/** the cover image of the scheduled event */
		image?: string
	} & (
		| {
				entityType: 3
				entityMetadata: EntityMetadata
				scheduledEndTime: string
		  }
		| {
				entityType: 1 | 2
				channelId: Snowflake
		  }
	)
): Promise<ScheduledEvent> {
	return new ScheduledEvent(
		(await request.post(
			`guilds/${guildId}/scheduled-events`,
			scheduledEvent
		)) as unknown as GuildScheduledEvent
	)
}
/** Get a scheduled event. */
async function get(
	guildId: Snowflake,
	scheduledEventId: Snowflake,
	withUserCount?: boolean
): Promise<ScheduledEvent> {
	return new ScheduledEvent(
		(await request.get(
			`guilds/${guildId}/scheduled-events/${scheduledEventId}`,
			{
				withUserCount
			}
		)) as unknown as GuildScheduledEvent
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
	privacyLevel?: GuildScheduledEventPrivacyLevel
	/** the time to schedule the scheduled event */
	scheduledStartTime?: string
	/** the time when the scheduled event is scheduled to end */
	scheduledEndTime?: string
	/** the description of the scheduled event */
	description?: string | null
	/** the entity type of the scheduled event */
	entityType?: GuildScheduledEventEntityType
	/** the status of the scheduled event */
	status?: GuildScheduledEventStatus
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
		(await request.get(
			`guilds/${guildId}/scheduled-events/${scheduledEventId}`,
			scheduledEvent
		)) as unknown as GuildScheduledEvent
	)
}
/** Delete a guild scheduled event */
async function _delete(
	guildId: Snowflake,
	scheduledEventId: Snowflake
): Promise<void> {
	return (await request.delete(
		`guilds/${guildId}/scheduled-events/${scheduledEventId}`
	)) as unknown as void
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
): Promise<GuildScheduledEventUser[]> {
	return (await request.get(
		`guilds/${guildId}/scheduled-events/${scheduledEventId}/users`,
		options
	)) as unknown as GuildScheduledEventUser[]
}
export default { list, create, get, edit, delete: _delete, getUsers }
