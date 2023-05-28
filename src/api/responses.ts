import request from '../utils/request.js'
import {
	AllowedMentions,
	Attachment,
	Component,
	Embed,
	InteractionResponse,
	Message,
	Snowflake
} from '../types'

async function create(
	interaction_id: Snowflake,
	token: string,
	response: InteractionResponse
): Promise<void> {
	return request.post(
		`interactions/${interaction_id}/${token}/callback`,
		response
	) as unknown as void
}
async function get(token: string): Promise<Message> {
	return request.get(
		`webhooks/{APP_ID}/${token}/messages/@original`
	) as unknown as Message
}
async function edit(
	token: string,
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
		`webhooks/{APP_ID}/${token}/messages/@original`,
		message
	) as unknown as Message
}
async function _delete(token: string) {
	return request.delete(`webhooks/{APP_ID}/${token}/messages/@original`)
}
export default { create, get, edit, delete: _delete }
