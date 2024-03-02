import request from '../utils/request.js'
import toCamelCase from '../utils/toCamelCase.js'
import { BaseMessage } from './messages.js'

import type {
	AllowedMentions,
	Attachment,
	Component,
	Embed,
	MessageReference,
	Snowflake
} from '../types.js'
import type { User } from './users'
import type { Guild } from './guilds'
import type { Channel } from './channels'
import type { Message } from './messages'
class Webhook {
	id!: Snowflake
	type!: Type
	guildId?: Snowflake | null
	channelId!: Snowflake | null
	user?: User
	name!: string | null
	avatar!: string | null
	token?: string
	applicationId!: Snowflake | null
	sourceGuild?: Partial<Guild>
	sourceChannel?: Partial<Channel>
	url?: string

	withToken: boolean

	/** Gets this webhook
	 *
	 * Also updates this class instance
	 */
	async get(): Promise<Omit<Webhook, 'user'>> {
		const result =
			this.withToken && this.token
				? await withToken.get(this.id, this.token)
				: await get(this.id)
		Object.assign(this, result)
		return result
	}

	/** Updates this webhook
	 *
	 * Also updates this class instance
	 */
	async edit(webhook: EditParams): Promise<Omit<Webhook, 'user'>> {
		const result =
			this.withToken && this.token
				? await withToken.edit(this.id, this.token, webhook)
				: await edit(this.id, webhook)
		Object.assign(this, result)
		return result
	}

	/** Deletes this webhook */
	async delete(): Promise<void> {
		return this.withToken && this.token
			? await withToken.delete(this.id, this.token)
			: await _delete(this.id)
	}

	/** Sends a message to this webhook */
	async execute<Wait extends boolean>(
		message: ExecuteParams,
		options?: ExecuteOptions<Wait>,
		token?: string
	): Promise<WebhookMessage<Wait>> {
		if (!this.token || !token) throw new TypeError('webhook token not found')
		return await execute(this.id, token ?? this.token, message, options)
	}

	constructor(data: unknown, withToken = false) {
		Object.assign(this, toCamelCase(data))

		this.withToken = withToken
	}
}
type NeverIfFalse<B extends boolean, T> = B extends true ? T : never
class WebhookMessage<Wait extends boolean> extends BaseMessage {
	//#region
	id!: NeverIfFalse<Wait, BaseMessage['id']>
	channelId!: NeverIfFalse<Wait, BaseMessage['channelId']>
	author!: NeverIfFalse<Wait, BaseMessage['author']>
	content!: NeverIfFalse<Wait, BaseMessage['content']>
	timestamp!: NeverIfFalse<Wait, BaseMessage['timestamp']>
	editedTimestamp!: NeverIfFalse<Wait, BaseMessage['editedTimestamp']>
	tts!: NeverIfFalse<Wait, BaseMessage['tts']>
	mentionEveryone!: NeverIfFalse<Wait, BaseMessage['mentionEveryone']>
	mentions!: NeverIfFalse<Wait, BaseMessage['mentions']>
	mentionRoles!: NeverIfFalse<Wait, BaseMessage['mentionRoles']>
	mentionChannels?: NeverIfFalse<Wait, BaseMessage['mentionChannels']>
	attachments!: NeverIfFalse<Wait, BaseMessage['attachments']>
	embeds!: NeverIfFalse<Wait, BaseMessage['embeds']>
	reactions!: NeverIfFalse<Wait, BaseMessage['reactions']>
	nonce?: NeverIfFalse<Wait, BaseMessage['nonce']>
	pinned!: NeverIfFalse<Wait, BaseMessage['pinned']>
	type!: NeverIfFalse<Wait, BaseMessage['type']>
	activity?: NeverIfFalse<Wait, BaseMessage['activity']>
	application?: NeverIfFalse<Wait, BaseMessage['application']>
	applicationId?: NeverIfFalse<Wait, BaseMessage['applicationId']>
	flags?: NeverIfFalse<Wait, BaseMessage['flags']>
	interaction?: NeverIfFalse<Wait, BaseMessage['interaction']>
	thread?: NeverIfFalse<Wait, BaseMessage['thread']>
	components?: NeverIfFalse<Wait, BaseMessage['components']>
	stickerItems?: NeverIfFalse<Wait, BaseMessage['stickerItems']>
	stickers?: NeverIfFalse<Wait, BaseMessage['stickers']>
	position?: NeverIfFalse<Wait, BaseMessage['position']>
	roleSubscriptionData?: NeverIfFalse<Wait, BaseMessage['roleSubscriptionData']>
	//#endregion

	messageReference?: MessageReference
	referencedMessage?: NeverIfFalse<Wait, Message | null>

	webhookId: Snowflake
	webhookToken: string
	threadId?: Snowflake

	/** Gets this webhook message
	 *
	 * Also updates this class instance
	 */
	async get(): Promise<Message> {
		const result = await message.get(
			this.webhookId,
			this.webhookToken,
			this.id,
			this.threadId
		)
		Object.assign(this, result)
		return result
	}

	/** Updates this webhook message
	 *
	 * Also updates this class instance
	 */
	async edit(newMessage: EditMessageParams): Promise<Message> {
		const result = await message.edit(
			this.webhookId,
			this.webhookToken,
			this.id,
			newMessage
		)
		Object.assign(this, result)
		return result
	}

	/** Deletes this webhook message */
	async delete(): Promise<void> {
		return await message.delete(this.webhookId, this.webhookToken, this.id)
	}
	constructor(
		data: unknown,
		webhookId: Snowflake,
		webhookToken: string,
		threadId?: Snowflake
	) {
		super(data)

		this.webhookId = webhookId
		this.webhookToken = webhookToken
		this.threadId = threadId
	}
}
/** Creates a new webhook and returns a webhook object on success */
async function create(
	channelId: Snowflake,
	webhook: {
		/** name of the webhook (1-80 characters) */
		name: string
		/** image for the default webhook avatar */
		avatar?: string | null
	}
): Promise<Webhook> {
	return new Webhook(
		await request.post(`channels/${channelId}/webhooks`, webhook)
	)
}
/** Returns a list of channel webhook objects */
async function listChannel(channelId: Snowflake): Promise<Webhook[]> {
	return (
		(await request.get(`channels/${channelId}/webhooks`)) as unknown[]
	).map((v) => new Webhook(v))
}
/** Returns a list of guild webhook objects */
async function listGuild(guildId: Snowflake): Promise<Webhook[]> {
	return ((await request.get(`channels/${guildId}/webhooks`)) as unknown[]).map(
		(v) => new Webhook(v)
	)
}
/** Returns the new webhook object for the given id */
async function get(webhookId: Snowflake): Promise<Webhook> {
	return new Webhook(await request.get(`webhooks/${webhookId}`))
}
type EditParams = {
	/** the default name of the webhook */
	name?: string
	/** image for the default webhook avatar */
	avatar?: string | null
	/** the new channel id this webhook should be moved to */
	channelId?: Snowflake
}
/** Edit a webhook */
async function edit(
	webhookId: Snowflake,
	webhook: EditParams
): Promise<Webhook> {
	return new Webhook(await request.patch(`webhooks/${webhookId}`, webhook))
}
/** Delete a webhook permanently */
async function _delete(webhookId: Snowflake): Promise<void> {
	await request.delete(`webhooks/${webhookId}`)
}
const withToken: {
	get(
		webhookId: Snowflake,
		webhookToken: string
	): Promise<Omit<Webhook, 'user'>>
	edit(
		webhookId: Snowflake,
		webhookToken: string,
		webhook: {
			name?: string
			avatar?: string | null
		}
	): Promise<Omit<Webhook, 'user'>>
	delete(webhookId: Snowflake, webhookToken: string): Promise<void>
} = {
	/** Returns the new webhook object for the given id, doesn't require being logged in, by the webhook token */
	async get(
		webhookId: Snowflake,
		webhookToken: string
	): Promise<Omit<Webhook, 'user'>> {
		return new Webhook(
			await request.get(`webhooks/${webhookId}/${webhookToken}`)
		)
	},
	/** Edit a webhook, doesn't require being logged in, by the webhook token */
	async edit(
		webhookId: Snowflake,
		webhookToken: string,
		webhook: {
			/** the default name of the webhook */
			name?: string
			/** image for the default webhook avatar */
			avatar?: string | null
		}
	): Promise<Omit<Webhook, 'user'>> {
		return new Webhook(
			await request.patch(`webhooks/${webhookId}/${webhookToken}`, webhook)
		)
	},
	/** Delete a webhook permanently, doesn't require being logged in, by the webhook token */
	async delete(webhookId: Snowflake, webhookToken: string): Promise<void> {
		await request.delete(`webhooks/${webhookId}/${webhookToken}`)
	}
}
type ExecuteParams = {
	/** the message contents (up to 2000 characters) */
	content?: string
	/** true if this is a TTS message */
	tts?: boolean
	/** embedded rich content */
	embeds?: Embed[]
	/** allowed mentions for the message */
	allowedMentions?: AllowedMentions
	/** the components to include with the message */
	components?: Component[]
	/** the contents of the file being sent */
	files?: string[]
	/** attachment objects with filename and description */
	attachments?: Partial<Attachment>[]
	/** message flags combined as a bitfield (only SUPPRESS_EMBEDS can be set) */
	flags?: number
	/** name of thread to create (requires the webhook channel to be a forum channel) */
	threadName?: string
} & (
	| { content: string; files?: string[]; embeds?: Embed[] }
	| { content?: string; files: string[]; embeds?: Embed[] }
	| { content?: string; files?: string[]; embeds: Embed[] }
)
type ExecuteOptions<Wait extends boolean> = {
	/** waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error) */
	wait?: Wait
	/** Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived. */
	threadId?: Snowflake
}
/**
 * Sends a message to a webhook
 *
 * Will return a partial WebhookMessage if options.wait is set to false
 */
async function execute<Wait extends boolean>(
	webhookId: Snowflake,
	webhookToken: string,
	data: ExecuteParams & {
		/** override the default username of the webhook */
		username?: string
		/** override the default avatar of the webhook */
		avatarUrl?: string
	},
	options?: ExecuteOptions<Wait>
): Promise<WebhookMessage<Wait>> {
	return new WebhookMessage(
		await request.post(`webhooks/${webhookId}/${webhookToken}`, data, options),
		webhookId,
		webhookToken
	)
}
type EditMessageParams = {
	/** the message contents (up to 2000 characters) */
	content?: string | null
	/** embedded `rich` content */
	embeds?: Embed[] | null
	/** allowed mentions for the message */
	allowedMentions?: AllowedMentions[] | null
	/** the components to include with the message */
	components?: Component[] | null
	/** the contents of the file being sent/edited */
	files?: string[] | null
	/** attached files to keep and possible descriptions for new files */
	attachments?: Partial<Attachment[]> | null
}
const message: {
	get(
		webhookId: Snowflake,
		webhookToken: string,
		messageId: Snowflake,
		threadId?: Snowflake
	): Promise<Message>
	edit(
		webhookId: Snowflake,
		webhookToken: string,
		messageId: Snowflake,
		message: EditMessageParams,
		threadId?: Snowflake
	): Promise<Message>
	delete(
		webhookId: Snowflake,
		webhookToken: string,
		messageId: Snowflake,
		threadId?: Snowflake
	): Promise<void>
} = {
	/** Returns a previously-sent webhook message from the same token */
	async get(
		webhookId: Snowflake,
		webhookToken: string,
		messageId: Snowflake,
		threadId?: Snowflake
	): Promise<Message> {
		return (await request.get(
			`webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
			threadId ? { threadId } : {}
		)) as Message
	},
	/** Edits a previously-sent webhook message from the same token */
	async edit(
		webhookId: Snowflake,
		webhookToken: string,
		messageId: Snowflake,
		message: EditMessageParams,
		threadId?: Snowflake
	): Promise<Message> {
		return (await request.patch(
			`webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
			message,
			threadId ? { threadId } : undefined
		)) as Message
	},
	/** Deletes a message that was created by the webhook */
	async delete(
		webhookId: Snowflake,
		webhookToken: string,
		messageId: Snowflake,
		threadId?: Snowflake
	): Promise<void> {
		await request.delete(
			`webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
			undefined,
			threadId ? { threadId } : undefined
		)
	}
}
export enum Type {
	/** Incoming Webhooks can post messages to channels with a generated token */
	Incoming = 1,
	/** Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels */
	ChannelFollower = 2,
	/** Application webhooks are webhooks used with Interactions */
	Application = 3
}
/** Used to manage webhooks */
export {
	create,
	listChannel,
	listGuild,
	get,
	edit,
	_delete as delete,
	withToken,
	execute,
	message
}
/** Used to manage webhooks */
export default {
	create,
	listChannel,
	listGuild,
	get,
	edit,
	delete: _delete,
	withToken,
	execute,
	message
}

type _Webhook = {
	/** the id of the webhook */
	id: Snowflake
	/** the type of the webhook */
	type: Type
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
export type { _Webhook as Webhook, ExecuteParams }
