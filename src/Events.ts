import {
	Application,
	AutomodRule,
	Channel,
	CommandPermission,
	Snowflake,
	UnavailableGuild,
	User,
	ThreadMember,
	Guild,
	GuildMember,
	Presence,
	GuildScheduledEvent,
	VoiceState,
	StageInstance,
	AuditLogEntry,
	Emoji,
	Sticker,
	Role,
	Integration,
	Message,
	Activity,
	Interaction
} from './types'
namespace Events {
	/** Sent on connection to the websocket (discord.listen()). Defines the heartbeat interval that an app should heartbeat to. */
	export type Hello = {
		/** Interval (in milliseconds) an app should heartbeat with */
		heartbeat_interval: number
	}
	/** The ready event is dispatched when a client has completed the initial handshake with the gateway (for new sessions). */
	export type Ready = {
		/** API version */
		v: number
		/** Information about the user including email */
		user: User
		/** Guilds the user is in */
		guilds: UnavailableGuild[]
		/** Used for resuming connections */
		session_id: string
		/** Gateway URL for resuming connections */
		resume_gateway_url: string
		/** Shard information associated with this session, if sent when identifying */
		shard?: [
			/** shard_id */
			number,
			/** num_shards */
			number
		]
		/** Contains id and flags */
		application: Partial<Application>
	}
	export type Resumed = null
	export type Reconnect = null
	export type InvalidSession = boolean
	/** sent when an application command's permissions are updated */
	export type CommandPermissionsUpdate = CommandPermission
	/** Sent when a rule is created */
	export type AutomodRuleCreate = AutomodRule
	/** Sent when a rule is created */
	export type AutomodRuleUpdate = AutomodRule
	/** Sent when a rule is created */
	export type AutomodRuleDelete = AutomodRule

	/** Sent when a new guild channel is created, relevant to the current user. */
	export type ChannelCreate = Channel
	/** Sent when a channel is updated. */
	export type ChannelUpdate = Channel
	/** Sent when a channel relevant to the current user is deleted. */
	export type ChannelDelete = Channel
	/** Sent when a thread is created, relevant to the current user, or when the current user is added to a thread. */
	export type ThreadCreate = Channel
	/** Sent when a thread is updated. */
	export type ThreadUpdate = Channel
	/** Sent when a thread relevant to the current user is deleted. */
	export type ThreadDelete = Channel
	/** Sent when the current user gains access to a channel. */
	export type ThreadListSync = {
		/** ID of the guild */
		guild_id: Snowflake
		/** 	Parent channel IDs whose threads are being synced. If omitted, then threads were synced for the entire guild. This array may contain channel_ids that have no active threads as well, so you know to clear that data. */
		channel_ids?: Snowflake[]
		/** All active threads in the given channels that the current user can access */
		threads: Channel[]
		/** All thread member objects from the synced threads for the current user, indicating which threads the current user has been added to */
		members: ThreadMember[]
	}
	/** Sent when the thread member object for the current user is updated.  */
	export type ThreadMemberUpdate = {
		/** ID of the guild */
		guild_id: Snowflake
	} & ThreadMember
	/** Sent when anyone is added to or removed from a thread. */
	export type ThreadMembersUpdate = {
		/** ID of the thread */
		id: Snowflake
		/** ID of the guild */
		guild_id: Snowflake
		/** Approximate number of members in the thread, capped at 50 */
		member_count: number
		/** Users who were added to the thread */
		added_members?: ThreadMember[]
		/** 	ID of the users who were removed from the thread */
		removed_member_ids?: Snowflake[]
	}
	/** Sent when a message is pinned or unpinned in a text channel. This is not sent when a pinned message is deleted. */
	export type ChannelPinsUpdate = {
		/** ID of the guild */
		guild_id?: Snowflake
		/** ID of the channel */
		channel_id: Snowflake
		/** 	Time at which the most recent pinned message was pinned */
		last_pin_timestamp?: string | null
	}
	/** Sent when initially connecting, when a guild becomes available, or when the user joins a guild */
	export type GuildCreate =
		| ({
				/** When this guild was joined at */
				joined_at: string
				/** true if this is considered a large guild */
				large: boolean
				/** true if this guild is unavailable due to an outage */
				unavailable?: boolean
				/** Total number of members in this guild */
				member_count: number
				/** States of members currently in voice channels; lacks the guild_id key */
				voice_states: Partial<VoiceState>
				/** Users in the guild */
				members: GuildMember[]
				/** Channels in the guild */
				channels: Channel[]
				/** All active threads in the guild that current user has permission to view */
				threads: Channel[]
				/** Presences of the members in the guild, will only include non-offline members if the size is greater than large threshold */
				presences: Partial<Presence>[]
				/** Stage instances in the guild */
				stage_instances: StageInstance[]
				/** Scheduled events in the guild */
				guild_scheduled_events: GuildScheduledEvent[]
		  } & Guild)
		| UnavailableGuild
	/** Sent when a guild is updated. */
	export type GuildUpdate = Guild
	/** Sent when a guild becomes or was already unavailable due to an outage, or when the user leaves or is removed from a guild. */
	export type GuildDelete = UnavailableGuild
	/** Sent when a guild audit log entry is created. */
	export type AuditlogEntryCreate = AuditLogEntry
	/** Sent when a user is banned from a guild. */
	export type BanAdd = {
		guild_id: Snowflake
		user: User
	}
	/** Sent when a user is unbanned from a guild. */
	export type BanRemove = {
		/** ID of the guild */
		guild_id: Snowflake
		/** User who was unbanned */
		user: User
	}
	/** Sent when a guild's emojis have been updated. */
	export type EmojisUpdate = {
		/** ID of the guild */
		guild_id: Snowflake
		/** Array of emojis */
		emojis: Emoji[]
	}
	/** Sent when a guild's stickers have been updated. */
	export type StickersUpdate = {
		/** ID of the guild */
		guild_id: Snowflake
		/** Array of stickers */
		stickers: Sticker[]
	}
	/** Sent when a guild integration is updated. */
	export type IntegrationsUpdate = {
		/** ID of the guild whose integrations were updated */
		guild_id: Snowflake
	}
	/** Sent when a new user joins a guild. */
	export type MemberAdd = {
		/** ID of the guild */
		guild_id: Snowflake
	} & GuildMember
	/** Sent when a user is removed from a guild (leave/kick/ban). */
	export type MemberRemove = {
		/** ID of the guild */
		guild_id: Snowflake
		/** User who was removed */
		user: User
	}
	/** Sent when a guild member is updated. */
	export type MemberUpdate = {
		/** ID of the guild */
		guild_id: Snowflake
		/** User role ids */
		roles: Snowflake[]
		/** User */
		user: User
		/** Nickname of the user in the guild */
		nick?: string | null
		/** Member's guild avatar hash */
		avatar: string | null
		/** When the user joined the guild */
		joined_at: string | null
		/** When the user starting boosting the guild */
		premium_since?: string | null
		/** Whether the user is deafened in voice channels */
		deaf?: boolean
		/** Whether the user is muted in voice channels */
		mute?: boolean
		/** Whether the user has not yet passed the guild's Membership Screening requirements */
		pending?: boolean
		/** When the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out */
		communication_disabled_until?: string | null
	}
	/** Sent in response to Guild Request Members. */
	export type MembersChunk = {
		/** ID of the guild */
		guild_id: Snowflake
		/** Set of guild members */
		members: GuildMember[]
		/** Chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count) */
		chunk_index: number
		/** Total number of expected chunks for this response */
		chunk_count: number
		/** When passing an invalid ID to `REQUEST_GUILD_MEMBERS`, it will be returned here */
		not_found?: any[]
		/** When passing `true` to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here */
		presences?: Presence[]
		/** Nonce used in the Guild Members Request */
		nonce?: string
	}
	/** Sent when a guild role is created. */
	export type RoleCreate = {
		/** ID of the guild */
		guild_id: Snowflake
		/** Role that was created */
		role: Role
	}
	/** Sent when a guild role is updated. */
	export type GuildRole = {
		/** ID of the guild */
		guild_id: Snowflake
		/** Role that was updated */
		role: Role
	}
	/** Sent when a guild role is deleted. */
	export type RoleDelete = {
		/** ID of the guild */
		guild_id: Snowflake
		/** ID of the role */
		role_id: Snowflake
	}
	/** Sent when a guild scheduled event is created. */
	export type ScheduledeventCreate = GuildScheduledEvent
	/** Sent when a guild scheduled event is updated. */
	export type ScheduledeventUpdate = GuildScheduledEvent
	/** Sent when a guild scheduled event is deleted. */
	export type ScheduledeventDelete = GuildScheduledEvent
	/** Sent when a user has subscribed to a guild scheduled event. */
	export type ScheduledeventUserAdd = {
		/** ID of the guild scheduled event */
		guild_scheduled_event_id: Snowflake
		/** ID of the user */
		user_id: Snowflake
		/** ID of the guild */
		guild_id: Snowflake
	}
	/** Sent when a user has unsubscribed to a guild scheduled event. */
	export type ScheduledeventUserRemove = {
		/** ID of the guild scheduled event */
		guild_scheduled_event_id: Snowflake
		/** ID of the user */
		user_id: Snowflake
		/** ID of the guild */
		guild_id: Snowflake
	}
	/** Sent when an integration is created. */
	export type IntegrationCreate = {
		/** ID of the guild */
		guild_id: Snowflake
	} & Integration
	/** Sent when an integration is updated. */
	export type IntegrationUpdate = {
		/** ID of the guild */
		guild_id: Snowflake
	} & Integration
	/** Sent when an integration is deleted. */
	export type IntegrationDelete = {
		/** Integration ID */
		id: Snowflake
		/** ID of the guild */
		guild_id: Snowflake
		/** ID of the bot/OAuth2 application for this discord integration */
		application_id?: Snowflake
	} & Integration
	/** Sent when a new invite to a channel is created. */
	export type InviteCreate = {
		/** Channel the invite is for */
		channel_id: Snowflake
		/** Unique invite code */
		code: string
		/** Time at which the invite was created */
		created_at: string
		/** Guild of the invite */
		guild_id?: Snowflake
		/** User that created the invite */
		inviter?: User
		/** How long the invite is valid for (in seconds) */
		max_age: number
		/** Maximum number of times the invite can be used */
		max_uses: number
		/** Type of target for this voice channel invite */
		target_type?: number
		/** User whose stream to display for this voice channel stream invite */
		target_user?: User
		/** Embedded application to open for this voice channel embedded application invite */
		target_application: Partial<Application>
		/** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
		temporary: boolean
		/** How many times the invite has been used (always will be 0) */
		uses: number
	}
	/** Sent when an invite is deleted. */
	export type InviteDelete = {
		/** Channel of the invite */
		channel_id: Snowflake
		/** Guild of the invite */
		guild_id?: Snowflake
		/** Unique invite code */
		code: string
	}
	/** Sent when a message is created. */
	export type MessageCreate = {
		/** ID of the guild the message was sent in - unless it is an ephemeral message */
		guild_id?: Snowflake
		/** Member properties for this message's author. Missing for ephemeral messages and messages from webhooks */
		member?: Partial<GuildMember>
		/** Users specifically mentioned in the message */
		mentions: (User & { member: Partial<GuildMember> })[]
	} & Message
	/** Sent when a message is updated. */
	export type MessageUpdate = {
		/** ID of the guild the message was sent in - unless it is an ephemeral message */
		guild_id?: Snowflake
		/** Member properties for this message's author. Missing for ephemeral messages and messages from webhooks */
		member?: Partial<GuildMember>
		/** Users specifically mentioned in the message */
		mentions: (User & { member: Partial<GuildMember> })[]
	} & Pick<Message, 'id' | 'channel_id'> &
		Partial<Message>
	/** Sent when a message is deleted. */
	export type MessageDelete = {
		/** ID of the message */
		id: Snowflake
		/** ID of the channel */
		channel_id: Snowflake
		/** ID of the guild */
		guild_id?: Snowflake
	}
	/** Sent when multiple messages are deleted at once. */
	export type MessageDeleteBulk = {
		/** IDs of the messages */
		ids: Snowflake[]
		/** ID of the channel */
		channel_id: Snowflake
		/** ID of the guild */
		guild_id?: Snowflake
	}
	/** Sent when a user adds a reaction to a message. */
	export type MessageReactionAdd = {
		/** ID of the user */
		user_id: Snowflake
		/** ID of the channel */
		channel_id: Snowflake
		/** ID of the message */
		message_id: Snowflake
		/** ID of the guild */
		guild_id?: Snowflake
		/** Member who reacted if this happened in a guild */
		member?: GuildMember
		/** Emoji used to react */
		emoji: Partial<Emoji>
	}
	/** Sent when a user removes a reaction from a message. */
	export type MessageReactionRemove = {
		/** ID of the user */
		user_id: Snowflake
		/** ID of the channel */
		channel_id: Snowflake
		/** ID of the message */
		message_id: Snowflake
		/** ID of the guild */
		guild_id?: Snowflake
		/** Member who reacted if this happened in a guild */
		member?: GuildMember
		/** Emoji used to react */
		emoji: Partial<Emoji>
	}
	/** Sent when a user explicitly removes all reactions from a message. */
	export type MessageReactionRemoveAll = {
		/** ID of the channel */
		channel_id: Snowflake
		/** ID of the message */
		message_id: Snowflake
		/** ID of the guild */
		guild_id?: Snowflake
	}
	/** Sent when a bot removes all instances of a given emoji from the reactions of a message. */
	export type MessageReactionRemoveEmoji = {
		/** ID of the channel */
		channel_id: Snowflake
		/** ID of the guild */
		guild_id?: Snowflake
		/** ID of the message */
		message_id: Snowflake
		/** Emoji that was removed */
		emoji: Partial<Emoji>
	}

	/** A user's presence is their current state on a guild. This event is sent when a user's presence or info, such as name or avatar, is updated. */
	export type PresenceUpdate = {
		/** User whose presence is being updated */
		user: User
		/** ID of the guild */
		guild_id: Snowflake
		/** ID of the guild */
		status: string
		/** User's current activities */
		activities: Activity[]
		/** User's platform-dependent status */
		client_status: ClientStatus
	}
	type ClientStatus = {
		/** User's status set for an active desktop (Windows, Linux, Mac) application session */
		desktop?: string
		/** User's status set for an active mobile (iOS, Android) application session */
		mobile?: string
		/** User's status set for an active web (browser, bot user) application session */
		web?: string
	}
	/** Sent when a Stage instance is created (i.e. the Stage is now "live"). */
	export type StageInstanceCreate = StageInstance
	/** Sent when a Stage instance has been updated. */
	export type StageInstanceUpdate = StageInstance
	/** Sent when a Stage instance has been deleted (i.e. the Stage has been closed). */
	export type StageInstanceDelete = StageInstance
	/** Sent when a user starts typing in a channel. */
	export type TypingStart = {
		/** ID of the channel */
		channel_id: Snowflake
		/** ID of the guild */
		guild_id?: Snowflake
		/** ID of the user */
		user_id: Snowflake
		/** Unix time (in seconds) of when the user started typing */
		timestamp: number
		/** Member who started typing if this happened in a guild */
		member?: GuildMember
	}
	/** Sent when properties about the current bot's user change. */
	export type UserUpdate = User
	/** Sent when someone joins/leaves/moves voice channels. */
	export type VoiceStateUpdate = VoiceState
	/** Sent when a guild's voice server is updated. This is sent when initially connecting to voice, and when the current voice instance fails over to a new server. */
	export type VoiceServerUpdate = {
		/** Voice connection token */
		token: string
		/** Guild this voice server update is for */
		guild_id: Snowflake
		/** Voice server host */
		endpoint: string | null
	}
	/** Sent when a guild channel's webhook is created, updated, or deleted. */
	export type WebhooksUpdate = {
		/** ID of the guild */
		guild_id: Snowflake
		/** ID of the channel */
		channel_id: Snowflake
	}
	/** Sent when a user uses an Application Command or Message Component. */
	export type InteractionCreate = Interaction
}
export { Events }
