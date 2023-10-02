import request from '../utils/request.js'
import toCamelCase from '../utils/toCamelCase.js'

import type { Duration, Snowflake, Timeout } from '../types'
import type { Channel, Overwrite } from './channels'
import type { Invite } from './invites'
import type { Role } from './roles'
import type { Emoji } from './emojis'
import type { FormatType, Sticker } from './stickers'
import type { Command } from './commands'
import type { User } from './users'
import type { Webhook } from './webhooks'
import type { Integration } from './integrations'
import type {
	ActionType,
	AutomodAction,
	AutomodRule,
	EventType,
	TriggerMetadata,
	TriggerType
} from './automod'
import type {
	EntityType,
	EventStatus,
	PrivacyLevel,
	ScheduledEvent
} from './scheduledEvents'

import { ExpireBehaviour } from './integrations.js'
type OptionalIfTrue<T, B extends boolean> = B extends true ? T | undefined : T
class Guild<isPartial extends boolean> {
	//#region
	id!: Snowflake
	name!: OptionalIfTrue<_Guild['name'], isPartial>
	icon!: OptionalIfTrue<_Guild['icon'], isPartial>
	iconHash?: OptionalIfTrue<_Guild['iconHash'], isPartial>
	splash!: OptionalIfTrue<_Guild['splash'], isPartial>
	discoverySplash!: OptionalIfTrue<_Guild['discoverySplash'], isPartial>
	owner?: OptionalIfTrue<_Guild['owner'], isPartial>
	ownerId!: OptionalIfTrue<_Guild['ownerId'], isPartial>
	permissions?: OptionalIfTrue<_Guild['permissions'], isPartial>
	region?: OptionalIfTrue<_Guild['region'], isPartial>
	afkChannelId!: OptionalIfTrue<_Guild['afkChannelId'], isPartial>
	afkTimeout!: OptionalIfTrue<_Guild['afkTimeout'], isPartial>
	widgetEnabled?: OptionalIfTrue<_Guild['widgetEnabled'], isPartial>
	widgetChannelId?: OptionalIfTrue<_Guild['widgetChannelId'], isPartial>
	verificationLevel!: OptionalIfTrue<_Guild['verificationLevel'], isPartial>
	defaultMessageNotifications!: OptionalIfTrue<
		_Guild['defaultMessageNotifications'],
		isPartial
	>
	explicitContentFilter!: OptionalIfTrue<
		_Guild['explicitContentFilter'],
		isPartial
	>
	roles!: OptionalIfTrue<_Guild['roles'], isPartial>
	emojis!: OptionalIfTrue<_Guild['emojis'], isPartial>
	features!: OptionalIfTrue<_Guild['features'], isPartial>
	mfaLevel!: OptionalIfTrue<_Guild['mfaLevel'], isPartial>
	applicationId!: OptionalIfTrue<_Guild['applicationId'], isPartial>
	systemChannelId!: OptionalIfTrue<_Guild['systemChannelId'], isPartial>
	systemChannelFlags!: OptionalIfTrue<_Guild['systemChannelFlags'], isPartial>
	rulesChannelId!: OptionalIfTrue<_Guild['rulesChannelId'], isPartial>
	maxPresences?: OptionalIfTrue<_Guild['maxPresences'], isPartial>
	maxMembers?: OptionalIfTrue<_Guild['maxMembers'], isPartial>
	vanityUrlCode!: OptionalIfTrue<_Guild['vanityUrlCode'], isPartial>
	description!: OptionalIfTrue<_Guild['description'], isPartial>
	banner!: OptionalIfTrue<_Guild['banner'], isPartial>
	premiumTier!: OptionalIfTrue<_Guild['premiumTier'], isPartial>
	premiumSubscriptionCount?: OptionalIfTrue<
		_Guild['premiumSubscriptionCount'],
		isPartial
	>
	preferredLocale!: OptionalIfTrue<_Guild['preferredLocale'], isPartial>
	publicUpdatesChannelId!: OptionalIfTrue<
		_Guild['publicUpdatesChannelId'],
		isPartial
	>
	maxVideoChannelUsers?: OptionalIfTrue<
		_Guild['maxVideoChannelUsers'],
		isPartial
	>
	approximateMemberCount?: OptionalIfTrue<
		_Guild['approximateMemberCount'],
		isPartial
	>
	approximatePresenceCount?: OptionalIfTrue<
		_Guild['approximatePresenceCount'],
		isPartial
	>
	nsfwLevel!: OptionalIfTrue<_Guild['nsfwLevel'], isPartial>
	stickers?: OptionalIfTrue<_Guild['stickers'], isPartial>
	premiumProgressBarEnabled!: OptionalIfTrue<
		_Guild['premiumProgressBarEnabled'],
		isPartial
	>
	//#endregion
	/** Gets this guild
	 *
	 * Also updates this class instance
	 */
	async get(withCounts?: boolean) {
		const result = await get(this.id, withCounts)
		Object.assign(this, result)
		return result
	}
	/** Gets the preview for this guild */
	async preview() {
		return await preview(this.id)
	}
	/** Gets the vanity invite for this guild */
	async vanity() {
		return await vanity(this.id)
	}
	/** Gets the audit log for this guild */
	async auditLog(options?: GetAuditLogOptions) {
		return await auditLog(this.id, options)
	}
	/** Edits this guild
	 *
	 * Also updates this class instance
	 */
	async edit(editParams: Partial<EditParams>) {
		const result = await edit(this.id, editParams)
		Object.assign(this, result)
		return result
	}
	/** Updates this guild's MFA level */
	async updateMfa(level: MfaLevel) {
		return await updateMfa(this.id, level)
	}
	/** Deletes this guild */
	async delete() {
		return await _delete(this.id)
	}
	/** Leaves this guild */
	async leave() {
		return await leave(this.id)
	}
	welcomeScreen = {
		/** Gets the welcome screen for this guild */
		get: async () => {
			return await welcomeScreen.get(this.id)
		},
		/** Updates the welcome screen for this guild */
		edit: async (newWelcomeScreen: Partial<EditWelcomeScreenParams>) => {
			return await welcomeScreen.edit(this.id, newWelcomeScreen)
		}
	}
	prune = {
		/** Gets the number of members that would be removed in a prune operation */
		count: async (options?: GetPruneCountOptions) => {
			return await prune.count(this.id, options)
		},
		/** Begins a prune operation for this guild */
		begin: async (options?: BeginPruneOptions) => {
			return await prune.begin(this.id, options)
		}
	}
	constructor(data: unknown) {
		Object.assign(this, toCamelCase(data))
	}
}
type CreateParams = {
	/** name of the guild (2-100 characters) */
	name: string
	/** voice region id - **deprecated** */
	region?: string | null
	/** base64 128x128 image for the guild icon */
	icon?: string
	/** verification level */
	verificationLevel?: VerificationLevel
	/** default message notification level */
	defaultMessageNotifications?: MessageNotificationLevel
	/** explicit content filter level */
	explicitContentFilter?: ExplicitContentFilterLevel
	/** new guild roles */
	roles: Role[]
	/** new guild's channels */
	channels?: Partial<Channel>[]
	/** id for afk channel */
	afkChannelId?: Snowflake
	/** afk timeout in seconds, can be set to: 60, 300, 900, 1800, 3600 */
	afkTimeout?: Timeout
	/** the id of the channel where guild notices such as welcome messages and boost events are posted */
	systemChannelId?: Snowflake
	/** system channel flags */
	systemChannelFlags?: number
}
/** Create a new guild.  */
async function create(guild: CreateParams): Promise<Guild<false>> {
	return new Guild(await request.post(`guilds`, guild))
}
/** Returns the guild object for the given id */
async function get(id: Snowflake, withCounts?: boolean): Promise<Guild<false>> {
	return new Guild(
		await request.get(`guilds/${id}`, {
			withCounts
		})
	)
}
type ListParams = {
	/** get guilds before this guild ID */
	before?: Snowflake
	/** get guilds after this guild ID */
	after?: Snowflake
	/** max number of guilds to return (1-200) */
	limit?: number
}
/** Get a list of guilds the user is in */
async function list(options?: ListParams): Promise<Guild<true>[]> {
	return ((await request.get(`users/@me/guilds`, options)) as unknown[]).map(
		(guild) => new Guild<true>(guild)
	)
}

/** Returns the guild preview object for the given id. If the user is not in the guild, then the guild must be lurkable. */
async function preview(id: Snowflake): Promise<GuildPreview> {
	return (await request.get(`guilds/${id}/preview`)) as unknown as GuildPreview
}
/** Returns a partial invite object for guilds with that feature enabled. */
async function vanity(id: Snowflake): Promise<Partial<Invite>> {
	return (await request.get(
		`guilds/${id}/vanity-url`
	)) as unknown as Partial<Invite>
}
type GetAuditLogOptions = {
	/** Entries from a specific user ID */
	userId?: Snowflake
	/** Entries for a specific audit log event */
	actionType?: number
	/** Entries with ID less than a specific audit log entry ID */
	before?: Snowflake
	/** Entries with ID greater than a specific audit log entry ID */
	after?: Snowflake
	/** Maximum number of entries (between 1-100) to return, defaults to 50 */
	limit?: number
}
/** Returns an audit log object for the guild. */
async function auditLog(
	guildId: Snowflake,
	options?: GetAuditLogOptions
): Promise<AuditLog> {
	return (await request.get(
		`guilds/${guildId}/audit-logs`,
		options
	)) as unknown as AuditLog
}
type EditParams = {
	/** guild name */
	name: string
	/** guild voice region id - **deprecated** */
	region: string | null
	/** verification level */
	verificationLevel: VerificationLevel | null
	/** default message notification level */
	defaultMessageNotifications: MessageNotificationLevel | null
	/** explicit content filter level */
	explicitContentFilter: ExplicitContentFilterLevel | null
	/** id for afk channel */
	afkChannelId: Snowflake | null
	/** afk timeout in seconds, can be set to: 60, 300, 900, 1800, 3600 */
	afkTimeout: Timeout | null
	/** base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has the `ANIMATED_ICON` feature) */
	icon: string | null
	/** user id to transfer guild ownership to (must be owner) */
	ownerId: Snowflake
	/** base64 16:9 png/jpeg image for the guild splash (when the server has the `INVITE_SPLASH` feature) */
	splash: string | null
	/** base64 16:9 png/jpeg image for the guild discovery splash (when the server has the `DISCOVERABLE` feature) */
	discoverySplash: string | null
	/** base64 16:9 png/jpeg image for the guild banner (when the server has the `BANNER` feature; can be animated gif when the server has the `ANIMATED_BANNER` feature) */
	banner: string | null
	/** the id of the channel where guild notices such as welcome messages and boost events are posted */
	systemChannelId: Snowflake | null
	/** system channel flags */
	systemChannelFlags: number
	/** the id of the channel where Community guilds display rules and/or guidelines */
	rulesChannelId: Snowflake | null
	/** the id of the channel where admins and moderators of Community guilds receive notices from Discord */
	publicUpdatesChannelId: Snowflake | null
	/** the preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US" */
	preferredLocale: string | null
	/** enabled guild features */
	features: MutableGuildFeature
	/** the description for the guild */
	description: string | null
	/** whether the guild's boost progress bar should be enabled */
	premiumProgressBarEnabled: boolean
	/** the id of the channel where admins and moderators of Community guilds receive safety alerts from Discord */
	safetyAlertsChannelId: Snowflake | null
}
/** Edit a guild's settings */
async function edit(
	id: Snowflake,
	guild: Partial<EditParams>
): Promise<Guild<false>> {
	return new Guild<false>(await request.patch(`guilds/${id}`, guild))
}
/** Updates a guild's MFA level. Requires guild ownership.  */
async function updateMfa(
	guildId: Snowflake,
	level: MfaLevel
): Promise<MfaLevel> {
	return (await request.post(`guilds/${guildId}/mfa`, {
		level: level
	})) as unknown as MfaLevel
}
/** Delete a guild permanently. User must be owner. */
async function _delete(id: Snowflake): Promise<void> {
	await request.delete(`guilds/${id}`)
}
type EditWelcomeScreenParams = {
	/** whether the welcome screen is enabled */
	enabled: boolean
	/** channels linked in the welcome screen and their display options */
	welcomeChannels: WelcomeSreenChannel[]
	/** the server description to show in the welcome screen */
	description: string
}
const welcomeScreen = {
	/** Returns the Welcome Screen object for the guild.  */
	async get(guildId: Snowflake): Promise<WelcomeScreen> {
		return (await request.get(
			`guilds/${guildId}/welcome-screen`
		)) as unknown as WelcomeScreen
	},
	/** Edit the guild's Welcome Screen. */
	async edit(
		guildId: Snowflake,
		welcomeScreen: Partial<EditWelcomeScreenParams>
	): Promise<WelcomeScreen> {
		return (await request.patch(
			`guilds/${guildId}/welcome-screen`,
			welcomeScreen
		)) as unknown as WelcomeScreen
	}
}
type GetPruneCountOptions = {
	/** number of days to count prune for (1-30) */
	days?: number
	/** role(s) to include */
	includeRoles?: string
}
type BeginPruneOptions = {
	/** number of days to count prune for (1-30) */
	days?: number
	/** whether **pruned** is returned, discouraged for large guilds */
	computePruneCount?: boolean
	/** role(s) to include */
	includeRoles?: string
}
const prune = {
	/** Returns an object with one pruned key indicating the number of members that would be removed in a prune operation. */
	async count(
		guildId: Snowflake,
		options?: GetPruneCountOptions
	): Promise<{
		pruned: number
	}> {
		return (await request.get(
			`guilds/${guildId}/prune`,
			options
		)) as unknown as {
			pruned: number
		}
	},
	/** Begin a prune operation. */
	async begin(
		guildId: Snowflake,
		options?: BeginPruneOptions
	): Promise<{
		pruned: number | null
	}> {
		return request.post(`guilds/${guildId}`, options) as unknown as Promise<{
			pruned: number | null
		}>
	}
}
/** Leave a guild */
async function leave(guildId: Snowflake): Promise<void> {
	await request.delete(`users/@me/guilds/${guildId}`)
}
export enum MfaLevel {
	/** guild has no MFA/2FA requirement for moderation actions */
	None = 0,
	/** guild has a 2FA requirement for moderation actions */
	Elevated = 1
}
export enum ExplicitContentFilterLevel {
	/** media content will not be scanned */
	Disabled = 0,
	/** media content sent by members without roles will be scanned */
	MembersWithoutRoles = 1,
	/** media content sent by all members will be scanned */
	AllMembers = 2
}
export enum MessageNotificationLevel {
	/** members will receive notifications for all messages by default */
	AllMessages = 0,
	/** members will receive notifications only for messages that \@mention them by default */
	OnlyMentions = 1
}
export enum VerificationLevel {
	/** unrestricted */
	None = 0,
	/** must have verified email on account */
	Low = 1,
	/** must be registered on Discord for longer than 5 minutes */
	Medium = 2,
	/** must be a member of the server for longer than 10 minutes */
	High = 3,
	/** must have a verified phone number */
	VeryHigh = 4
}
export enum SystemChannelFlag {
	SupressJoinNotification = 1 << 0,
	SuppressPremiumSubscriptions = 1 << 1,
	SuppressGuildReminderNotifications = 1 << 2,
	SuppessJoinNotificationReplies = 1 << 3,
	Suppress_Role_Subscription_Purchase_Notifications = 1 << 4
}
export enum PremiumTier {
	None,
	Tier1,
	Tier2,
	Tier3
}
export enum NsfwLevel {
	Default,
	Explicit,
	Safe,
	AgeRestricted
}
export {
	create,
	get,
	list,
	auditLog,
	preview,
	vanity,
	edit,
	updateMfa,
	leave,
	prune,
	welcomeScreen,
	_delete as delete
}
export default {
	create,
	get,
	list,
	auditLog,
	preview,
	vanity,
	edit,
	updateMfa,
	delete: _delete,
	leave,
	prune,
	welcomeScreen
}

//#region
type _Guild = {
	/** guild id */
	id: Snowflake
	/** guild name */
	name: string
	/** icon hash */
	icon: string | null
	/** icon hash, returned in template object */
	iconHash?: string | null
	/** splash hash */
	splash: string | null
	/** discovery splash hash */
	discoverySplash: string | null
	/** whether user is owner of guild */
	owner?: boolean
	/** id of owner */
	ownerId: Snowflake
	/** total permissions for user in guild (exluding overwrites) */
	permissions?: string
	/** **deprecated** - voice region id for guild */
	region?: string | null
	/** id of afk channel */
	afkChannelId: Snowflake | null
	/** afk timeout in seconds (60, 300, 900, 1800, or 3600) */
	afkTimeout: Timeout
	/** whether server widget is enabled */
	widgetEnabled?: boolean
	/** channel id that widget will generate an invite to, or `null` if set to no invite */
	widgetChannelId?: Snowflake | null
	/** verification level required for guild */
	verificationLevel: VerificationLevel
	/** default message notifications level */
	defaultMessageNotifications: MessageNotificationLevel
	/** explicit content filter level */
	explicitContentFilter: ExplicitContentFilterLevel
	/** roles in guild */
	roles: Role[]
	/** custom guild emojis */
	emojis: Emoji[]
	/** enabled guild features */
	features: GuildFeature[]
	/** required MFA level for guild */
	mfaLevel: MfaLevel
	/** application id of guild creator if bot-created */
	applicationId: Snowflake | null
	/** id of channel where guild notices (e.g welcome messages and boost events) */
	systemChannelId: Snowflake | null
	/** system channel flags */
	systemChannelFlags: number
	/** id of channel where Community guilds can */
	rulesChannelId: Snowflake | null
	/** max number of presences for guild (`null` always returned, apart from the larges tof guilds) */
	maxPresences?: number | null | undefined
	/** max number of members in guild */
	maxMembers?: number
	/** vanity url code for guild */
	vanityUrlCode: string | null
	/** description of guild */
	description: string | null
	/** banner hash */
	banner: string | null
	/** premium tier (Server Boost level) */
	premiumTier: PremiumTier
	/** number of boosts guild has */
	premiumSubscriptionCount?: number
	/** preferred locale of Community guild */
	preferredLocale: string
	/** id of channel where admins and mods recieve notices from discord */
	publicUpdatesChannelId: Snowflake | null
	/** max number of users in a video channel */
	maxVideoChannelUsers?: number
	/** approx number of members in guild */
	approximateMemberCount?: number
	/** approx number of non-offline members in guild */
	approximatePresenceCount?: number
	/** welcome screen of a Community guild, shown to new members */
	welcomeScreen?: WelcomeScreen
	/** guild NSFW level */
	nsfwLevel: NsfwLevel
	/** custom guild stickers */
	stickers?: Sticker[]
	/** whether guild has boost progress bar enabled */
	premiumProgressBarEnabled: boolean
}
type WelcomeScreen = {
	/** server description showed in welcome screen */
	description: string | null
	/** channel shown in welcome screen, up to 5 */
	welcomeChannels: WelcomeSreenChannel[]
}
type WelcomeSreenChannel = {
	/** channel's id */
	channelId: Snowflake
	/** description shown for channel */
	description: string
	/** emoji id, if emoji is custom */
	emojiId: Snowflake | null
	/** emoji name if custom, unicode character if standard, or null if not set */
	emojiName: string | null
}
type GuildPreview = {
	/** guild id */
	id: Snowflake
	/** guild name */
	name: string
	/** icon hash */
	icon: string | null
	/** splash hash */
	splash: string | null
	/** discovery splash hash */
	discoverySplash: string | null
	/** custom guild emojis */
	emojis: Emoji[]
	/** enabled guild features */
	features: GuildFeature[]
	/** approx number of members in this guild */
	approximateMemberCount: number
	/** approx number of online members in this guild */
	approximatePresenceCount: number
	/** description for the the guild */
	description: string | null
	/** custom guild stickers */
	stickers: Sticker[]
}
type AuditLog = {
	/** List of application commands referenced in the audit log */
	applicationCommands: Command
	/** List of audit log entries, sorted from most to least recent */
	auditLogEntries: AuditLogEntry[]
	/** List of auto moderation rules referenced in the audit log */
	autoModerationRules: AutomodRule[]
	/** List of guild scheduled events referenced in the audit log */
	guildScheduledEvents: ScheduledEvent
	/** List of partial integration objects */
	integrations: Partial<Integration>
	/** List of threads referenced in the audit log */
	threads: Channel[]
	/** List of users referenced in the audit log */
	users: User[]
	/** List of webhooks referenced in the audit log */
	webhooks: Webhook[]
}
type AuditLogEntry = {
	/** ID of the affected entity (webhook, user, role, etc.) */
	targetId: string | null
	/** Changes made to the target_id */
	changes?: AuditLogChange[]
	/** User or app that made the changes */
	userId: Snowflake | null
	/** ID of the entry */
	id: Snowflake
	/** Type of action that occurred */
	actionType: ActionType
	/** Additional info for certain event types */
	options?: OptionalAuditEntryInfo
	/** Reason for the change (1-512 characters) */
	reason?: string
}
type OptionalAuditEntryInfo = {
	/** ID of the app whose permissions were targeted */
	applicationId: Snowflake
	/** Name of the Auto Moderation rule that was triggered */
	autoModerationRuleName: string
	/** Trigger type of the Auto Moderation rule that was triggered */
	autoModerationRuleTriggerType: TriggerType
	/** Channel in which the entities were targeted */
	channelId: Snowflake
	/** Number of entities that were targeted */
	count: string
	/** Number of days after which inactive members were kicked */
	deleteMemberDays: string
	/** ID of the overwritten entity */
	id: Snowflake
	/** Number of members removed by the prune */
	membersRemoved: string
	/** ID of the message that was targeted */
	messageId: Snowflake
	/** Name of the role if type is "0" (not present if type is "1") */
	roleName: string
	/** Type of overwritten entity - role ("0") or member ("1") */
	type: string
}
type AuditLogChange =
	//#region
	| { key: 'name'; newValue?: string; oldValue?: string }
	| { key: 'description'; newValue?: string; oldValue?: string }
	| { key: 'icon_hash'; newValue?: string; oldValue?: string }
	| { key: 'image_hash'; newValue?: string; oldValue?: string }
	| { key: 'splash_hash'; newValue?: string; oldValue?: string }
	| { key: 'discovery_splash_hash'; newValue?: string; oldValue?: string }
	| { key: 'banner_hash'; newValue?: string; oldValue?: string }
	| { key: 'owner_id'; newValue?: Snowflake; oldValue?: Snowflake }
	| { key: 'region'; newValue?: string; oldValue?: string }
	| { key: 'preferred_locale'; newValue?: string; oldValue?: string }
	| { key: 'afk_channel_id'; newValue?: Snowflake; oldValue?: Snowflake }
	| { key: 'afk_timeout'; newValue?: Timeout; oldValue?: Timeout }
	| { key: 'rules_channel_id'; newValue?: Snowflake; oldValue?: Snowflake }
	| {
			key: 'public_updates_channel_id'
			newValue?: Snowflake
			oldValue?: Snowflake
	  }
	| { key: 'mfa_level'; newValue?: MfaLevel; oldValue?: MfaLevel }
	| {
			key: 'verification_level'
			newValue?: VerificationLevel
			oldValue?: VerificationLevel
	  }
	| {
			key: 'explicit_content_filter'
			newValue?: ExplicitContentFilterLevel
			oldValue?: ExplicitContentFilterLevel
	  }
	| {
			key: 'default_message_notifications'
			newValue?: MessageNotificationLevel
			oldValue?: MessageNotificationLevel
	  }
	| { key: 'vanity_url_code'; newValue?: string; oldValue?: string }
	| { key: '$add'; newValue?: Role[]; oldValue?: Role[] }
	| { key: '$remove'; newValue?: Role[]; oldValue?: Role[] }
	| { key: 'prune_delete_days'; newValue?: number; oldValue?: number }
	| { key: 'widget_enabled'; newValue?: boolean; oldValue?: boolean }
	| { key: 'widget_channel_id'; newValue?: Snowflake; oldValue?: Snowflake }
	| { key: 'system_channel_id'; newValue?: Snowflake; oldValue?: Snowflake }
	| { key: 'position'; newValue?: number; oldValue?: number }
	| { key: 'topic'; newValue?: string; oldValue?: string }
	| { key: 'bitrate'; newValue?: number; oldValue?: number }
	| {
			key: 'permission_overwrites'
			newValue?: Overwrite[]
			oldValue?: Overwrite[]
	  }
	| { key: 'nsfw'; newValue?: boolean; oldValue?: boolean }
	| { key: 'application_id'; newValue?: Snowflake; oldValue?: Snowflake }
	| { key: 'rate_limit_per_user'; newValue?: number; oldValue?: number }
	| { key: 'permissions'; newValue?: string; oldValue?: string }
	| { key: 'color'; newValue?: number; oldValue?: number }
	| { key: 'hoist'; newValue?: boolean; oldValue?: boolean }
	| { key: 'mentionable'; newValue?: boolean; oldValue?: boolean }
	| { key: 'allow'; newValue?: string; oldValue?: string }
	| { key: 'deny'; newValue?: string; oldValue?: string }
	| { key: 'code'; newValue?: string; oldValue?: string }
	| { key: 'channel_id'; newValue?: Snowflake; oldValue?: Snowflake }
	| { key: 'inviter_id'; newValue?: Snowflake; oldValue?: Snowflake }
	| { key: 'max_uses'; newValue?: number; oldValue?: number }
	| { key: 'uses'; newValue?: number; oldValue?: number }
	| { key: 'max_age'; newValue?: number; oldValue?: number }
	| { key: 'temporary'; newValue?: boolean; oldValue?: boolean }
	| { key: 'deaf'; newValue?: boolean; oldValue?: boolean }
	| { key: 'mute'; newValue?: boolean; oldValue?: boolean }
	| { key: 'nick'; newValue?: string; oldValue?: string }
	| { key: 'avatar_hash'; newValue?: string; oldValue?: string }
	| { key: 'id'; newValue?: Snowflake; oldValue?: Snowflake }
	| { key: 'type'; newValue?: number | string; oldValue?: number | string }
	| { key: 'enable_emoticons'; newValue?: boolean; oldValue?: boolean }
	| {
			key: 'expire_behavior'
			newValue?: ExpireBehaviour
			oldValue?: ExpireBehaviour
	  }
	| { key: 'expire_grace_period'; newValue?: number; oldValue?: number }
	| { key: 'user_limit'; newValue?: number; oldValue?: number }
	| {
			key: 'privacy_level'
			newValue?: PrivacyLevel
			oldValue?: PrivacyLevel
	  }
	| { key: 'tags'; newValue?: string; oldValue?: string }
	| { key: 'format_type'; newValue?: Sticker; oldValue?: FormatType }
	| { key: 'asset'; newValue?: ''; oldValue?: '' }
	| { key: 'available'; newValue?: boolean; oldValue?: boolean }
	| { key: 'guild_id'; newValue?: Snowflake; oldValue?: Snowflake }
	| { key: 'archived'; newValue?: boolean; oldValue?: boolean }
	| { key: 'locked'; newValue?: boolean; oldValue?: boolean }
	| { key: 'auto_archive_duration'; newValue?: Duration; oldValue?: Duration }
	| {
			key: 'default_auto_archive_duration'
			newValue?: Duration
			oldValue?: Duration
	  }
	| {
			key: 'entity_type'
			newValue?: EntityType
			oldValue?: EntityType
	  }
	| {
			key: 'status'
			newValue?: EventStatus
			oldValue?: EventStatus
	  }
	| { key: 'location'; newValue?: string; oldValue?: string }
	| {
			key: 'communication_disabled_until'
			newValue?: string
			oldValue?: string
	  }
	| { key: 'trigger_type'; newValue?: TriggerType; oldValue?: TriggerType }
	| { key: 'event_type'; newValue?: EventType; oldValue?: EventType }
	| {
			key: 'trigger_metadata'
			newValue?: TriggerMetadata
			oldValue?: TriggerMetadata
	  }
	| { key: 'actions'; newValue?: AutomodAction[]; oldValue?: AutomodAction[] }
	| { key: 'enabled'; newValue?: boolean; oldValue?: boolean }
	| { key: 'exempt_roles'; newValue?: Snowflake[]; oldValue?: Snowflake[] }
	| { key: 'exempt_channels'; newValue?: Snowflake[]; oldValue?: Snowflake[] }
//#endregion
type GuildFeature =
	| 'ANIMATED_BANNER'
	| 'ANIMATED_ICON'
	| 'APPLICATION_COMMAND_PERMISSIONS_V2'
	| 'AUTO_MODERATION'
	| 'BANNER'
	| 'COMMUNITY'
	| 'CREATOR_MONETIZABLE_PROVISIONAL'
	| 'CREATOR_STORE_PAGE'
	| 'DEVELOPER_SUPPORT_SERVER'
	| 'DISCOVERABLE'
	| 'FEATURABLE'
	| 'INVITES_DISABLED'
	| 'INVITE_SPLASH'
	| 'MEMBER_VERIFICATION_GATE_ENABLED'
	| 'MORE_STICKERS'
	| 'NEWS'
	| 'PARTNERED'
	| 'PREVIEW_ENABLED'
	| 'RAID_ALERTS_DISABLED'
	| 'ROLE_ICONS'
	| 'ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE'
	| 'ROLE_SUBSCRIPTIONS_ENABLED'
	| 'TICKETED_EVENTS_ENABLED'
	| 'VANITY_URL'
	| 'VERIFIED'
	| 'VIP_REGIONS'
	| 'WELCOME_SCREEN_ENABLED'
type MutableGuildFeature =
	| 'COMMUNITY'
	| 'DISCOVERABLE'
	| 'INVITES_DISABLED'
	| 'RAID_ALERTS_DISABLED'
/** Represents an Offline Guild, or a Guild whose information has not been provided through guild/create events */
type UnavailableGuild = { unavaliable: true } & Partial<_Guild>
//#endregion
export type { _Guild as Guild, AuditLogEntry, UnavailableGuild }
