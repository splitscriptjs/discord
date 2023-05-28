import request from '../utils/request.js'
import {
	AllowedMentions,
	Attachment,
	Component,
	Embed,
	Message,
	Snowflake
} from '../types'

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
): Promise<Message> {
	return request.post(
		`webhooks/{APP_ID}/${token}`,
		message
	) as unknown as Message
}
async function get(token: string, message_id: Snowflake): Promise<Message> {
	return request.get(
		`webhooks/{APP_ID}/${token}/messages/${message_id}`
	) as unknown as Message
}
async function edit(
	token: string,
	message_id: Snowflake,
	message: {
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
): Promise<Message> {
	return request.patch(
		`webhooks/{APP_ID}/${token}/messages/${message_id}`,
		message
	) as unknown as Message
}
async function _delete(token: string, message_id: Snowflake) {
	return request.delete(`webhooks/{APP_ID}/${token}/messages/${message_id}`)
}
export default { create, get, edit, delete: _delete }
