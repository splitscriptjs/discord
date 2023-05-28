import request from '../utils/request.js'
import {
	Snowflake,
	Message,
	Embed,
	AllowedMentions,
	Component,
	Attachment,
	MessageReference
} from '../types'
/** Creates a new message */
async function create(
	channel_id: Snowflake,
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
	return request.post(
		`channels/${channel_id}/messages`,
		message
	) as unknown as Message
}
/** Updates a message */
async function edit(
	channel_id: Snowflake,
	message_id: Snowflake,
	message: {
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
): Promise<Message> {
	return request.patch(
		`channels/${channel_id}/messages/${message_id}`,
		message
	) as unknown as Message
}
/** Delete a single message */
async function _delete(
	channel_id: Snowflake,
	message_id: Snowflake
): Promise<void> {
	return request.delete(
		`channels/${channel_id}/messages/${message_id}`
	) as unknown as void
}
/** Delete an array of messages */
async function bulkDelete(
	channel_id: Snowflake,
	message_ids: Snowflake[]
): Promise<void> {
	return request.post(`channels/${channel_id}/messages/bulk-delete`, {
		messages: message_ids
	}) as unknown as void
}
/** Retrieve a single message */
async function get(
	channel_id: Snowflake,
	message_id: Snowflake
): Promise<Message> {
	return request.get(
		`channels/${channel_id}/messages/${message_id}`
	) as unknown as Message
}
/** Get an array of messages from a channel */
async function list(
	channel_id: Snowflake,
	options?: {
		/** Get users after this user ID */
		after?: Snowflake
		/** Max number of users to return (1-100) */
		limit?: number
	}
): Promise<Message[]> {
	return request.get(
		`channels/${channel_id}/messages`,
		options
	) as unknown as Message[]
}
export default { create, edit, delete: _delete, bulkDelete, get, list }
