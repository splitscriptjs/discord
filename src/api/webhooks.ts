import request from '../utils/request.js'
import {
	AllowedMentions,
	Attachment,
	Component,
	Embed,
	Message,
	Snowflake,
	Webhook as RawWebhook,
	User,
	Guild,
	Channel,
	ChannelMention,
	Reaction,
	MessageActivity,
	Application,
	MessageReference,
	MessageInteraction,
	StickerItem,
	Sticker,
	RoleSubscriptionData
} from '../types.js'
import toCamelCase from '../utils/toCamelCase.js'

class Webhook {
	id!: Snowflake
	type!: 1 | 2 | 3
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
	async get() {
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
	async edit(webhook: EditParams) {
		const result =
			this.withToken && this.token
				? await withToken.edit(this.id, this.token, webhook)
				: await edit(this.id, webhook)
		Object.assign(this, result)
		return result
	}

	/** Deletes this webhook */
	async delete() {
		return this.withToken && this.token
			? await withToken.delete
			: await _delete(this.id)
	}

	/** Sends a message to this webhook */
	async execute<Wait extends boolean>(
		message: ExecuteParams,
		options?: ExecuteOptions<Wait>,
		token?: string
	) {
		if (!this.token || !token) throw new TypeError('webhook token not found')
		return await execute(this.id, token ?? this.token, message, options)
	}

	constructor(data: { [key: string]: any }, withToken = false) {
		Object.assign(this, toCamelCase(data))

		this.withToken = withToken
	}
}
type NeverIfFalse<B extends boolean | false, T> = B extends true ? T : never
type RawWebhookMessage<Wait extends boolean> = {
	[K in keyof Message]: NeverIfFalse<Wait, NonNullable<Message[K]>>
}
class WebhookMessage<Wait extends boolean> {
	//#region
	id!: NeverIfFalse<Wait, Snowflake>
	channel_id!: NeverIfFalse<Wait, Snowflake>
	author!: NeverIfFalse<Wait, User>
	content!: NeverIfFalse<Wait, string>
	timestamp!: NeverIfFalse<Wait, string>
	edited_timestamp!: NeverIfFalse<Wait, string | null>
	tts!: NeverIfFalse<Wait, boolean>
	mention_everyone!: NeverIfFalse<Wait, boolean>
	mentions!: NeverIfFalse<Wait, User[]>
	mention_roles!: NeverIfFalse<Wait, string[]>
	mention_channels?: NeverIfFalse<Wait, ChannelMention[]>
	attachments!: NeverIfFalse<Wait, Attachment[]>
	embeds!: NeverIfFalse<Wait, Embed[]>
	reactions!: NeverIfFalse<Wait, Reaction[]>
	nonce?: NeverIfFalse<Wait, number | string>
	pinned!: NeverIfFalse<Wait, boolean>
	webhook_id?: NeverIfFalse<Wait, Snowflake>
	type!: NeverIfFalse<Wait, number>
	activity?: NeverIfFalse<Wait, MessageActivity>
	application?: NeverIfFalse<Wait, Partial<Application>>
	application_id?: NeverIfFalse<Wait, Snowflake>
	message_reference?: MessageReference
	flags?: NeverIfFalse<Wait, number>
	referenced_message?: NeverIfFalse<Wait, Message | null>
	interaction?: NeverIfFalse<Wait, MessageInteraction>
	thread?: NeverIfFalse<Wait, Channel>
	components?: NeverIfFalse<Wait, Component[]>
	sticker_items?: NeverIfFalse<Wait, StickerItem[]>
	stickers?: NeverIfFalse<Wait, Sticker[]>
	position?: NeverIfFalse<Wait, number>
	role_subscription_data?: NeverIfFalse<Wait, RoleSubscriptionData>
	//#endregion

	webhookId: Snowflake
	webhookToken: string
	threadId?: Snowflake

	/** Gets this webhook message
	 *
	 * Also updates this class instance
	 */
	async get() {
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
	async edit(newMessage: EditMessageParams) {
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
	async delete() {
		return await message.delete(this.webhookId, this.webhookToken, this.id)
	}
	constructor(
		rawMessage: { [key: string]: any },
		webhookId: Snowflake,
		webhookToken: string,
		threadId?: Snowflake
	) {
		if (rawMessage) {
			Object.assign(this, toCamelCase(rawMessage))
		}

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
		(await request.post(
			`channels/${channelId}/webhooks`,
			webhook
		)) as unknown as RawWebhook
	)
}
/** Returns a list of channel webhook objects */
async function listChannel(channelId: Snowflake): Promise<Webhook[]> {
	return (
		(await request.get(
			`channels/${channelId}/webhooks`
		)) as unknown as RawWebhook[]
	).map((v) => new Webhook(v))
}
/** Returns a list of guild webhook objects */
async function listGuild(guildId: Snowflake): Promise<Webhook[]> {
	return (
		(await request.get(
			`channels/${guildId}/webhooks`
		)) as unknown as RawWebhook[]
	).map((v) => new Webhook(v))
}
/** Returns the new webhook object for the given id */
async function get(webhookId: Snowflake): Promise<Webhook> {
	return new Webhook(
		(await request.get(`webhooks/${webhookId}`)) as unknown as RawWebhook
	)
}
type EditParams = {
	/** the default name of the webhook */
	name?: string
	/** image for the default webhook avatar */
	avatar?: string | null
	/** the new channel id this webhook should be moved to */
	channel_id?: Snowflake
}
/** Edit a webhook */
async function edit(
	webhookId: Snowflake,
	webhook: EditParams
): Promise<Webhook> {
	return new Webhook(
		(await request.patch(
			`webhooks/${webhookId}`,
			webhook
		)) as unknown as RawWebhook
	)
}
/** Delete a webhook permanently */
async function _delete(webhookId: Snowflake): Promise<void> {
	return request.delete(`webhooks/${webhookId}`) as unknown as void
}
const withToken = {
	/** Returns the new webhook object for the given id, doesn't require being logged in, by the webhook token */
	async get(
		webhookId: Snowflake,
		webhookToken: string
	): Promise<Omit<Webhook, 'user'>> {
		return new Webhook(
			(await request.get(
				`webhooks/${webhookId}/${webhookToken}`
			)) as unknown as Omit<RawWebhook, 'user'>
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
			(await request.patch(
				`webhooks/${webhookId}/${webhookToken}`,
				webhook
			)) as { [key: string]: any }
		)
	},
	/** Delete a webhook permanently, doesn't require being logged in, by the webhook token */
	async delete(webhookId: Snowflake, webhookToken: string): Promise<void> {
		return request.delete(
			`webhooks/${webhookId}/${webhookToken}`
		) as unknown as void
	}
}
async function g() {
	const wToken = await withToken.get('124', '')
	wToken.edit({})
	const msg = await wToken.execute(
		{
			content: ''
		},
		{
			wait: true
		}
	)
	if (wToken.token) {
		await execute(wToken.id, wToken.token, {
			content: ''
		})
	}
}
type ExecuteParams = {
	/** Message contents (up to 2000 characters) */
	content?: string
	/** `true` if this is a TTS message */
	tts?: boolean
	/** Up to 10 `rich` embeds (up to 6000 characters) */
	embeds?: Embed[]
	/** Allowed mentions for the message */
	allowed_mentions?: AllowedMentions
	/** Components to include with the message */
	components?: Component[]
	/** 	Contents of the file being sent. */
	files?: string[]
	/** 	Attachment objects with filename and description. */
	attachments?: Partial<Attachment>[]
	/** Message flags combined as a bitfield (only `SUPPRESS_EMBEDS` can be set) */
	flags?: number
	/** name of thread to create (requires the webhook channel to be a forum channel) */
	thread_name?: string
} & (
	| {
			content: string
			files?: string[]
			embeds?: Embed[]
			components?: Component[]
	  }
	| {
			content?: string
			files: string[]
			embeds?: Embed[]
			components?: Component[]
	  }
	| {
			content?: string
			files?: string[]
			embeds: Embed[]
			components?: Component[]
	  }
	| {
			content?: string
			files?: string[]
			embeds?: Embed[]
			components: Component[]
	  }
)
type ExecuteOptions<Wait extends boolean> = {
	/** 	waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error) */
	wait?: Wait
	/** Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived. */
	thread_id?: Snowflake
}
/**
 * Sends a message to a webhook
 *
 * Will return `void` if options.wait is not set to `true`
 */
async function execute<Wait extends boolean>(
	webhookId: Snowflake,
	webhookToken: string,
	data: ExecuteParams,
	options?: ExecuteOptions<Wait>
): Promise<WebhookMessage<Wait>> {
	return new WebhookMessage(
		(await request.post(
			`webhooks/${webhookId}/${webhookToken}`,
			data,
			options
		)) as { [key: string]: any },
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
	allowed_mentions?: AllowedMentions[] | null
	/** the components to include with the message */
	components?: Component[] | null
	/** the contents of the file being sent/edited */
	files?: string[] | null
	/** attached files to keep and possible descriptions for new files */
	attachments?: Partial<Attachment[]> | null
}
const message = {
	/** Returns a previously-sent webhook message from the same token */
	async get(
		webhookId: Snowflake,
		webhookToken: string,
		messageId: Snowflake,
		threadId?: Snowflake
	): Promise<Message> {
		return request.get(
			`webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
			threadId ? { threadId } : {}
		) as unknown as Message
	},
	/** Edits a previously-sent webhook message from the same token */
	async edit(
		webhookId: Snowflake,
		webhookToken: string,
		messageId: Snowflake,
		message: EditMessageParams,
		threadId?: Snowflake
	): Promise<Message> {
		return request.patch(
			`webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
			message,
			threadId ? { threadId } : null
		) as unknown as Message
	},
	/** Deletes a message that was created by the webhook */
	async delete(
		webhookId: Snowflake,
		webhookToken: string,
		messageId: Snowflake,
		threadId?: Snowflake
	): Promise<void> {
		return request.delete(
			`webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
			null,
			threadId ? { threadId } : null
		) as unknown as void
	}
}
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
