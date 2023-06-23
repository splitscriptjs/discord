import {
	Channel as RawChannel,
	DefaultReaction,
	ForumTag,
	Overwrite,
	Snowflake,
	User,
	ThreadMetadata,
	ThreadMember
} from '../types.js'
import request from '../utils/request.js'
class Channel {
	/** id of channel */
	id: Snowflake
	/** type of channel */
	type: number
	/** id of guild */
	guild_id?: Snowflake
	/** position of channel */
	position?: number
	/** permission overwrites for members and roles */
	permission_overwrites?: Overwrite[]
	/** name of channel */
	name?: string | null
	/** topic of channel */
	topic?: string | null
	/** whether channel is nsfw */
	nsfw?: boolean
	/** id of last message sent */
	last_message_id?: Snowflake | null
	/** bitrate (in bits) of voice channel */
	bitrate?: number
	/** user limit of voice channel */
	user_limit?: number
	/** amound of seconds a user has to wait before sending another message */
	rate_limit_per_user?: number
	/** recipients of dm */
	recipients?: User[]
	/** icon hash of group dm */
	icon?: string | null
	/** id of group/thread creator */
	owner_id?: Snowflake
	/** application id of group dm create if bot created */
	application_id?: Snowflake
	/** whether managed by application */
	managed?: boolean
	/** id of parent category for a guild channel/id of text channel this thread was created in */
	parent_id?: Snowflake | null
	/** when last pinned message was pinned */
	last_pin_timestamp?: string | null
	/** voice region id of voice channel */
	rtc_region?: string | null
	/** camera video quality mode of voice channel */
	video_quality_mode?: number
	/** number of messages in thread */
	message_count?: number
	/** approximate count of users in thread (max: 50) */
	member_count?: number
	/** thread-specific fields*/
	thread_metadata?: ThreadMetadata
	/** thread member object for current user */
	member?: ThreadMember
	/** default duration of threads before archiving */
	default_auto_archive_duration?: number
	/** computed permissions for bot in channel (with overwrites) */
	permissions?: string
	/** channel flags as bitfield */
	flags?: number
	/** number of messages ever sent in thread */
	total_message_sent?: number
	/** tags that can be used in forum channel */
	available_tags?: ForumTag[]
	/** ids of tags applied to forum thread */
	applied_tags?: string[]
	/** emoji shown in add reaction button of forum thread */
	default_reaction_emoji?: DefaultReaction | null
	/** initial rate_limit_per_user for newly created threads */
	default_thread_rate_limit_per_user?: number
	/** default sort order type used to order forum posts */
	default_sort_order?: number
	/** default forum layout view used to display forum posts */
	default_forum_layout?: number

	/** Gets this channel
	 *
	 * Also updates this class instance
	 */
	async get(): Promise<Channel> {
		const result = await get(this.id)
		Object.assign(this, result)
		return result
	}
	/** Updates this channel
	 *
	 * Also updates this class instance
	 */
	async edit(updatedChannel: EditParams): Promise<Channel> {
		const result = await edit(this.id, updatedChannel)
		Object.assign(this, result)
		return result
	}
	/** Deletes this channel */
	async delete() {
		return await _delete(this.id)
	}
	constructor(channel: RawChannel) {
		this.id = channel.id
		this.type = channel.type
		this.guild_id = channel.guild_id
		this.position = channel.position
		this.permission_overwrites = channel.permission_overwrites
		this.name = channel.name
		this.topic = channel.topic
		this.nsfw = channel.nsfw
		this.last_message_id = channel.last_message_id
		this.bitrate = channel.bitrate
		this.user_limit = channel.user_limit
		this.rate_limit_per_user = channel.rate_limit_per_user
		this.recipients = channel.recipients
		this.icon = channel.icon
		this.owner_id = channel.owner_id
		this.application_id = channel.application_id
		this.managed = channel.managed
		this.parent_id = channel.parent_id
		this.last_pin_timestamp = channel.last_pin_timestamp
		this.rtc_region = channel.rtc_region
		this.video_quality_mode = channel.video_quality_mode
		this.message_count = channel.message_count
		this.member_count = channel.member_count
		this.thread_metadata = channel.thread_metadata
		this.member = channel.member
		this.default_auto_archive_duration = channel.default_auto_archive_duration
		this.permissions = channel.permissions
		this.flags = channel.flags
		this.total_message_sent = channel.total_message_sent
		this.available_tags = channel.available_tags
		this.applied_tags = channel.applied_tags
		this.default_reaction_emoji = channel.default_reaction_emoji
		this.default_thread_rate_limit_per_user =
			channel.default_thread_rate_limit_per_user
		this.default_sort_order = channel.default_sort_order
		this.default_forum_layout = channel.default_forum_layout
	}
}

/** Get a channel */
async function get(id: Snowflake): Promise<Channel> {
	const channel = (await request.get(`channels/${id}`)) as unknown as RawChannel
	return new Channel(channel)
}
/** Get a list of channels in a guild */
async function list(guildId: Snowflake): Promise<Channel[]> {
	const channels = (await request.get(
		`guilds/${guildId}/channels`
	)) as unknown as RawChannel[]
	return channels.map((channel) => new Channel(channel))
}
/** Create a channel in a guild */
async function create(
	guildId: Snowflake,
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
	const _channel = (await request.post(
		`guilds/${guildId}/channels`,
		channel
	)) as unknown as RawChannel
	return new Channel(_channel)
}
type EditParams =
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
/** Edit a channel */
async function edit(id: Snowflake, channel: EditParams): Promise<Channel> {
	const _channel = (await request.patch(
		`channels/${id}`,
		channel
	)) as unknown as RawChannel
	return new Channel(_channel)
}
/** Delete a channel */
async function _delete(id: Snowflake): Promise<void> {
	return request.delete(`channels/${id}`) as unknown as void
}
async function updatePositions(
	guildId: Snowflake,
	channels: {
		/** channel id */
		id: Snowflake
		/** sorting position of the channel */
		position?: number | null
		/** syncs the permission overwrites with the new parent, if moving to a new category */
		lock_permissions?: boolean | null
		/** the new parent ID for the channel that is moved */
		parentId?: Snowflake | null
	}[]
): Promise<void> {
	return request.patch(
		`guilds/${guildId}/channels`,
		channels
	) as unknown as void
}
export default {
	get,
	list,
	create,
	edit,
	delete: _delete,
	updatePositions
}
