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

class ScheduledEvent implements GuildScheduledEvent {
	//#region
	id: Snowflake
	guild_id: Snowflake
	channel_id: Snowflake | null
	creator_id?: Snowflake | null
	name: string
	description?: string | null
	scheduled_start_time: string
	scheduled_end_time: string | null
	privacy_level: number
	status: number
	entity_type: number
	entity_id: Snowflake | null
	entity_metadata: EntityMetadata | null | undefined
	creator?: User
	user_count?: number
	image?: string
	//#endregion

	/** Gets this scheduled event
	 *
	 * Also updates this class instance
	 */
	async get(withUserCount?: boolean): Promise<ScheduledEvent> {
		const result = await get(this.guild_id, this.id, withUserCount)
		Object.assign(this, result)
		return result
	}

	/** Gets a list of users subscribed to this scheduled event */
	async getUsers(options?: GetUserOptions) {
		return await getUsers(this.guild_id, this.id, options)
	}

	/** Updates this scheduled event
	 *
	 * Also updates this class instance
	 */
	async edit(scheduledEvent: EditParams): Promise<ScheduledEvent> {
		const result = await edit(this.guild_id, this.id, scheduledEvent)
		Object.assign(this, result)
		return result
	}

	/** Deletes this scheduled event */
	async delete() {
		return await _delete(this.guild_id, this.id)
	}

	constructor(data: GuildScheduledEvent) {
		this.id = data.id
		this.guild_id = data.guild_id
		this.channel_id = data.guild_id
		this.creator_id = data.creator_id
		this.name = data.name
		this.scheduled_start_time = data.scheduled_start_time
		this.scheduled_end_time = data.scheduled_end_time
		this.privacy_level = data.privacy_level
		this.status = data.status
		this.entity_type = data.entity_type
		this.entity_id = data.entity_id
		this.entity_metadata = data.entity_metadata
		this.creator = data.creator
		this.user_count = data.user_count
		this.image = data.image
	}
}

/** Returns a list of scheduled events for the given guild. */
async function list(
	guildId: Snowflake,
	with_user_count?: Boolean
): Promise<ScheduledEvent[]> {
	return (
		(await request.get(`guilds/${guildId}/scheduled-events`, {
			with_user_count
		})) as unknown as GuildScheduledEvent[]
	).map((v) => new ScheduledEvent(v))
}
/** Create a scheduled event in the guild */
async function create(
	guildId: Snowflake,
	scheduledEvent: {
		/** the channel id of the scheduled event. */
		channel_id?: Snowflake
		/** the entity metadata of the scheduled event */
		entity_metadata?: EntityMetadata
		/** the name of the scheduled event */
		name: string
		/** the privacy level of the scheduled event */
		privacy_level: GuildScheduledEventPrivacyLevel
		/** the time to schedule the scheduled event */
		scheduled_start_time: string
		/** the time when the scheduled event is scheduled to end */
		scheduled_end_time?: string
		/** the description of the scheduled event */
		description?: string
		/** the entity type of the scheduled event */
		entity_type: GuildScheduledEventEntityType
		/** the cover image of the scheduled event */
		image?: string
	} & (
		| {
				entity_type: 3
				entity_metadata: EntityMetadata
				scheduled_end_time: string
		  }
		| {
				entity_type: 1 | 2
				channel_id: Snowflake
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
				with_user_count: withUserCount
			}
		)) as unknown as GuildScheduledEvent
	)
}
type EditParams = {
	/** the channel id of the scheduled event, set to `null` if changing entity type to `EXTERNAL` */
	channel_id?: Snowflake | null
	/** the entity metadata of the scheduled event */
	entity_metadata?: EntityMetadata | null
	/** the name of the scheduled event */
	name?: string
	/** the privacy level of the scheduled event */
	privacy_level?: GuildScheduledEventPrivacyLevel
	/** the time to schedule the scheduled event */
	scheduled_start_time?: string
	/** the time when the scheduled event is scheduled to end */
	scheduled_end_time?: string
	/** the description of the scheduled event */
	description?: string | null
	/** the entity type of the scheduled event */
	entity_type?: GuildScheduledEventEntityType
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
	with_member?: boolean
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
