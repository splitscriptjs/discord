import request from '../utils/request.js'
import {
	EntityMetadata,
	GuildScheduledEvent,
	GuildScheduledEventEntityType,
	GuildScheduledEventPrivacyLevel,
	GuildScheduledEventStatus,
	GuildScheduledEventUser,
	Snowflake
} from '../types'

/** Returns a list of guild scheduled event objects for the given guild. */
async function list(
	guild_id: Snowflake,
	with_user_count?: Boolean
): Promise<GuildScheduledEvent[]> {
	return request.get(`guilds/${guild_id}/scheduled-events`, {
		with_user_count
	}) as unknown as GuildScheduledEvent[]
}
/** Create a guild scheduled event in the guild */
async function create(
	guild_id: Snowflake,
	scheduled_event: {
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
): Promise<GuildScheduledEvent> {
	return request.post(
		`guilds/${guild_id}/scheduled-events`,
		scheduled_event
	) as unknown as GuildScheduledEvent
}
/** Get a guild scheduled event. */
async function get(
	guild_id: Snowflake,
	scheduled_event_id: Snowflake,
	with_user_count?: boolean
): Promise<GuildScheduledEvent> {
	return request.get(
		`guilds/${guild_id}/scheduled-events/${scheduled_event_id}`,
		{
			with_user_count: with_user_count
		}
	) as unknown as GuildScheduledEvent
}
/** Modify a guild scheduled event */
async function modify(
	guild_id: Snowflake,
	scheduled_event_id: Snowflake,
	scheduled_event: {
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
): Promise<GuildScheduledEvent> {
	return request.get(
		`guilds/${guild_id}/scheduled-events/${scheduled_event_id}`,
		scheduled_event
	) as unknown as GuildScheduledEvent
}
/** Delete a guild scheduled event */
async function _delete(
	guild_id: Snowflake,
	scheduled_event_id: Snowflake
): Promise<void> {
	return request.delete(
		`guilds/${guild_id}/scheduled-events/${scheduled_event_id}`
	) as unknown as void
}
/** Get a list of guild scheduled event users subscribed to a guild scheduled event.  */
async function getUsers(
	guild_id: Snowflake,
	scheduled_event_id: Snowflake,
	options?: {
		/** number of users to return (up to maximum 100) */
		limit?: number
		/** include guild member data if it exists */
		with_member?: boolean
		/** consider only users before given user id */
		before?: Snowflake
		/** consider only users after given user id */
		after?: Snowflake
	}
): Promise<GuildScheduledEventUser[]> {
	return request.get(
		`guilds/${guild_id}/scheduled-events/${scheduled_event_id}/users`,
		options
	) as unknown as GuildScheduledEventUser[]
}
export default { list, create, get, modify, delete: _delete, getUsers }
