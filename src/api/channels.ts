import {
	Channel,
	DefaultReaction,
	ForumTag,
	Overwrite,
	Snowflake
} from '../types.js'
import request from '../utils/request.js'
/** Get a channel */
async function get(id: Snowflake): Promise<Channel> {
	return request.get(`channels/${id}`) as unknown as Channel
}
/** Get a list of channels in a guild */
async function list(guild_id: Snowflake): Promise<Channel[]> {
	return request.get(`guilds/${guild_id}/channels`) as unknown as Channel[]
}
/** Create a channel in a guild */
async function create(
	guild_id: Snowflake,
	channel: {
		name: string
		type?: number | null
		topic?: string | null
		bitrate?: number | null
		user_limit?: number | null
		rate_limit_per_user?: number | null
		position?: number | null
		permission_overwrites?: Partial<Overwrite>[] | null
		parent_id?: Snowflake | null
		nsfw?: boolean | null
		rtc_region?: string | null
		video_quality_mode?: number | null
		default_auto_archive_duration?: number | null
		default_reaction_emoji?: DefaultReaction | null
		available_tags?: ForumTag | null
		default_sort_order?: 0 | 1 | null
	}
): Promise<Channel> {
	return request.post(
		`guilds/${guild_id}/channels`,
		channel
	) as unknown as Channel
}
/** Modify a channel */
async function modify(
	id: Snowflake,
	channel:
		| Partial<{
				/** 1-100 character channel name */
				name: string
				/** base64 encoded icon */
				icon: string
		  }>
		| Partial<{
				/** 1-100 character channel name */
				name: string
				/** the type of channel; only conversion between text and announcement is supported and only in guilds with the "NEWS" feature */
				type: number
				/** the position of the channel in the left-hand listing */
				position: number | null
				/** 0-1024 character channel topic (0-4096 characters for `GUILD_FORUM` channels) */
				topic: number | null
				/** whether the channel is nsfw */
				nsfw: boolean | null
				/** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
				rate_limit_per_user: number | null
				/** the bitrate (in bits) of the voice or stage channel; min 8000 */
				bitrate: number | null
				/** the user limit of the voice or stage channel, max 99 for voice channels and 10,000 for stage channels (0 refers to no limit) */
				user_limit: number | null
				/** channel or category-specific permissions */
				permission_overwrites: Partial<Overwrite>[] | null
				/** id of the new parent category for a channel */
				parent_id: Snowflake | null
				/** channel voice region id, automatic when set to null */
				rtc_region: string | null
				/** the camera video quality mode of the voice channel */
				video_quality_mode: number | null
				/** the default duration that the clients use (not the API) for newly created threads in the channel, in minutes, to automatically archive the thread after recent activity */
				default_auto_archive_duration: number | null
				/** 	channel flags combined as a bitfield. Currently only `REQUIRE_TAG` (`1 << 4`) is supported. */
				flags?: number
				/** the set of tags that can be used in a `GUILD_FORUM` channel; limited to 20 */
				available_tags?: ForumTag[]
				/** the emoji to show in the add reaction button on a thread in a `GUILD_FORUM` channel */
				default_reaction_emoji?: DefaultReaction | null
				/** the initial `rate_limit_per_user` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update. */
				default_thread_rate_limit_per_user?: number
				/** the default sort order type used to order posts in `GUILD_FORUM` channels */
				default_sort_order?: number | null
				/** the default forum layout type used to display posts in `GUILD_FORUM` channels */
				default_forum_layout?: number
		  }>
		| Partial<{
				/** 1-100 character channel name */
				name: string
				/** whether the thread is archived */
				archived: boolean
				/** the thread will stop showing in the channel list after `auto_archive_duration` minutes of inactivity, can be set to: 60, 1440, 4320, 10080 */
				auto_archive_duration: number
				/** whether the thread is locked; when a thread is locked, only users with MANAGE_THREADS can unarchive it */
				locked: boolean
				/** whether non-moderators can add other non-moderators to a thread; only available on private threads */
				invitable: boolean
				/** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages`, `manage_thread`, or `manage_channel`, are unaffected */
				rate_limit_per_user: number | null
				/** channel flags combined as a bitfield; `PINNED` can only be set for threads in forum channels */
				flags?: number
				/** the IDs of the set of tags that have been applied to a thread in a `GUILD_FORUM` channel; limited to 5 */
				applied_tags?: Snowflake[]
		  }>
): Promise<Channel> {
	return request.patch(`channels/${id}`, channel) as unknown as Channel
}
/** Delete a channel */
async function _delete(id: Snowflake): Promise<void> {
	return request.delete(`channels/${id}`) as unknown as void
}
async function modifyPositions(
	guild_id: Snowflake,
	channels: {
		/** channel id */
		id: Snowflake
		/** sorting position of the channel */
		position?: number | null
		/** syncs the permission overwrites with the new parent, if moving to a new category */
		lock_permissions?: boolean | null
		/** the new parent ID for the channel that is moved */
		parent_id?: Snowflake | null
	}[]
): Promise<void> {
	return request.patch(
		`guilds/${guild_id}/channels`,
		channels
	) as unknown as void
}
export default {
	get,
	list,
	create,
	modify,
	delete: _delete,
	modifyPositions
}
