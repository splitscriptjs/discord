import request from '../utils/request.js'
import {
	Snowflake,
	Message as RawMessage,
	Embed,
	AllowedMentions,
	Component,
	Attachment,
	MessageReference,
	User,
	ChannelMention,
	Reaction,
	MessageActivity,
	Application,
	MessageInteraction,
	StickerItem,
	Sticker,
	RoleSubscriptionData,
	Channel
} from '../types'

class Message implements RawMessage {
	//#region
	id: Snowflake
	channel_id: Snowflake
	author: User
	content: string
	timestamp: string
	edited_timestamp: string | null
	tts: boolean
	mention_everyone: boolean
	mentions: User[]
	mention_roles: string[]
	mention_channels?: ChannelMention[]
	attachments: Attachment[]
	embeds: Embed[]
	reactions: Reaction[]
	nonce?: number | string
	pinned: boolean
	webhook_id?: Snowflake
	type: number
	activity?: MessageActivity
	application?: Partial<Application>
	application_id?: Snowflake
	message_reference?: MessageReference
	flags?: number
	referenced_message?: RawMessage | null
	interaction?: MessageInteraction
	thread?: Channel
	components?: Component[]
	sticker_items?: StickerItem[]
	stickers?: Sticker[]
	position?: number
	role_subscription_data?: RoleSubscriptionData
	//#endregion

	/** Gets this message
	 *
	 * Also updates this class instance
	 */
	async get() {
		const result = await get(this.channel_id, this.id)
		Object.assign(this, result)
		return result
	}

	/** Edits this message
	 *
	 * Also updates this class instance
	 */
	async edit(newMessage: EditParams) {
		const result = await edit(this.channel_id, this.id, newMessage)
		Object.assign(this, result)
		return result
	}

	/** Deletes this message */
	async delete() {
		return await _delete(this.channel_id, this.id)
	}

	constructor(rawMessage: RawMessage) {
		this.id = rawMessage.id
		this.channel_id = rawMessage.channel_id
		this.author = rawMessage.author
		this.content = rawMessage.content
		this.timestamp = rawMessage.timestamp
		this.edited_timestamp = rawMessage.edited_timestamp
		this.tts = rawMessage.tts
		this.mention_everyone = rawMessage.mention_everyone
		this.mentions = rawMessage.mentions
		this.mention_roles = rawMessage.mention_roles
		this.mention_channels = rawMessage.mention_channels
		this.attachments = rawMessage.attachments
		this.embeds = rawMessage.embeds
		this.reactions = rawMessage.reactions
		this.nonce = rawMessage.nonce
		this.pinned = rawMessage.pinned
		this.webhook_id = rawMessage.webhook_id
		this.type = rawMessage.type
		this.activity = rawMessage.activity
		this.application = rawMessage.application
		this.application_id = rawMessage.application_id
		this.message_reference = rawMessage.message_reference
		this.flags = rawMessage.flags
		this.referenced_message = rawMessage.referenced_message
		this.interaction = rawMessage.interaction
		this.thread = rawMessage.thread
		this.components = rawMessage.components
		this.sticker_items = rawMessage.sticker_items
		this.stickers = rawMessage.stickers
		this.position = rawMessage.position
		this.role_subscription_data = rawMessage.role_subscription_data
	}
}
/** Creates a new message */
async function create(
	channelId: Snowflake,
	message: {
		/** Message contents (up to 2000 characters) */
		content?: string
		/** Can be used to verify a message was sent (up to 25 characters). Value will appear in the Message Create event. */
		nonce?: number | string
		/** `true` if this is a TTS message */
		tts?: boolean
		/** Up to 10 `rich` embeds (up to 6000 characters) */
		embeds?: Embed[]
		/** Allowed mentions for the message */
		allowed_mentions?: AllowedMentions
		/** Include to make your message a reply */
		message_reference?: MessageReference
		/** Components to include with the message */
		components?: Component[]
		/** IDs of up to 3 stickers in the server to send in the message */
		sticker_ids?: Snowflake[]
		/** 	Contents of the file being sent. */
		files?: string[]
		/** 	Attachment objects with filename and description. */
		attachments?: Partial<Attachment>[]
		/** Message flags combined as a bitfield (only `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATIONS` can be set) */
		flags?: number
	} & (
		| {
				sticker_ids?: Snowflake[]
				content: string
				files?: string[]
				embeds?: Embed[]
				components?: Component[]
		  }
		| {
				sticker_ids?: Snowflake[]
				content?: string
				files: string[]
				embeds?: Embed[]
				components?: Component[]
		  }
		| {
				sticker_ids?: Snowflake[]
				content?: string
				files?: string[]
				embeds: Embed[]
				components?: Component[]
		  }
		| {
				sticker_ids: Snowflake[]
				content?: string
				files?: string[]
				embeds?: Embed[]
				components?: Component[]
		  }
		| {
				sticker_ids?: Snowflake[]
				content?: string
				files?: string[]
				embeds?: Embed[]
				components: Component[]
		  }
	)
): Promise<Message> {
	return new Message(
		(await request.post(
			`channels/${channelId}/messages`,
			message
		)) as unknown as RawMessage
	)
}
type EditParams = {
	/** Message contents (up to 2000 characters) */
	content?: string | null
	/** Up to 10 `rich` embeds (up to 6000 characters) */
	embeds?: Embed[] | null
	/** Edit the flags of a message (only `SUPPRESS_EMBEDS` can currently be set/unset) */
	flags?: number | null
	/** Allowed mentions for the message */
	allowed_mentions?: AllowedMentions | null
	/** Components to include with the message */
	components?: Component[] | null
	/** Contents of the file being sent/edited.  */
	files?: string[] | null
	/** Attached files to keep and possible descriptions for new files. */
	attachments?: Attachment[]
}
/** Updates a message */
async function edit(
	channelId: Snowflake,
	messageId: Snowflake,
	message: EditParams
): Promise<Message> {
	return new Message(
		(await request.patch(
			`channels/${channelId}/messages/${messageId}`,
			message
		)) as unknown as RawMessage
	)
}
/** Delete a single message */
async function _delete(
	channelId: Snowflake,
	messageId: Snowflake
): Promise<void> {
	return request.delete(
		`channels/${channelId}/messages/${messageId}`
	) as unknown as void
}
/** Delete an array of messages */
async function bulkDelete(
	channelId: Snowflake,
	messageIds: Snowflake[]
): Promise<void> {
	return request.post(`channels/${channelId}/messages/bulk-delete`, {
		messages: messageIds
	}) as unknown as void
}
/** Retrieve a single message */
async function get(
	channelId: Snowflake,
	messageId: Snowflake
): Promise<Message> {
	return new Message(
		(await request.get(
			`channels/${channelId}/messages/${messageId}`
		)) as unknown as RawMessage
	)
}
/** Get an array of messages from a channel */
async function list(
	channelId: Snowflake,
	options?: {
		/** Get users after this user ID */
		after?: Snowflake
		/** Max number of users to return (1-100) */
		limit?: number
	}
): Promise<Message[]> {
	return (
		(await request.get(
			`channels/${channelId}/messages`,
			options
		)) as unknown as RawMessage[]
	).map((v) => new Message(v))
}
export default { create, edit, delete: _delete, bulkDelete, get, list }
