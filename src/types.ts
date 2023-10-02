import type {
	ButtonStyle,
	ComponentType,
	MembershipState,
	SelectType
} from './enums'
import type { TextInputStyle } from './api/responses'
import type { ChannelType } from './api/channels'
import type { ActivityType } from './api/messages'
import type { User } from './api/users'
import type { Emoji } from './api/emojis'

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
	membershipState: MembershipState
	/** will always be ["*"] */
	permissions: string[]
	/** the id of the parent team of which they are a member */
	teamId: Snowflake
	/** the avatar, discriminator, id, and username of the user */
	user: Partial<User>
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
	type: ComponentType.ActionRow
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
	type: ComponentType.Button
	/** A button style */
	style: ButtonStyle
	/** Text that appears on the button; max 80 characters */
	label?: string
	/** `name`, `id`, and `animated` */
	emoji?: Partial<Emoji>
	/** Developer-defined identifier for the button; max 100 characters */
	customId?: string
	/** URL for link-style buttons */
	url?: string
	/** Whether the button is disabled (defaults to false) */
	disabled?: boolean
}
/** Text inputs are an interactive component that render on modals. They can be used to collect short-form or long-form text. */
export type TextInput = {
	/** 4 for a text input */
	type: ComponentType.TextInput
	/** Developer-defined identifier for the input; max 100 characters */
	customId: string
	/** The Text Input Style ( `1`: Short, `2`: Paragraph) */
	style: TextInputStyle
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
	type: SelectType
	/** ID for the select menu; max 100 characters */
	customId: string
	/** Specified choices in a select menu (only required and available for string selects (type `3`); max 25 */
	options?: SelectOption[]
	/** List of channel types to include in the channel select component (type `8`) */
	channelTypes?: ChannelType
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

export type ChannelMention = {
	/** id of the channel */
	id: Snowflake
	/** id of the guild containing the channel */
	guildId: Snowflake
	/** the type of channel */
	type: ChannelType
	/** the name of the channel */
	name: string
}
export type MessageActivity = {
	/** type of message activity */
	type: ActivityType
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
	type: ActivityType
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
	/** Activity flags `OR`d together, describes what the payload includes */
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
/** Snowflake ID */
export type Snowflake = `${bigint}`
export type Duration = 60 | 1440 | 4320 | 10800
export type Timeout = 60 | 300 | 900 | 1800 | 3600
