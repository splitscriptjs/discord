/** Channel Object */
export type Channel = {
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
	defaultSortOrder?: number
	/** default forum layout view used to display forum posts */
	defaultForumLayout?: number
}
/** Overwrite Object */
export type Overwrite = {
	/** role or user id */
	id: Snowflake
	/** either 0 (role) or 1 (member) */
	type: number
	/** permission bit set to allow */
	allow: string
	/** permission bit set to deny */
	deny: string
}
/** User Object */
export type User = {
	/** user's id */
	id: Snowflake
	/** user's username */
	username: string
	/** user's 4-digit tag */
	discriminator: string
	/** user's avatar hash */
	avatar: string | null
	/** whether user is a bot */
	bot?: boolean
	/** whether user is Offical Discord System user */
	system?: boolean
	/** whether user has 2fa enabled */
	mfaEnabled?: boolean | null | undefined
	/** user's banner color as integer representation of hex color */
	accentColor?: number | null | undefined
	/** user's chosen language option */
	locale?: string
	/** whether user's email has been verified */
	verified?: boolean
	/** user's email */
	email?: string | null
	/** user's flags */
	flags?: number
	/** type of user's nitro subscription */
	premiumType?: number
	/** user's public flags */
	publicFlags?: number
}
/** Thread Metadata Object */
export type ThreadMetadata = {
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
export type ThreadMember = {
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
export type ForumTag = {
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
/** Default Reaction Object */
export type DefaultReaction = {
	/** id of guild custom emoji */
	emojiId: Snowflake | null
	/** unicode character of emoji */
	emojiName: string | null
}
/** Guild Member Object */
export type GuildMember = {
	/** user this guild member represents */
	user?: User
	/** user's guild nickname */
	nick?: string
	/** user's guild avatar hash */
	avatar?: string
	/** array of role object ids */
	roles: string[]
	/** when user joined guild */
	joinedAt: string
	/** when user started boosting guild */
	premiumSince?: string | null
	/** whether user is deafened in voice channels */
	deaf: boolean
	/** whether user is muted in voice channels */
	mute: boolean
	/** guild member flags as bit set */
	flags: number
	/** whether user has passed guild's membership screening requirements */
	pending?: boolean
	/** total permissions of member in channel */
	permissions?: string
	/** when user's timeout will expire */
	communicationDisableUntil?: string | null
}
/** Invite Object */
export type Invite = {
	/** invite code (unique id) */
	code: string
	/** guild this invite is for */
	guild?: Guild
	/** channel this invite is for */
	channel: Channel | null | undefined
	/** user who created invite */
	inviter?: User
	/** type of target for this voice channel invite */
	targetType?: number
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
	guildScheduledEvent?: GuildScheduledEvent
}
export type Application = {
	/** the id of the app */
	id: Snowflake
	/** the name of the app */
	name: string
	/** the icon hash of the app */
	icon: string | null
	/** the description of the app */
	description: string
	/** an array of rpc origin urls, if rpc is enabled */
	rpcOrigins: string[]
	/** when false only app owner can join the app's bot to guilds */
	botPublic: boolean
	/** when true the app's bot will only join upon completion of the full oauth2 code grant flow */
	botRequireCodeGrant: boolean
	/** the url of the app's terms of service */
	termsOfServiceUrl?: string
	/** the url of the app's privacy policy */
	privacyPolicyUrl?: string
	/** partial user object containing info on the owner of the application */
	owner?: Partial<User>
	/** **deprecated and will be removed** An empty string.*/
	summary: string
	/** the hex encoded key for verification in interactions and the GameSDK's GetTicket */
	verifyKey: string
	/** if the application belongs to a team, this will be a list of the members of that team */
	team: Team | null
	/** if this application is a game sold on Discord, this field will be the guild to which it has been linked */
	guildId?: Snowflake
	/** if this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists */
	primarySkuId?: Snowflake
	/** if this application is a game sold on Discord, this field will be the URL slug that links to the store page */
	slug?: string
	/** the application's default rich presence invite cover image hash */
	coverImage?: string
	/** the application's public flags */
	flags?: number
	/** up to 5 tags describing the content and functionality of the application */
	tags?: string[]
	/** settings for the application's default in-app authorization link, if enabled */
	installParams?: InstallParams
	/** the application's default custom authorization link, if enabled */
	customInstallUrl?: string
	/** the application's role connection verification entry point, which when configured will render the app as a verification method in the guild role verification configuration */
	roleConnectionsVerificationUrl?: string
}
export type InstallParams = {
	/** the scopes to add the application to the server with */
	scopes: string[]
	/** the permissions to request for the bot role */
	permissions: string
}
export type Team = {
	/** a hash of the image of the team's icon */
	icon: string | null
	/** the unique id of the team */
	id: Snowflake
	/** the members of the team */
	members: TeamMember[]
	/** the name of the team */
	name: string
	/** the user id of the current team owner */
	ownerUserId: Snowflake
}
export type TeamMember = {
	/** the user's membership state on the team */
	membershipState: number
	/** will always be ["*"] */
	permissions: string[]
	/** the id of the parent team of which they are a member */
	teamId: Snowflake
	/** the avatar, discriminator, id, and username of the user */
	user: Partial<User>
}
export type Guild = {
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
	afkTimeout: number
	/** whether server widget is enabled */
	widgetEnabled?: boolean
	/** channel id that widget will generate an invite to, or `null` if set to no invite */
	widgetChannelId?: Snowflake | null
	/** verification level required for guild */
	verificationLevel: VerificationLevel
	/** default message notifications level */
	defaultMessageNotifications: DefaultMessageNotifications
	/** explicit content filter level */
	explicitContentFilter: ExplicitContentFilter
	/** roles in guild */
	roles: Role[]
	/** custom guild emojis */
	emojis: Emoji[]
	/** enabled guild features */
	features: string[]
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
	premiumTier: number
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
	nsfwLevel: number
	/** custom guild stickers */
	stickers?: Sticker[]
	/** whether guild has boost progress bar enabled */
	premiumProgressBarEnabled: boolean
}
export type Role = {
	/** role id */
	id: Snowflake
	/** role name */
	name: string
	/** integer representation of hex color code */
	color: number
	/** if role is pinned in user listing */
	hoist: boolean
	/** role icon hash */
	icon?: string
	/** role unicode emoji */
	unicodeEmoji?: string | null
	/** position of role */
	position: number
	/** permission bit set */
	permissions: string
	/** whether role is managed by an integration */
	managed: boolean
	/** whether role is mentionable */
	mentionable: boolean
	/** tags role has */
	tags?: RoleTags
}
export type RoleTags = {
	/** id of the bot role belongs to */
	botId?: Snowflake
	/** id of the integration role belongs to */
	integrationId?: Snowflake
	/** whether this is guild's booster role
	 *
	 * `null` if "true", not present if "false" */
	premiumSubscriber?: null
	/** id of this role's subscription sku and listing */
	subscriptionListingId?: Snowflake
	/** whether role is available for purchase
	 *
	 * `null` if "true", not present if "false" */
	availableForPurchase?: null
	/** whether role is guild's linked role
	 *
	 *
	 * `null` if "true", not present if "false" */
	guildConnections?: null
}
export type Emoji = {
	/** emoji id */
	id: Snowflake | null
	/** emoji name */
	name: string | null
	/** roles allowed to use this emoji */
	roles?: string[]
	/** user that created this emoji */
	user?: User
	/** whether emoji must be wrapped in colons */
	requireColons?: boolean
	/** whether emoji is managed */
	managed?: boolean
	/** whether emoji is animated */
	animated?: boolean
	/** whether emojican be used */
	available?: boolean
}
export type WelcomeScreen = {
	/** server description showed in welcome screen */
	description: string | null
	/** channel shown in welcome screen, up to 5 */
	welcomeChannels: WelcomeSreenChannel[]
}
export type WelcomeSreenChannel = {
	/** channel's id */
	channelId: Snowflake
	/** description shown for channel */
	description: string
	/** emoji id, if emoji is custom */
	emojiId: Snowflake | null
	/** emoji name if custom, unicode character if standard, or null if not set */
	emojiName: string | null
}
export type Sticker = {
	/** id of sticker */
	id: Snowflake
	/** id of pack the sticker is from */
	packId?: Snowflake
	/** name of sticker */
	name: string
	/** description of sticker */
	description: string | null
	/** autocomplete/suggestion tags for sticker */
	tags: string
	/** **deprecated** - previously sticker asset hash, now empty string */
	asset?: string
	/** type of sticker */
	type: number
	/** type of sticker format */
	formatType: number
	/** whether guild sticker can be used */
	available?: boolean
	/** id of guild that owns this sticker */
	guildId?: Snowflake
	/** user that uploaded guild sticker */
	user: User
	/** standard sticker's sort order within its pack */
	sortValue?: number
}
export type InviteStageInstance = {
	/** members speaking in Stage */
	members: GuildMember[]
	/** number of users in Stage */
	participantCount: number
	/** number of users speaking in Stage */
	speakerCount: number
	/** topic of Stage instance */
	topic: string
}
export type GuildScheduledEvent = {
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
	privacyLevel: number
	/** status of scheduled event */
	status: number
	/** type of scheduled event */
	entityType: number
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
export type GuildScheduledEventUser = {
	/** the scheduled event id which the user subscribed to */
	guildScheduledEventId: Snowflake
	/** user which subscribed to an event */
	user: User
	/** guild member data for this user for the guild which this event belongs to, if any */
	member?: GuildMember
}
export type GuildScheduledEventPrivacyLevel = 2
export type GuildScheduledEventEntityType = 1 | 2 | 3
export type GuildScheduledEventStatus = 1 | 2 | 3 | 4
export type EntityMetadata = {
	/** location of event */
	location?: string
}
export type GuildPreview = {
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
	features: string[]
	/** approx number of members in this guild */
	approximateMemberCount: number
	/** approx number of online members in this guild */
	approximatePresenceCount: number
	/** description for the the guild */
	description: string | null
	/** custom guild stickers */
	stickers: Sticker[]
}
export type Command = {
	/** snowflake id of command */
	id: Snowflake
	/** type of command */
	type?: number
	/** id of parent application */
	applicationId: Snowflake
	/** guild id of command, if not global */
	guildId?: Snowflake
	/** name of command */
	name: string
	/** localization dictionary for `name` field */
	nameLocalizations: object | null | undefined
	/** description for `chatInput` commands, empty string for `user` and `message` commands */
	description: string
	/** localization dictionary for `description` field */
	descriptionLocalizations?: object | null | undefined
	/** params for `chatInput` command, max 25 */
	options?: CommandOption[]
	/**  set of permissions represent as bit set */
	defaultMemberPermissions: string | null
	/** whether command is available in dms */
	dmPermission?: boolean
	/** **soon deprecated** - whether command is enabled by default */
	defaultPermission?: boolean | null | undefined
	/** whether command is age-restricted */
	nsfw?: boolean
	/** autoincrementing version id update during substantial record changes */
	version: string
}
export type CommandOption = {
	/** type of option */
	type: number
	/** name of option */
	name: string
	/** localization dictionary for `name` */
	nameLocalizations?: object | null | undefined
	/** description of option */
	description: string
	/** localization dictionary `description` */
	descriptionLocalizations?: object | null | undefined
	/** if param is required or optional */
	required?: boolean
	/** choices for `string`, `integer` and `number` types for user to pick from, max 25 */
	choices?: CommandOptionChoice[]
	/** if option is subcommand or subcommand group type, nested options will be params */
	options?: CommandOption[]
	/** if opton is channel type, channels shown will be restricted to these types */
	channelTypes?: number[]
	/** if option is `integer` or `number`, min value permitted */
	minValue?: number
	/** if option is `integer` or `number`, max value permitted */
	maxValue?: number
	/** if option is `string`, min allowed length */
	minLength?: number
	/** if option is `string`, max allowed length */
	maxLength?: number
	/** if autocomplete interactions are enabled for `string`, `integer`, or `number` type option */
	autocomplete?: boolean
}
export type CommandOptionChoice = {
	/** command option choice name */
	name: string
	/** localization dictionary for `name` */
	nameLocalizations?: object | null | undefined
	/** value for choice */
	value: string | number
}
export type GuildCommandPermission = {
	/** id of command or application id */
	id: Snowflake
	/** id of application command belongs to */
	applicationId: Snowflake
	/** id of guild */
	guildId: Snowflake
	/** permissions for command in guild */
	permissions: CommandPermission[]
}
export type CommandPermission = {
	/** id of role, user, or channel */
	id: Snowflake
	/** role (`1`), user (`2`), or channel (`3`) */
	type: number
	/** `true` to allow, `false` to disallow */
	permission: boolean
}
export type InteractionCallbackData =
	| InteractionCallbackDataMessage
	| InteractionCallbackDataAutocomplete
	| InteractionCallbackDataModal
export type InteractionCallbackDataMessage = {
	/** whether response is tts */
	tts?: boolean
	/** message content */
	content?: string
	/** up to 10 embeds */
	embeds?: Embed[]
	/** allowed mentions */
	allowedMentions?: AllowedMentions
	/** messag flags combined as bitfield (only `SUPPRESS_EMBEDS` and `EPHEMERAL` can be set) */
	flags?: number
	/** message components */
	components?: Component[]
	/** attachment objects with filename and description */
	attachment?: Partial<Attachment>[]
}
export type InteractionCallbackDataAutocomplete = {
	/** autocomplete choices (max of 25 choices) */
	choices: CommandOptionChoice[]
}
export type InteractionCallbackDataModal = {
	/** a developer-defined identifier for the modal, max 100 characters */
	customId: Snowflake
	/** the title of the popup modal, max 45 characters */
	title: string
	/** between 1 and 5 (inclusive) components that make up the modal */
	compontents: Component[]
}
export type Attachment = {
	/** attachment id */
	id: Snowflake
	/** name of file attached */
	filename: string
	/** description for the file (max 1024 characters) */
	description?: string
	/** the attachment's media type */
	contentType?: string
	/** size of file in bytes */
	size: number
	/** source url of file */
	url: string
	/** a proxied url of file */
	proxyUrl: string
	/** height of file (if image) */
	height?: number | null
	/** width of file (if image) */
	width?: number | null
	/** whether this attachment is ephemeral */
	ephemeral?: boolean
}
export type Component = ActionRow | Button | SelectMenu | TextInput
/** An Action Row is a non-interactive container component for other types of components.
 *
 * - *You can have up to 5 Action Rows per message*
 * - *An Action Row cannot contain another Action Row*
 */
export type ActionRow = {
	type: 1
	components: Component[]
}
/** Buttons are interactive components that render in messages. They can be clicked by users, and send an interaction to your app when clicked.
 *
 * - *Buttons must be sent inside an Action Row*
 * - *An Action Row can contain up to 5 buttons*
 * - *An Action Row containing buttons cannot also contain any select menu components*
 */
export type Button = {
	/** 2 for a button */
	type: 2
	/** A button style */
	style: 1 | 2 | 3 | 4 | 5
	/** Text that appears on the button; max 80 characters */
	label?: string
	/** `name`, `id`, and `animated` */
	emoji?: Partial<Emoji>
	/** Developer-defined identifier for the button; max 100 characters */
	customId?: Snowflake
	/** URL for link-style buttons */
	url?: string
	/** Whether the button is disabled (defaults to false) */
	disabled?: boolean
}
/** Text inputs are an interactive component that render on modals. They can be used to collect short-form or long-form text. */
export type TextInput = {
	/** 4 for a text input */
	type: 4
	/** Developer-defined identifier for the input; max 100 characters */
	customId: Snowflake
	/** The Text Input Style ( `1`: Short, `2`: Paragraph) */
	style: 1 | 2
	/** Label for this component; max 45 characters */
	label: string
	/** Minimum input length for a text input; min 0, max 4000 */
	minLength?: number
	/** Maximum input length for a text input; min 1, max 4000 */
	maxLength?: number
	/** Whether this component is required to be filled (defaults to `true`) */
	required?: boolean
	/** Pre-filled value for this component; max 4000 characters */
	value?: string
	/** Custom placeholder text if the input is empty; max 100 characters */
	placeholder?: string
}
/** Select menus are interactive components that allow users to select one or more options from a dropdown list in messages.
 *
 * - *Select menus must be sent inside an Action Row*
 * - *An Action Row can contain only one select menu*
 * - *An Action Row containing a select menu cannot also contain buttons*
 */
export type SelectMenu = {
	/** Type of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`) */
	type: 3 | 5 | 6 | 7 | 8
	/** ID for the select menu; max 100 characters */
	customId: Snowflake
	/** Specified choices in a select menu (only required and available for string selects (type `3`); max 25 */
	options?: SelectOption[]
	/** List of channel types to include in the channel select component (type `8`) */
	channelTypes?: 0 | 1 | 2 | 3 | 4 | 5 | 10 | 11 | 12 | 13 | 14 | 15
	/** Placeholder text if nothing is selected; max 150 characters */
	placeholder?: string
	/** Minimum number of items that must be chosen (defaults to 1); min 0, max 25 */
	minValues?: number
	/** Maximum number of items that can be chosen (defaults to 1); max 25 */
	maxValues?: number
	/** Whether select menu is disabled (defaults to `false`) */
	disabled?: boolean
}
export type SelectOption = {
	/** User-facing name of the option; max 100 characters */
	label: string
	/** Dev-defined value of the option; max 100 characters */
	value: string
	/** Additional description of the option; max 100 characters */
	description?: string
	/** `id`, `name`, and `animated` */
	emoji?: Partial<Emoji>
	/** Will show this option as selected by default */
	default?: boolean
}
export type AllowedMentions = {
	/** array of allowed mention types to parse from content */
	parse: string[]
	/** array of roleIds to mention */
	roles: string[]
	/** array of userIds to mention */
	users: string[]
	/** for replies, whether to mention author of message being replied to */
	repliedUser: boolean
}
export type Embed = {
	/** title of embed */
	title?: string
	/** type of embed */
	type?: string
	/** description of embed */
	description?: string
	/** url of embed */
	url?: string
	/** ISO8601 timestamp string of embed content */
	timestamp?: string
	/** color code of embed */
	color?: number
	/** footer information */
	footer?: EmbedFooter
	/** image information */
	image?: EmbedMedia
	/** thumbnail information */
	thumbnail?: EmbedMedia
	/** video information */
	video?: EmbedMedia
	/** provider information */
	provider?: EmbedProvider
	/** author information */
	author?: EmbedAuthor
	/** fields information */
	fields?: EmbedField[]
}
export type EmbedFooter = {
	/** footer text */
	text: string
	/** url of footer icon (only supports http(s) and attachments) */
	iconUrl?: string
	/** a proxied url of footer icon */
	proxyIconUrl?: string
}
export type EmbedMedia = {
	/** source url of media *(for `image`/`thumbnail`: only supports http(s) and attachments)* */
	url: string
	/** a proxied url of the media */
	proxyUrl?: string
	/** height of media */
	height?: number
	/** width of media */
	width?: number
}
export type EmbedProvider = {
	/** name of provider */
	name?: string
	/** url of provider */
	url?: string
}
export type EmbedAuthor = {
	/** name of author */
	name: string
	/** url of author (only supports http(s)) */
	url?: string
	/** url of author icon (only supports http(s) and attachments) */
	iconUrl?: string
	/** a proxied url of author icon */
	proxyIconUrl?: string
}
export type EmbedField = {
	/** name of the field */
	name: string
	/** value of the field */
	value: string
	/** whether or not this field should display inline */
	inline?: boolean
}
export type Message = {
	/** id of the message */
	id: Snowflake
	/** id of the channel the message was sent in */
	channelId: Snowflake
	/** the author of this message (not guaranteed to be a valid user) */
	author: User
	/** contents of the message */
	content: string
	/** when this message was sent */
	timestamp: string
	/** when this message was edited (or null if never) */
	editedTimestamp: string | null
	/** whether this was a TTS message */
	tts: boolean
	/** whether this message mentions everyone */
	mentionEveryone: boolean
	/** users specifically mentioned in the message */
	mentions: User[]
	/** roles specifically mentioned in this message */
	mentionRoles: string[]
	/** channels specifically mentioned in this message */
	mentionChannels?: ChannelMention[]
	/** any attached files */
	attachments: Attachment[]
	/** any embedded content */
	embeds: Embed[]
	/** reactions to the message */
	reactions: Reaction[]
	/** used for validating a message was sent */
	nonce?: number | string
	/** whether this message is pinned */
	pinned: boolean
	/** if the message is generated by a webhook, this is the webhook's id */
	webhookId?: Snowflake
	/** type of message */
	type: number
	/** sent with Rich Presence-related chat embeds */
	activity?: MessageActivity
	/** sent with Rich Presence-related chat embeds */
	application?: Partial<Application>
	/** 	if the message is an Interaction or application-owned webhook, this is the id of the application */
	applicationId?: Snowflake
	/** data showing the source of a crosspost, channel follow add, pin, or reply message */
	messageReference?: MessageReference
	/** message flags combined as a bitfield */
	flags?: number
	/** the message associated with the message_reference */
	referencedMessage?: Message | null
	/** sent if the message is a response to an Interaction */
	interaction?: MessageInteraction
	/** the thread that was started from this message, includes thread member object */
	thread?: Channel
	/** sent if the message contains components like buttons, action rows, or other interactive components */
	components?: Component[]
	/** sent if the message contains stickers */
	stickerItems?: StickerItem[]
	/** **deprecated** - the stickers sent with the message */
	stickers?: Sticker[]
	/** A generally increasing integer (there may be gaps or duplicates) that represents the approximate position of the message in a thread, it can be used to estimate the relative position of the message in a thread in company with `total_message_sent` on parent thread */
	position?: number
	/** data of the role subscription purchase or renewal that prompted this ROLE_SUBSCRIPTION_PURCHASE message */
	roleSubscriptionData?: RoleSubscriptionData
}
export type ChannelMention = {
	/** id of the channel */
	id: Snowflake
	/** id of the guild containing the channel */
	guildId: Snowflake
	/** the type of channel */
	type: 0 | 1 | 2 | 3 | 4 | 5 | 10 | 11 | 12 | 13 | 14 | 15
	/** the name of the channel */
	name: string
}
export type Reaction = {
	/** times this emoji has been used to react */
	count: number
	/** whether the current user reacted using this emoji */
	me: boolean
	/** emoji information */
	emoji: Partial<Emoji>
}
export type MessageActivity = {
	/** type of message activity (`1`: `JOIN`, `2`: `SPECTATE`, `3`: `LISTEN`, `5`: `JOIN_REQUEST`) */
	type: 1 | 2 | 3 | 5
	/** partyId from a Rich Presence event */
	partyId?: Snowflake
}
export type MessageReference = {
	/** id of the originating message */
	messageId?: Snowflake
	/** id of the originating message's channel */
	channelId?: Snowflake
	/** id of the originating message's guild */
	guildId?: Snowflake
	/** when sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
	failIfNotExists?: boolean
}
export type MessageInteraction = {
	/** ID of the interaction */
	id: Snowflake
	/** Type of interaction (`1`: Ping, `2`: Application Command, `3`: Message Component, `4`: Application Command Autocomplete, `5`: Modal Submit) */
	type: 1 | 2 | 3 | 4 | 5
	/** Name of the application command, including subcommands and subcommand groups */
	name: string
	/** User who invoked the interaction */
	user: User
	/** Member who invoked the interaction in the guild */
	member?: Partial<GuildMember>
}
export type StickerItem = {
	/** id of the sticker */
	id: Snowflake
	/** name of the sticker */
	name: string
	/** type of sticker format (`1`: PNG, `2`: APNG, `3`: LOTTIE, `4`: GIF)*/
	formatType: 1 | 2 | 3 | 4
}
export type RoleSubscriptionData = {
	/** the id of the sku and listing that the user is subscribed to */
	roleSubscriptionListingId: Snowflake
	/** the name of the tier that the user is subscribed to */
	tierName: string
	/** the cumulative number of months that the user has been subscribed for */
	totalMonthsSubscribed: number
	/** whether this notification is for a renewal rather than a new purchase */
	isRenewal: boolean
}
export type Presence = {
	/** Unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
	since: number | null
	/** User's activities */
	activities: Activity[]
	/** User's new status */
	status: string
	/** Whether or not the client is afk */
	afk: boolean
}
export type Activity = {
	/** Activity's name */
	name: string
	/** Activity type */
	type: 0 | 1 | 2 | 3 | 4 | 5
	/** Stream URL, is validated when type is 1 */
	url?: string | null
	/** Unix timestamp (in milliseconds) of when the activity was added to the user's session */
	createdAt: number
	/** Unix timestamps for start and/or end of the game */
	timestamps?: ActivityTimestamps
	/** Application ID for the game */
	applicationId?: Snowflake
	/** What the player is currently doing */
	details?: string | null
	/** User's current party status */
	state?: string | null
	/** Emoji used for a custom status */
	emoji?: ActivityEmoji | null
	/** Information for the current party of the player */
	party?: ActivityParty
	/** Images for the presence and their hover texts */
	assets?: ActivityAssets
	/** Secrets for Rich Presence joining and spectating */
	secrets?: ActivitySecrets
	/** Whether or not the activity is an instanced game session */
	instance?: boolean
	/** Activity flags ORd together, describes what the payload includes */
	flags?: number
	/** Custom buttons shown in the Rich Presence (max 2) */
	buttons?: ActivityButton[]
}
export type ActivityTimestamps = {
	/** Unix time (in milliseconds) of when the activity started */
	start?: number
	/** Unix time (in milliseconds) of when the activity ends */
	end?: number
}
export type ActivityEmoji = {
	/** Name of the emoji */
	name: string
	/** ID of the emoji */
	id?: Snowflake
	/** Whether the emoji is animated */
	animated?: boolean
}
export type ActivityParty = {
	id?: Snowflake
	size?: number[]
}
export type ActivityAssets = {
	largeImage?: string
	/** Text displayed when hovering over the large image of the activity */
	largeText?: string
	smallImage?: string
	/** Text displayed when hovering over the small image of the activity */
	smallText?: string
}
export type ActivitySecrets = {
	/** Secret for joining a party */
	join?: string
	/** Secret for spectating a game */
	spectate?: string
	/** Secret for a specific instanced match */
	match?: string
}
export type ActivityButton = {
	/** Text shown on the button (1-32 characters) */
	label: string
	/** URL opened when clicking the button (1-512 characters) */
	url: string
}
/** Represents an Offline Guild, or a Guild whose information has not been provided through guild/create events */
export type UnavailableGuild = { unavaliable: true } & Partial<Guild>
export type AutomodRule = {
	/** the id of this rule */
	id: Snowflake
	/** the id of the guild which this rule belongs to */
	guildId: Snowflake
	/** the rule name */
	name: string
	/** the user which first created this rule */
	creatorId: Snowflake
	/** the rule event type */
	eventType: 1
	/** the rule trigger type */
	triggerType: TriggerType
	/** the rule trigger metadata */
	triggerMetadata: TriggerMetadata
	/** the actions which will execute when the rule is triggered */
	actions: AutomodAction[]
	/** whether the rule is enabled */
	enabled: boolean
	/** the role ids that should not be affected by the rule (Maximum of 20) */
	exemptRoles: Snowflake[]
	/** the channel ids that should not be affected by the rule (Maximum of 50) */
	exemptChannels: Snowflake[]
}
/** An action which will execute whenever a rule is triggered. */
export type AutomodAction = {
	/** the type of action */
	type: 1 | 2 | 3
	/** additional metadata needed during execution for this specific action type */
	metadata?: AutomodActionMetadata
}
/** Additional data used when an action is executed. */
export type AutomodActionMetadata = {
	/** channel to which user content should be logged */
	channelId: Snowflake
	/** timeout duration in seconds */
	durationSeconds: number
	/** additional explanation that will be shown to members whenever their message is blocked */
	customMessage?: string
}
export type TriggerMetadata = {
	/** substrings which will be searched for in content (Maximum of 1000) */
	keywordFilter?: string[]
	/** regular expression patterns which will be matched against content (Maximum of 10) */
	regexPatterns?: string[]
	/** the internally pre-defined wordsets which will be searched for in content */
	presets?: (1 | 2 | 3)[]
	/** substrings which should not trigger the rule (Maximum of 100 or 1000) */
	allowList?: string[]
	/** total number of unique role and user mentions allowed per message (Maximum of 50) */
	mentionTotalLimit?: number
}
/** Snowflake  ID */
export type Snowflake = `${bigint}`
/** Used to represent a user's voice connection status. */
export type VoiceState = {
	/** the guild id this voice state is for */
	guildId?: Snowflake
	/** the channel id this user is connected to */
	channelId: Snowflake | null
	/** the user id this voice state is for */
	userId: Snowflake
	/** the guild member this voice state is for */
	member?: GuildMember
	/** the session id for this voice state */
	sessionId: string
	/** whether this user is deafened by the server */
	deaf: boolean
	/** whether this user is muted by the server */
	mute: boolean
	/** whether this user is locally deafened */
	selfDeaf: boolean
	/** whether this user is locally muted */
	selfMute: boolean
	/** whether this user is streaming using "Go Live" */
	selfStream?: boolean
	/** whether this user's camera is enabled */
	selfVideo: boolean
	/** whether this user's permission to speak is denied */
	supress: boolean
	/** the time at which the user requested to speak */
	requestToSpeakTimestamp: string | null
}
/** A Stage Instance holds information about a live stage. */
export type StageInstance = {
	/** The id of this Stage instance */
	id: Snowflake
	/** The guild id of the associated Stage channel */
	guildId: Snowflake
	/** The id of the associated Stage channel */
	channelId: Snowflake
	/** The topic of the Stage instance (1-120 characters) */
	topic: string
	/** The privacy level of the Stage instance */
	privacyLevel: StageInstancePrivacyLevel
	/** Whether or not Stage Discovery is disabled **(deprecated)** */
	discoverableDisabled: boolean
	/** The id of the scheduled event for this Stage instance */
	guildScheduledEventId: Snowflake | null
}
export type StageInstancePrivacyLevel = 1 | 2
export type AuditLogEntry = {
	/** ID of the affected entity (webhook, user, role, etc.) */
	targetId: string | null
	/** Changes made to the target_id */
	changes?: AuditLogChange[]
	/** User or app that made the changes */
	userId: Snowflake | null
	/** ID of the entry */
	id: Snowflake
	/** Type of action that occurred */
	actionType: number
	/** Additional info for certain event types */
	options?: OptionalAuditEntryInfo
	/** Reason for the change (1-512 characters) */
	reason?: string
}
export type AuditLogChange = 
   { key: 'name', newValue?: string, oldValue?: string } |
   { key: 'description', newValue?: string, oldValue?: string } |
   { key: 'icon_hash', newValue?: string, oldValue?: string } |
   { key: 'image_hash', newValue?: string, oldValue?: string } |
   { key: 'splash_hash', newValue?: string, oldValue?: string } |
   { key: 'discovery_splash_hash', newValue?: string, oldValue?: string } |
   { key: 'banner_hash', newValue?: string, oldValue?: string } |
   { key: 'owner_id', newValue?: Snowflake, oldValue?: Snowflake } |
   { key: 'region', newValue?: string, oldValue?: string } |
   { key: 'preferred_locale', newValue?: string, oldValue?: string } |
   { key: 'afk_channel_id', newValue?: Snowflake, oldValue?: Snowflake } |
   { key: 'afk_timeout', newValue?: number, oldValue?: number } |
   { key: 'rules_channel_id', newValue?: Snowflake, oldValue?: Snowflake } |
   { key: 'public_updates_channel_id', newValue?: Snowflake, oldValue?: Snowflake } |
   { key: 'mfa_level', newValue?: MfaLevel, oldValue?: MfaLevel } |
   { key: 'verification_level', newValue?: VerificationLevel, oldValue?: VerificationLevel } |
   { key: 'explicit_content_filter', newValue?: ExplicitContentFilter, oldValue?: ExplicitContentFilter } |
   { key: 'default_message_notifications', newValue?: DefaultMessageNotifications, oldValue?: DefaultMessageNotifications } |
   { key: 'vanity_url_code', newValue?: string, oldValue?: string } |
   { key: '$add', newValue?: Role[], oldValue?: Role[] } |
   { key: '$remove', newValue?: Role[], oldValue?: Role[] } |
   { key: 'prune_delete_days', newValue?: number, oldValue?: number } |
   { key: 'widget_enabled', newValue?: boolean, oldValue?: boolean } |
   { key: 'widget_channel_id', newValue?: Snowflake, oldValue?: Snowflake } |
   { key: 'system_channel_id', newValue?: Snowflake, oldValue?: Snowflake } |
   { key: 'position', newValue?: number, oldValue?: number } |
   { key: 'topic', newValue?: string, oldValue?: string } |
   { key: 'bitrate', newValue?: number, oldValue?: number } |
   { key: 'permission_overwrites', newValue?: Overwrite[], oldValue?: Overwrite[] } |
   { key: 'nsfw', newValue?: boolean, oldValue?: boolean } |
   { key: 'application_id', newValue?: Snowflake, oldValue?: Snowflake } |
   { key: 'rate_limit_per_user', newValue?: number, oldValue?: number } |
   { key: 'permissions', newValue?: string, oldValue?: string } |
   { key: 'color', newValue?: number, oldValue?: number } |
   { key: 'hoist', newValue?: boolean, oldValue?: boolean } |
   { key: 'mentionable', newValue?: boolean, oldValue?: boolean } |
   { key: 'allow', newValue?: string, oldValue?: string } |
   { key: 'deny', newValue?: string, oldValue?: string } |
   { key: 'code', newValue?: string, oldValue?: string } |
   { key: 'channel_id', newValue?: Snowflake, oldValue?: Snowflake } |
   { key: 'inviter_id', newValue?: Snowflake, oldValue?: Snowflake } |
   { key: 'max_uses', newValue?: number, oldValue?: number } |
   { key: 'uses', newValue?: number, oldValue?: number } |
   { key: 'max_age', newValue?: number, oldValue?: number } |
   { key: 'temporary', newValue?: boolean, oldValue?: boolean } |
   { key: 'deaf', newValue?: boolean, oldValue?: boolean } |
   { key: 'mute', newValue?: boolean, oldValue?: boolean } |
   { key: 'nick', newValue?: string, oldValue?: string } |
   { key: 'avatar_hash', newValue?: string, oldValue?: string } |
   { key: 'id', newValue?: Snowflake, oldValue?: Snowflake } |
   { key: 'type', newValue?: number | string, oldValue?: number | string } |
   { key: 'enable_emoticons', newValue?: boolean, oldValue?: boolean } |
   { key: 'expire_behavior', newValue?: IntegrationExpireBehavior, oldValue?: IntegrationExpireBehavior } |
   { key: 'expire_grace_period', newValue?: number, oldValue?: number } |
   { key: 'user_limit', newValue?: number, oldValue?: number } |
   { key: 'privacy_level', newValue?: StageInstancePrivacyLevel, oldValue?: StageInstancePrivacyLevel } |
   { key: 'tags', newValue?: string, oldValue?: string } |
   { key: 'format_type', newValue?: Sticker, oldValue?: StickerFormatType } |
   { key: 'asset', newValue?: '', oldValue?: '' } |
   { key: 'available', newValue?: boolean, oldValue?: boolean } |
   { key: 'guild_id', newValue?: Snowflake, oldValue?: Snowflake } |
   { key: 'archived', newValue?: boolean, oldValue?: boolean } |
   { key: 'locked', newValue?: boolean, oldValue?: boolean } |
   { key: 'auto_archive_duration', newValue?: number, oldValue?: number } |
   { key: 'default_auto_archive_duration', newValue?: number, oldValue?: number } |
   { key: 'entity_type', newValue?: GuildScheduledEventEntityType, oldValue?: GuildScheduledEventEntityType } |
   { key: 'status', newValue?: GuildScheduledEventStatus, oldValue?: GuildScheduledEventStatus } |
   { key: 'location', newValue?: string, oldValue?: string } |
   { key: 'communication_disabled_until', newValue?: string, oldValue?: string } |
   { key: 'trigger_type', newValue?: TriggerType, oldValue?: TriggerType } |
   { key: 'event_type', newValue?: EventType, oldValue?: EventType } |
   { key: 'trigger_metadata', newValue?: TriggerMetadata, oldValue?: TriggerMetadata } |
   { key: 'actions', newValue?: AutomodAction[], oldValue?: AutomodAction[] } |
   { key: 'enabled', newValue?: boolean, oldValue?: boolean } |
   { key: 'exempt_roles', newValue?: Snowflake[], oldValue?: Snowflake[] } |
   { key: 'exempt_channels', newValue?: Snowflake[], oldValue?: Snowflake[] };

export type OptionalAuditEntryInfo = {
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
export type OAuth2Scope =
	| 'activities.read'
	| 'activities.write'
	| 'applications.builds.read'
	| 'applications.builds.upload'
	| 'applications.commands'
	| 'applications.commands.update'
	| 'applications.commands.permissions.update'
	| 'applications.entitlements'
	| 'applications.store.update'
	| 'bot'
	| 'connections'
	| 'dm_channels.read'
	| 'email'
	| 'gdm.join'
	| 'guilds'
	| 'guilds.join'
	| 'guilds.members.read'
	| 'identify'
	| 'messages.read'
	| 'relationships.read'
	| 'role_connections.write'
	| 'rpc'
	| 'rpc.activities.write'
	| 'rpc.notifications.read'
	| 'rpc.voice.read'
	| 'rpc.voice.write'
	| 'voice'
	| 'webhook.incoming'
export type Integration = {
	id: Snowflake
	name: string
	type: string
	enabled: boolean
	syncing?: boolean
	roleId?: Snowflake
	enableEmoticons?: boolean
	expireBehavior?: 0 | 1
	expireGracePeriod?: number
	user?: User
	account: Account
	syncedAt?: string
	subscriberCount?: number
	revoked?: boolean
	application?: IntegrationApplication
	scopes?: OAuth2Scope[]
}
export type Account = {
	/** id of the account */
	id: string
	/** name of the account */
	name: string
}
export type IntegrationApplication = {
	/** the id of the app */
	id: Snowflake
	/** the name of the app */
	name: string
	/** the icon hash of the app */
	icon: string | null
	/** the description of the app */
	description: string
	/** the bot associated with this application */
	bot?: User
}
export type Interaction = {
	/** ID of the interaction */
	id: Snowflake
	/** ID of the application this interaction is for */
	applicationId: Snowflake
	/** Type of interaction */
	type: 1 | 2 | 3 | 4 | 5
	/** Interaction data payload */
	data?: InteractionData
	/** Guild that the interaction was sent from */
	guildId?: Snowflake
	/** Channel that the interaction was sent from */
	channel?: Partial<Channel>
	/** Channel that the interaction was sent from */
	channelId?: Snowflake
	/** Guild member data for the invoking user, including permissions */
	member?: GuildMember
	/** User object for the invoking user, if invoked in a DM */
	user?: User
	/** Continuation token for responding to the interaction */
	token: string
	/** Read-only property, always `1` */
	version: number
	/** For components, the message they were attached to */
	message?: Message
	/** Bitwise set of permissions the app or bot has within the channel the interaction was sent from */
	appPermissions?: string
	/** Selected language of the invoking user */
	locale?: string
	/** Guild's preferred locale, if invoked in a guild */
	guildLocale?: string
}
export type InteractionData = {
	/** the ID of the invoked command */
	id: Snowflake
	/** the `name` of the invoked command */
	name: string
	/** the type of the invoked command */
	type: number
	/** converted users + roles + channels + attachments */
	resolved?: ResolvedData
	/** the params + values from the user */
	options?: CommandInteractionDataOption[]
	/** the id of the guild the command is registered to */
	guildId?: Snowflake
	/** id of the user or message targeted by a user or message command */
	targetId?: Snowflake
}
export type ResolvedData = {
	/** the ids and User objects */
	users?: { [key: Snowflake]: User }
	/** the ids and partial Member objects */
	members?: { [key: Snowflake]: Partial<GuildMember> }
	/** the ids and Role objects */
	roles?: { [key: Snowflake]: Role }
	/** the ids and partial Channel objects */
	channels?: { [key: Snowflake]: Partial<Channel> }
	/** the ids and partial Message objects */
	messages?: { [key: Snowflake]: Partial<Message> }
	/** the ids and attachment objects */
	attachments?: { [key: Snowflake]: Attachment }
}
export type CommandInteractionDataOption = {
	/** Name of the parameter */
	name: string
	/** Value of application command option type */
	type: number
	/** Value of the option resulting from user input */
	value?: string | number | boolean
	/** Present if this option is a group or subcommand */
	options?: CommandInteractionDataOption[]
	/** true if this option is the currently focused option for autocomplete */
	focused?: boolean
}
export type InviteMetadata = {
	/** number of times this invite has been used */
	uses: number
	/** max number of times this invite can be used */
	maxUses: number
	/** duration (in seconds) after which the invite expires */
	maxAge: number
	/** whether this invite only grants temporary membership */
	temporary: boolean
	/** when this invite was created */
	createdAt: string
}
export type GuildFeature =
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
export type MutableGuildFeature =
	| 'COMMUNITY'
	| 'DISCOVERABLE'
	| 'INVITES_DISABLED'
	| 'RAID_ALERTS_DISABLED'
export type AuditLog = {
	/** List of application commands referenced in the audit log */
	applicationCommands: Command
	/** List of audit log entries, sorted from most to least recent */
	auditLogEntries: AuditLogEntry[]
	/** List of auto moderation rules referenced in the audit log */
	autoModerationRules: AutomodRule[]
	/** List of guild scheduled events referenced in the audit log */
	guildScheduledEvents: GuildScheduledEvent
	/** List of partial integration objects */
	integrations: Partial<Integration>
	/** List of threads referenced in the audit log */
	threads: Channel[]
	/** List of users referenced in the audit log */
	users: User[]
	/** List of webhooks referenced in the audit log */
	webhooks: Webhook[]
}
export type Webhook = {
	/** the id of the webhook */
	id: Snowflake
	/** the type of the webhook */
	type: 1 | 2 | 3
	/** the guild id this webhook is for, if any */
	guildId?: Snowflake | null
	/** the channel id this webhook is for, if any */
	channelId: Snowflake | null
	/** the user this webhook was created by (not returned when getting a webhook with its token) */
	user?: User
	/** the default name of the webhook */
	name: string | null
	/** the default user avatar hash of the webhook */
	avatar: string | null
	/** the secure token of the webhook (returned for Incoming Webhooks) */
	token?: string
	/** the bot/OAuth2 application that created this webhook */
	applicationId: Snowflake | null
	/** the guild of the channel that this webhook is following (returned for Channel Follower Webhooks) */
	sourceGuild?: Partial<Guild>
	/** the channel that this webhook is following (returned for Channel Follower Webhooks) */
	sourceChannel?: Partial<Channel>
	/** the url used for executing the webhook (returned by the webhooks OAuth2 flow) */
	url?: string
}
export type Ban = {
	/** the reason for the ban */
	reason: string | null
	/** the banned user */
	user: User
}
export type WidgetSettings = {
	/** whether the widget is enabled */
	enabled: boolean
	/** the widget channel id */
	channelId: Snowflake | null
}
export type Widget = {
	/** guild id */
	id: Snowflake
	/** guild name (2-100 characters) */
	name: string
	/** instant invite for the guilds specified widget invite channel */
	instantInvite: string | null
	/** voice and stage channels which are accessible by @everyone */
	channels: Partial<Channel>[]
	/** special widget user objects that includes users presence (Limit 100) */
	members: Partial<User>[]
	/** number of online members in this guild */
	presenceCount: number
}
export type WidgetImageStyle =
	| 'shield'
	| 'banner1'
	| 'banner2'
	| 'banner3'
	| 'banner4'
export type LocaleObject = {
	/** Indonesian, Bahasa Indonesia */
	id?: string
	/** Danish, Dansk */
	da?: string
	/** German, Deutsch */
	de?: string
	/** English (UK) */
	'en-GB'?: string
	/** English (US) */
	'en-US'?: string
	/** Spanish, Español */
	'es-ES'?: string
	/** French, Français */
	fr?: string
	/** Croatian, Hrvatski */
	hr?: string
	/** Italian, Italiano */
	it?: string
	/** Lithuanian, Lietuviškai */
	lt?: string
	/** Hungarian, Magyar */
	hu?: string
	/** Dutch, Nederlands */
	nl?: string
	/** Norwegian, Norsk */
	no?: string
	/** Polish, Polski */
	pl?: string
	/** Portuguese (Brazilian), Português do Brasil */
	'pt-BR'?: string
	/** Romanian (Romania), Română */
	ro?: string
	/** Finnish, Suomi */
	fi?: string
	/** Swedish, Svenska */
	'sv-SE'?: string
	/** Vietnamese, Tiếng Việt */
	vi?: string
	/** Turkish, Türkçe */
	tr?: string
	/** Czech, Čeština */
	cs?: string
	/** Greek, Ελληνικά */
	el?: string
	/** Bulgarian, български */
	bg?: string
	/** Russian, Pусский */
	ru?: string
	/** Ukrainian, Українська */
	uk?: string
	/** Hindi, हिन्दी */
	hi?: string
	/** Thai, ไทย */
	th?: string
	/** Chinese (China), 中文 */
	'zh-CN'?: string
	/** Japanese, 日本語 */
	ja?: string
	/** Chinese (Taiwan), 繁體中文 */
	'zh-TW'?: string
	/** Korean, 한국어 */
	ko?: string
}
export type CommandType = 1 | 2 | 3
export type InteractionResponse =
	| {
			/** ACK a Ping */
			type: 1
	  }
	| {
			type: 4 | 5 | 6 | 7
			data: InteractionCallbackDataMessage
	  }
	| {
			/** respond to an autocomplete interaction with suggested choices */
			type: 8
			data: InteractionCallbackDataAutocomplete
	  }
	| {
			/** respond to an interaction with a popup modal */
			type: 9
			data: InteractionCallbackDataModal
	  }
/**
 * 0 - guild has no MFA/2FA requirement for moderation actions
 * 
 * 1 - guild has a 2FA requirement for moderation actions
 */
export type MfaLevel = 0 | 1
/**
 * 0 - unrestricted
 * 
 * 1 - must have verified email on account
 * 
 * 2 - must be registered on Discord for longer than 5 minutes
 * 
 * 3 - must be a member of the server for longer than 10 minutes
 * 
 * 4 - must have a verified phone number
 */
export type VerificationLevel = 0 | 1 | 2 | 3 | 4
/**
 * media content will not be scanned
 * 
 * media content sent by members without roles will be scanned
 * 
 * media content sent by all members will be scanned
 */
export type ExplicitContentFilter = 0 | 1 | 2
/**
 * 0 - members will receive notifications for all messages by default
 * 
 * 1 - members will receive notifications only for messages that @mention them by default
 */
export type DefaultMessageNotifications = 0 | 1
export type Template = {
	/** the template code (unique ID) */
	code: string
	/** template name */
	name: string
	/** the description for the template */
	description: string | null
	/** number of times this template has been used */
	usageCount: number
	/** the ID of the user who created the template */
	creatorId: Snowflake
	/** the user who created the template */
	creator: User
	/** when this template was created */
	createdAt: string
	/** when this template was last synced to the source guild */
	updatedAt: string
	/** the ID of the guild this template is based on */
	sourceGuildId: Snowflake
	/** the guild snapshot this template contains */
	serializedSourceGuild: Partial<Guild>
	/** whether the template has unsynced changes */
	isDirty: boolean | null
}
/** Represents a pack of standard stickers */
export type StickerPack = {
	/** id of the sticker pack */
	id: Snowflake
	/** the stickers in the pack */
	stickers: Sticker[]
	/** name of the sticker pack */
	name: string
	/** id of the pack's SKU */
	skuId: Snowflake
	/** id of a sticker in the pack which is shown as the pack's icon */
	coverStickerId?: Snowflake
	/** description of the sticker pack */
	description: string
	/** id of the sticker pack's banner image */
	bannerAssetId?: Snowflake
}

/**
 * 0 - Remove role
 * 
 * 1 - Kick
 */
export type IntegrationExpireBehavior = 0 | 1
/**
 * 1 - PNG
 * 
 * 2 - APNG
 * 
 * 3 - LOTTIE
 * 
 * 4 - GIF
 */
export type StickerFormatType = 1 | 2 | 3 | 4
/**
 * 1 - check if content contains words from a user defined list of keywords	(max 6)
 * 
 * 3 - check if content represents generic spam	 (max 1)
 * 
 * 4 - check if content contains words from internal pre-defined wordsets (max 1)
 * 
 * 5 - check if content contains more unique mentions than allowed (max 1)
 */
export type TriggerType = 1 | 3 | 4 | 5
/**
 * 1 - when a member sends or edits a message in the guild
 */
export type EventType = 1
/**
 * Channel type
 * 
 * See [discord.dev](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
 */
export type ChannelType = 0 | 1 | 2 | 3 | 4 | 5 | 10 | 11 | 12 |13 | 14 | 15 | 16
export type Duration = 60 | 1440 | 4320 | 10800