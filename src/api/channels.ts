import type { Snowflake, Duration } from '../types.js'
import type { GuildMember } from './members.js'
import request from '../utils/request.js'
import toCamelCase from '../utils/toCamelCase.js'
import { User } from './users.js'
class Channel {
	/** id of channel */
	id!: Snowflake
	/** type of channel */
	type!: ChannelType
	/** id of guild */
	guildId?: Snowflake
	/** position of channel */
	position?: number
	/** permission overwrites for members and roles */
	permissionOverwrites?: Overwrite[]
	/** name of channel */
	name?: string | null
	/** topic of channel */
	topic?: string | null
	/** whether channel is nsfw */
	nsfw?: boolean
	/** id of last message sent */
	lastMessageId?: Snowflake | null
	/** bitrate (in bits) of voice channel */
	bitrate?: number
	/** user limit of voice channel */
	userLimit?: number
	/** amound of seconds a user has to wait before sending another message */
	rateLimitPerUser?: number
	/** recipients of dm */
	recipients?: User[]
	/** icon hash of group dm */
	icon?: string | null
	/** id of group/thread creator */
	ownerId?: Snowflake
	/** application id of group dm create if bot created */
	applicationId?: Snowflake
	/** whether managed by application */
	managed?: boolean
	/** id of parent category for a guild channel/id of text channel this thread was created in */
	parentId?: Snowflake | null
	/** when last pinned message was pinned */
	lastPinTimestamp?: string | null
	/** voice region id of voice channel */
	rtcRegion?: string | null
	/** camera video quality mode of voice channel */
	videoQualityMode?: VideoQualityMode
	/** number of messages in thread */
	messageCount?: number
	/** approximate count of users in thread (max: 50) */
	memberCount?: number
	/** thread-specific fields*/
	threadMetadata?: ThreadMetadata
	/** thread member object for current user */
	member?: ThreadMember
	/** default duration of threads before archiving */
	defaultAutoArchiveDuration?: number
	/** computed permissions for bot in channel (with overwrites) */
	permissions?: string
	/** channel flags as bitfield */
	flags?: number
	/** number of messages ever sent in thread */
	totalMessageSent?: number
	/** tags that can be used in forum channel */
	availableTags?: ForumTag[]
	/** ids of tags applied to forum thread */
	appliedTags?: string[]
	/** emoji shown in add reaction button of forum thread */
	defaultReactionEmoji?: DefaultReaction | null
	/** initial rateLimitPerUser for newly created threads */
	defaultThreadRateLimitPerUser?: number
	/** default sort order type used to order forum posts */
	defaultSortOrder?: SortOrder
	/** default forum layout view used to display forum posts */
	defaultForumLayout?: ForumLayout

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
	async delete(): Promise<void> {
		return await _delete(this.id)
	}
	constructor(channel: unknown) {
		Object.assign(this, toCamelCase(channel))
	}
}

/** Get a channel */
async function get(id: Snowflake): Promise<Channel> {
	const channel = await request.get(`channels/${id}`)
	return new Channel(channel)
}
/** Get a list of channels in a guild */
async function list(guildId: Snowflake): Promise<Channel[]> {
	const channels = (await request.get(
		`guilds/${guildId}/channels`
	)) as unknown[]
	return channels.map((channel) => new Channel(channel))
}
/** Create a channel in a guild */
async function create(
	guildId: Snowflake,
	channel: {
		name: string
		type?: ChannelType | null
		topic?: string | null
		bitrate?: number | null
		userLimit?: number | null
		rateLimitPerUser?: number | null
		position?: number | null
		permissionOverwrites?: Partial<Overwrite>[] | null
		parentId?: Snowflake | null
		nsfw?: boolean | null
		rtcRegion?: string | null
		videoQualityMode?: VideoQualityMode | null
		defaultAutoArchiveDuration?: Duration | null
		defaultReactionEmoji?: DefaultReaction | null
		availableTags?: ForumTag | null
		defaultSortOrder?: SortOrder | null
	}
): Promise<Channel> {
	const _channel = await request.post(`guilds/${guildId}/channels`, channel)
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
			type: ChannelType
			/** the position of the channel in the left-hand listing */
			position: number | null
			/** 0-1024 character channel topic (0-4096 characters for `Forum` channels) */
			topic: number | null
			/** whether the channel is nsfw */
			nsfw: boolean | null
			/** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
			rateLimitPerUser: number | null
			/** the bitrate (in bits) of the voice or stage channel; min 8000 */
			bitrate: number | null
			/** the user limit of the voice or stage channel, max 99 for voice channels and 10,000 for stage channels (0 refers to no limit) */
			userLimit: number | null
			/** channel or category-specific permissions */
			permissionOverwrites: Partial<Overwrite>[] | null
			/** id of the new parent category for a channel */
			parentId: Snowflake | null
			/** channel voice region id, automatic when set to null */
			rtcRegion: string | null
			/** the camera video quality mode of the voice channel */
			videoQualityMode: VideoQualityMode | null
			/** the default duration that the clients use (not the API) for newly created threads in the channel, in minutes, to automatically archive the thread after recent activity */
			defaultAutoArchiveDuration: Duration | null
			/** channel flags combined as a bitfield. Currently only `RequireTag` (`1 << 4`) is supported. */
			flags?: number
			/** the set of tags that can be used in a `Forum` channel; limited to 20 */
			availableTags?: ForumTag[]
			/** the emoji to show in the add reaction button on a thread in a `Forum` channel */
			defaultReactionEmoji?: DefaultReaction | null
			/** the initial `rateLimitPerUser` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update. */
			defaultThreadRateLimitPerUser?: number
			/** the default sort order type used to order posts in `Forum` channels */
			defaultSortOrder?: SortOrder | null
			/** the default forum layout type used to display posts in `Forum` channels */
			defaultForumLayout?: ForumLayout
	  }>
	| Partial<{
			/** 1-100 character channel name */
			name: string
			/** whether the thread is archived */
			archived: boolean
			/** the thread will stop showing in the channel list after `autoArchiveDuration` minutes of inactivity, can be set to: 60, 1440, 4320, 10080 */
			autoArchiveDuration: Duration
			/** whether the thread is locked; when a thread is locked, only users with MANAGE_THREADS can unarchive it */
			locked: boolean
			/** whether non-moderators can add other non-moderators to a thread; only available on private threads */
			invitable: boolean
			/** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages`, `manage_thread`, or `manage_channel`, are unaffected */
			rateLimitPerUser: number | null
			/** channel flags combined as a bitfield; `PINNED` can only be set for threads in forum channels */
			flags?: number
			/** the IDs of the set of tags that have been applied to a thread in a `Forum` channel; limited to 5 */
			appliedTags?: Snowflake[]
	  }>
/** Edit a channel */
async function edit(id: Snowflake, channel: EditParams): Promise<Channel> {
	const _channel = await request.patch(`channels/${id}`, channel)
	return new Channel(_channel)
}
/** Delete a channel */
async function _delete(id: Snowflake): Promise<void> {
	await request.delete(`channels/${id}`)
}
async function updatePositions(
	guildId: Snowflake,
	channels: {
		/** channel id */
		id: Snowflake
		/** sorting position of the channel */
		position?: number | null
		/** syncs the permission overwrites with the new parent, if moving to a new category */
		lockPermissions?: boolean | null
		/** the new parent ID for the channel that is moved */
		parentId?: Snowflake | null
	}[]
): Promise<void> {
	await request.patch(`guilds/${guildId}/channels`, channels)
}
export enum ChannelType {
	/** a text channel within a server */
	Text = 0,
	/** a direct message between users */
	Dm = 1,
	/** a voice channel within a server */
	Voice = 2,
	/** a direct message between multiple users */
	GroupDm = 3,
	/** an organizational category that contains up to 50 channels */
	Category = 4,
	/** a channel that users can follow and crosspost into their own server (formerly news channels) */
	Announcement = 5,
	/** a temporary sub-channel within a `Announcement` channel */
	AnnouncementThread = 10,
	/** a temporary sub-channel within a `Text` channel that is only viewable by those invited and those with the `MANAGE_THREADS` permission */
	PublicThread = 11,
	/** a temporary sub-channel within a `Text` channel that is only viewable by those invited and those with the `MANAGE_THREADS` permission	*/
	PrivateThread = 12,
	/** a voice channel for hosting events with an audience */
	StageVoice = 13,
	/** the channel in a hub containing the listed servers */
	Directory = 14,
	/** Channel that can only contain threads */
	Forum = 15,
	/** Channel that can only contain threads, similar to `Forum` channels */
	Media = 16
}
export enum VideoQualityMode {
	/** Discord chooses the quality for optimal performance */
	Auto = 1,
	/** 720p */
	Full = 2
}
export enum ChannelFlag {
	/** this thread is pinned to the top of its parent `Forum` or `Media` channel */
	Pinned = 1 << 1,
	/** whether a tag is required to be specified when creating a thread in a `Forum` or a `Media` channel. Tags are specified in the appliedTags field. */
	RequireTag = 1 << 4,
	/** when set hides the embedded media download options. Available only for media channels */
	HideMediaDownloadOptions = 1 << 15
}
export enum SortOrder {
	/** Sort forum posts by activity */
	LatestActivity = 0,
	/** Sort forum posts by creation time (from most recent to oldest) */
	CreationDate = 1
}
export enum ForumLayout {
	/** No default has been set for forum channel */
	NotSet = 0,
	/** Display posts as a list */
	ListView = 1,
	/** Display posts as a collection of tiles */
	GalleryView = 2
}
/** Used to manage channels */
export { get, list, create, edit, updatePositions, _delete as delete }
/** Used to manage channels */
export default {
	get,
	list,
	create,
	edit,
	delete: _delete,
	updatePositions
}

//#region types
/** Channel Object */
type _Channel = {
	/** id of channel */
	id: Snowflake
	/** type of channel */
	type: ChannelType
	/** id of guild */
	guildId?: Snowflake
	/** position of channel */
	position?: number
	/** permission overwrites for members and roles */
	permissionOverwrites?: Overwrite[]
	/** name of channel */
	name?: string | null
	/** topic of channel */
	topic?: string | null
	/** whether channel is nsfw */
	nsfw?: boolean
	/** id of last message sent */
	lastMessageId?: Snowflake | null
	/** bitrate (in bits) of voice channel */
	bitrate?: number
	/** user limit of voice channel */
	userLimit?: number
	/** amound of seconds a user has to wait before sending another message */
	rateLimitPerUser?: number
	/** recipients of dm */
	recipients?: User[]
	/** icon hash of group dm */
	icon?: string | null
	/** id of group/thread creator */
	ownerId?: Snowflake
	/** application id of group dm create if bot created */
	applicationId?: Snowflake
	/** whether managed by application */
	managed?: boolean
	/** id of parent category for a guild channel/id of text channel this thread was created in */
	parentId?: Snowflake | null
	/** when last pinned message was pinned */
	lastPinTimestamp?: string | null
	/** voice region id of voice channel */
	rtcRegion?: string | null
	/** camera video quality mode of voice channel */
	videoQualityMode?: number
	/** number of messages in thread */
	messageCount?: number
	/** approximate count of users in thread (max: 50) */
	memberCount?: number
	/** thread-specific fields*/
	threadMetadata?: ThreadMetadata
	/** thread member object for current user */
	member?: ThreadMember
	/** default duration of threads before archiving */
	defaultAutoArchiveDuration?: Duration
	/** computed permissions for bot in channel (with overwrites) */
	permissions?: string
	/** channel flags as bitfield */
	flags?: number
	/** number of messages ever sent in thread */
	totalMessageSent?: number
	/** tags that can be used in forum channel */
	availableTags?: ForumTag[]
	/** ids of tags applied to forum thread */
	appliedTags?: string[]
	/** emoji shown in add reaction button of forum thread */
	defaultReactionEmoji?: DefaultReaction | null
	/** initial rateLimitPerUser for newly created threads */
	defaultThreadRateLimitPerUser?: number
	/** default sort order type used to order forum posts */
	defaultSortOrder?: SortOrder
	/** default forum layout view used to display forum posts */
	defaultForumLayout?: ForumLayout
}
/** Thread Metadata Object */
type ThreadMetadata = {
	/** whether thread is archived */
	archived: boolean
	/** duration of thread before archiving */
	autoArchiveDuration: Duration
	/** timestamp when thread's archive status was last changed */
	archiveTimestamp: string
	/** whether thread is locked */
	locked: boolean
	/** whether non-moderators can add other non-moderators to a private thread */
	invitable?: boolean
	/** timestamp when thread was created */
	createTimestamp?: string | null
}
/** Thread Member Object */
type ThreadMember = {
	/** id of thread */
	id?: Snowflake
	/** id of user */
	userId?: Snowflake
	/** time user last joined thread */
	joinTimestamp: string
	/** any user-thread settings */
	flags: number
	/** additional information of user */
	member?: GuildMember
}
/** Forum Tag Object */
type ForumTag = {
	/** id of tag */
	id: Snowflake
	/** name of tag */
	name: string
	/** whether tag can only be added to or removed from threads with `MANAGE_THREADS` permission*/
	moderated: boolean
	/** id of guild's custom emoji */
	emojiId: Snowflake | null
	/** unicode character of emoji */
	emojiName: string | null
}
/** Overwrite Object */
type Overwrite = {
	/** role or user id */
	id: Snowflake
	/** either 0 (role) or 1 (member) */
	type: OverwriteType
	/** permission bit set to allow */
	allow: string
	/** permission bit set to deny */
	deny: string
}
/** Default Reaction Object */
type DefaultReaction = {
	/** id of guild custom emoji */
	emojiId: Snowflake | null
	/** unicode character of emoji */
	emojiName: string | null
}
export enum OverwriteType {
	Role = 0,
	Member = 1
}
//#endregion
export type { _Channel as Channel, ThreadMember, Overwrite }
