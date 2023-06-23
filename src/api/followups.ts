import request from '../utils/request.js'
import {
	AllowedMentions,
	Application,
	Attachment,
	Channel,
	ChannelMention,
	Component,
	Embed,
	Message,
	MessageActivity,
	MessageInteraction,
	MessageReference,
	Reaction,
	RoleSubscriptionData,
	Snowflake,
	Sticker,
	StickerItem,
	User
} from '../types'

class FollowupMessage {
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
	referenced_message?: Message | null
	interaction?: MessageInteraction
	thread?: Channel
	components?: Component[]
	sticker_items?: StickerItem[]
	stickers?: Sticker[]
	position?: number
	role_subscription_data?: RoleSubscriptionData
	token: string

	/** Gets this followup message
	 *
	 * Also updates this class instance
	 */
	async get() {
		const result = await get(this.token, this.id)
		Object.assign(this, result)
		return result
	}
	/** Edits this followup message
	 *
	 * Also updates this class instance
	 */
	async edit(newMessage: EditParams) {
		const result = await edit(this.token, this.id, newMessage)
		Object.assign(this, result)
		return result
	}
	/** Deletes this followup message
	 *
	 * Also updates this class instance
	 */
	async delete() {
		return await _delete(this.token, this.id)
	}
	constructor(data: Message, token: string) {
		this.id = data.id
		this.channel_id = data.channel_id
		this.author = data.author
		this.content = data.content
		this.timestamp = data.timestamp
		this.edited_timestamp = data.edited_timestamp
		this.tts = data.tts
		this.mention_everyone = data.mention_everyone
		this.mentions = data.mentions
		this.mention_roles = data.mention_roles
		this.mention_channels = data.mention_channels || []
		this.attachments = data.attachments
		this.embeds = data.embeds
		this.reactions = data.reactions
		this.nonce = data.nonce
		this.pinned = data.pinned
		this.webhook_id = data.webhook_id
		this.type = data.type
		this.activity = data.activity
		this.application = data.application
		this.application_id = data.application_id
		this.message_reference = data.message_reference
		this.flags = data.flags
		this.referenced_message = data.referenced_message || null
		this.interaction = data.interaction
		this.thread = data.thread
		this.components = data.components
		this.sticker_items = data.sticker_items
		this.stickers = data.stickers
		this.position = data.position
		this.role_subscription_data = data.role_subscription_data

		this.token = token
	}
}

async function create(
	token: string,
	/** The message to send - **One of content, files, or embeds is required** */
	message: {
		/** the message contents (up to 2000 characters) */
		content?: string
		/** true if this is a TTS message */
		tts?: boolean
		/** embedded rich content */
		embeds?: Embed[]
		/** allowed mentions for the message */
		allowed_mentions?: AllowedMentions
		/** the components to include with the message */
		components?: Component[]
		/** the contents of the file being sent */
		files?: string[]
		/** attachment objects with filename and description */
		attachments?: Partial<Attachment>[]
		/** message flags combined as a bitfield (only SUPPRESS_EMBEDS can be set) */
		flags?: number
		/** name of thread to create (requires the webhook channel to be a forum channel) */
		thread_name?: string
	} & (
		| { content: string; files?: string[]; embeds?: Embed[] }
		| { content?: string; files: string[]; embeds?: Embed[] }
		| { content?: string; files?: string[]; embeds: Embed[] }
	)
): Promise<FollowupMessage> {
	return new FollowupMessage(
		(await request.post(
			`webhooks/{APP_ID}/${token}`,
			message
		)) as unknown as Message,
		token
	)
}
async function get(
	token: string,
	messageId: Snowflake
): Promise<FollowupMessage> {
	return new FollowupMessage(
		(await request.get(
			`webhooks/{APP_ID}/${token}/messages/${messageId}`
		)) as unknown as Message,
		token
	)
}
type EditParams = {
	/** the message contents (up to 2000 characters) */
	content?: string
	/** embedded `rich` content */
	embeds?: Embed[]
	/** allowed mentions for the message */
	allowed_mentions?: AllowedMentions
	/** the components to include with the message */
	components?: Component[]
	/** the contents of the file being sent/edited */
	files?: string[]
	/** attached files to keep and possible descriptions for new files */
	attachments?: Partial<Attachment>[]
}
async function edit(
	token: string,
	messageId: Snowflake,
	message: EditParams
): Promise<FollowupMessage> {
	return new FollowupMessage(
		(await request.patch(
			`webhooks/{APP_ID}/${token}/messages/${messageId}`,
			message
		)) as unknown as Message,
		token
	)
}
async function _delete(token: string, messageId: Snowflake): Promise<void> {
	return (await request.delete(
		`webhooks/{APP_ID}/${token}/messages/${messageId}`
	)) as unknown as void
}
export default { create, get, edit, delete: _delete }
