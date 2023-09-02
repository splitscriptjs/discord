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

class Response {
	token: string

	/** Gets the message from this response */
	async get() {
		return await get(this.token)
	}
	/** Edits the message from this response  */
	async edit(message: EditParams) {
		return await edit(this.token, message)
	}
	/** Deletes the message from this response */
	async delete() {
		return await _delete(this.token)
	}
	constructor(token: string) {
		this.token = token
	}
}

async function create(
	interactionId: Snowflake,
	token: string,
	response: InteractionResponse
): Promise<Response> {
	await request.post(
		`interactions/${interactionId}/${token}/callback`,
		response
	)
	return new Response(token)
}
async function get(token: string): Promise<Message> {
	return (await request.get(
		`webhooks/{APP_ID}/${token}/messages/@original`
	)) as unknown as Message
}
type EditParams = {
	/** the message contents (up to 2000 characters) */
	content?: string
	/** embedded `rich` content */
	embeds?: Embed[]
	/** allowed mentions for the message */
	allowedMentions?: AllowedMentions
	/** the components to include with the message */
	components?: Component[]
	/** the contents of the file being sent/edited */
	files?: string[]
	/** attached files to keep and possible descriptions for new files */
	attachments?: Partial<Attachment>[]
}
async function edit(token: string, message: EditParams): Promise<Message> {
	return (await request.patch(
		`webhooks/{APP_ID}/${token}/messages/@original`,
		message
	)) as unknown as Message
}
async function _delete(token: string) {
	return await request.delete(`webhooks/{APP_ID}/${token}/messages/@original`)
}
export default { create, get, edit, delete: _delete }
