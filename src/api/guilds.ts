import request from '../utils/request.js'
import {
	AuditLog,
	Channel,
	Guild as RawGuild,
	GuildPreview,
	Invite,
	MutableGuildFeature,
	Role,
	Snowflake,
	WelcomeScreen,
	WelcomeSreenChannel,
	Emoji,
	Sticker
} from '../types.js'

type OptionalIfTrue<T, B extends boolean> = B extends true ? T | undefined : T
class Guild<isPartial extends boolean> {
	//#region
	id: Snowflake
	name: OptionalIfTrue<string, isPartial>
	icon: OptionalIfTrue<string | null, isPartial>
	icon_hash?: OptionalIfTrue<string | null, isPartial>
	splash: OptionalIfTrue<string | null, isPartial>
	discovery_splash: OptionalIfTrue<string | null, isPartial>
	owner?: OptionalIfTrue<boolean, isPartial>
	owner_id: OptionalIfTrue<Snowflake, isPartial>
	permissions?: OptionalIfTrue<string, isPartial>
	region?: OptionalIfTrue<string | null, isPartial>
	afk_channel_id: OptionalIfTrue<Snowflake | null, isPartial>
	afk_timeout: OptionalIfTrue<number, isPartial>
	widget_enabled?: OptionalIfTrue<boolean, isPartial>
	widget_channel_id?: OptionalIfTrue<Snowflake | null, isPartial>
	verification_level: OptionalIfTrue<number, isPartial>
	default_message_notifications: OptionalIfTrue<number, isPartial>
	explicit_content_filter: OptionalIfTrue<number, isPartial>
	roles: OptionalIfTrue<Role[], isPartial>
	emojis: OptionalIfTrue<Emoji[], isPartial>
	features: OptionalIfTrue<string[], isPartial>
	mfa_level: OptionalIfTrue<number, isPartial>
	application_id: OptionalIfTrue<Snowflake | null, isPartial>
	system_channel_id: OptionalIfTrue<Snowflake | null, isPartial>
	system_channel_flags: OptionalIfTrue<number, isPartial>
	rules_channel_id: OptionalIfTrue<Snowflake | null, isPartial>
	max_presences?: OptionalIfTrue<number | null, isPartial>
	max_members?: OptionalIfTrue<number, isPartial>
	vanity_url_code: OptionalIfTrue<string | null, isPartial>
	description: OptionalIfTrue<string | null, isPartial>
	banner: OptionalIfTrue<string | null, isPartial>
	premium_tier: OptionalIfTrue<number, isPartial>
	premium_subscription_count?: OptionalIfTrue<number, isPartial>
	preferred_locale: OptionalIfTrue<string, isPartial>
	public_updates_channel_id: Snowflake | null
	max_video_channel_users?: OptionalIfTrue<number, isPartial>
	approximate_member_count?: OptionalIfTrue<number, isPartial>
	approximate_presence_count?: OptionalIfTrue<number, isPartial>
	welcome_screen?: OptionalIfTrue<WelcomeScreen, isPartial>
	nsfw_level: OptionalIfTrue<number, isPartial>
	stickers?: OptionalIfTrue<Sticker[], isPartial>
	premium_progress_bar_enabled: OptionalIfTrue<boolean, isPartial>
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
	async updateMfa(level: 0 | 1) {
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
	constructor(data: RawGuild) {
		this.id = data.id
		this.name = data.name
		this.icon = data.icon
		this.icon_hash = data.icon_hash
		this.splash = data.splash
		this.discovery_splash = data.discovery_splash
		this.owner = data.owner
		this.owner_id = data.owner_id
		this.permissions = data.permissions
		this.region = data.region
		this.afk_channel_id = data.afk_channel_id
		this.afk_timeout = data.afk_timeout
		this.widget_enabled = data.widget_enabled
		this.widget_channel_id = data.widget_channel_id
		this.verification_level = data.verification_level
		this.default_message_notifications = data.default_message_notifications
		this.explicit_content_filter = data.explicit_content_filter
		this.roles = data.roles
		this.emojis = data.emojis
		this.features = data.features
		this.mfa_level = data.mfa_level
		this.application_id = data.application_id
		this.system_channel_id = data.system_channel_id
		this.system_channel_flags = data.system_channel_flags
		this.rules_channel_id = data.rules_channel_id
		this.max_presences = data.max_presences
		this.max_members = data.max_members
		this.vanity_url_code = data.vanity_url_code
		this.description = data.description
		this.banner = data.banner
		this.premium_tier = data.premium_tier
		this.premium_subscription_count = data.premium_subscription_count
		this.preferred_locale = data.preferred_locale
		this.public_updates_channel_id = data.public_updates_channel_id
		this.max_video_channel_users = data.max_video_channel_users
		this.approximate_member_count = data.approximate_member_count
		this.approximate_presence_count = data.approximate_presence_count
		this.welcome_screen = data.welcome_screen
		this.nsfw_level = data.nsfw_level
		this.stickers = data.stickers
		this.premium_progress_bar_enabled = data.premium_progress_bar_enabled
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
	verification_level?: 0 | 1 | 2 | 3 | 4
	/** default message notification level */
	default_message_notifications?: 0 | 1
	/** explicit content filter level */
	explicit_content_filter?: 0 | 1 | 2
	/** new guild roles */
	roles: Role[]
	/** new guild's channels */
	channels?: Partial<Channel>[]
	/** id for afk channel */
	afk_channel_id?: Snowflake
	/** afk timeout in seconds, can be set to: 60, 300, 900, 1800, 3600 */
	afk_timeout?: 60 | 300 | 900 | 1800 | 3600
	/** the id of the channel where guild notices such as welcome messages and boost events are posted */
	system_channel_id?: Snowflake
	/** system channel flags */
	system_channel_flags?: number
}
/** Create a new guild.  */
async function create(guild: CreateParams): Promise<Guild<false>> {
	return new Guild((await request.post(`guilds`, guild)) as unknown as RawGuild)
}
/** Returns the guild object for the given id */
async function get(id: Snowflake, withCounts?: boolean): Promise<Guild<false>> {
	return new Guild(
		(await request.get(`guilds/${id}`, {
			with_counts: withCounts
		})) as unknown as RawGuild
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
	return (
		(
			(await request.get(
				`users/@me/guilds`,
				options
			)) as unknown as Partial<RawGuild>[]
		)
			//@ts-ignore
			.map((guild) => new Guild(guild))
	)
}

/** Returns the guild preview object for the given id. If the user is not in the guild, then the guild must be lurkable. */
async function preview(id: Snowflake): Promise<GuildPreview> {
	return request.get(`guilds/${id}/preview`) as unknown as GuildPreview
}
/** Returns a partial invite object for guilds with that feature enabled. */
async function vanity(id: Snowflake): Promise<Partial<Invite>> {
	return request.get(`guilds/${id}/vanity-url`) as unknown as Partial<Invite>
}
type GetAuditLogOptions = {
	/** Entries from a specific user ID */
	user_id?: Snowflake
	/** Entries for a specific audit log event */
	action_type?: number
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
	return request.get(
		`guilds/${guildId}/audit-logs`,
		options
	) as unknown as AuditLog
}
type EditParams = {
	/** guild name */
	name: string
	/** guild voice region id - **deprecated** */
	region: string | null
	/** verification level */
	verification_level: 0 | 1 | 2 | 3 | 4 | null
	/** default message notification level */
	default_message_notifications: 0 | 1 | null
	/** explicit content filter level */
	explicit_content_filter: 0 | 1 | 2 | null
	/** id for afk channel */
	afk_channel_id: Snowflake | null
	/** 	afk timeout in seconds, can be set to: 60, 300, 900, 1800, 3600 */
	afk_timeout: 60 | 300 | 900 | 1800 | 3600 | null
	/** base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has the `ANIMATED_ICON` feature) */
	icon: string | null
	/** user id to transfer guild ownership to (must be owner) */
	owner_id: Snowflake
	/** base64 16:9 png/jpeg image for the guild splash (when the server has the `INVITE_SPLASH` feature) */
	splash: string | null
	/** base64 16:9 png/jpeg image for the guild discovery splash (when the server has the `DISCOVERABLE` feature) */
	discovery_splash: string | null
	/** base64 16:9 png/jpeg image for the guild banner (when the server has the `BANNER` feature; can be animated gif when the server has the `ANIMATED_BANNER` feature) */
	banner: string | null
	/** the id of the channel where guild notices such as welcome messages and boost events are posted */
	system_channel_id: Snowflake | null
	/** system channel flags */
	system_channel_flags: number
	/** the id of the channel where Community guilds display rules and/or guidelines */
	rules_channel_id: Snowflake | null
	/** the id of the channel where admins and moderators of Community guilds receive notices from Discord */
	public_updates_channel_id: Snowflake | null
	/** the preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US" */
	preferred_locale: string | null
	/** enabled guild features */
	features: MutableGuildFeature
	/** the description for the guild */
	description: string | null
	/** whether the guild's boost progress bar should be enabled */
	premium_progress_bar_enabled: boolean
	/** the id of the channel where admins and moderators of Community guilds receive safety alerts from Discord */
	safety_alerts_channel_id: Snowflake | null
}
/** Edit a guild's settings */
async function edit(
	id: Snowflake,
	guild: Partial<EditParams>
): Promise<Guild<false>> {
	return request.patch(`guilds/${id}`, guild) as unknown as Guild<false>
}
/** Updates a guild's MFA level. Requires guild ownership.  */
async function updateMfa(guildId: Snowflake, level: 0 | 1): Promise<0 | 1> {
	return request.post(`guilds/${guildId}/mfa`, { level: level }) as unknown as
		| 0
		| 1
}
/** Delete a guild permanently. User must be owner. */
async function _delete(id: Snowflake): Promise<void> {
	return request.delete(`guilds/${id}`) as unknown as void
}
type EditWelcomeScreenParams = {
	/** whether the welcome screen is enabled */
	enabled: boolean
	/** channels linked in the welcome screen and their display options */
	welcome_channels: WelcomeSreenChannel[]
	/** the server description to show in the welcome screen */
	description: string
}
const welcomeScreen = {
	/** Returns the Welcome Screen object for the guild.  */
	async get(guildId: Snowflake): Promise<WelcomeScreen> {
		return request.get(
			`guilds/${guildId}/welcome-screen`
		) as unknown as WelcomeScreen
	},
	/** Edit the guild's Welcome Screen. */
	async edit(
		guildId: Snowflake,
		welcome_screen: Partial<EditWelcomeScreenParams>
	): Promise<WelcomeScreen> {
		return request.patch(
			`guilds/${guildId}/welcome-screen`,
			welcome_screen
		) as unknown as WelcomeScreen
	}
}
type GetPruneCountOptions = {
	/** number of days to count prune for (1-30) */
	days?: number
	/** role(s) to include */
	include_roles?: string
}
type BeginPruneOptions = {
	/** number of days to count prune for (1-30) */
	days?: number
	/** whether **pruned** is returned, discouraged for large guilds */
	compute_prune_count?: boolean
	/** role(s) to include */
	include_roles?: string
}
const prune = {
	/** Returns an object with one pruned key indicating the number of members that would be removed in a prune operation. */
	async count(
		guildId: Snowflake,
		options?: GetPruneCountOptions
	): Promise<{
		pruned: number
	}> {
		return request.get(`guilds/${guildId}/prune`, options) as unknown as {
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
	return request.delete(`users/@me/guilds/${guildId}`) as unknown as void
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
