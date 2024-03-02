import request from '../utils/request.js'
import { BaseMessage } from './messages.js'
import type {
	AllowedMentions,
	Attachment,
	Component,
	Embed,
	Snowflake
} from '../types'
import type { ExecuteParams } from './webhooks'

class FollowupMessage extends BaseMessage {
	token: string

	/** Gets this followup message
	 *
	 * Also updates this class instance
	 */
	async get(): Promise<FollowupMessage> {
		const result = await get(this.token, this.id)
		Object.assign(this, result)
		return result
	}
	/** Edits this followup message
	 *
	 * Also updates this class instance
	 */
	async edit(newMessage: EditParams): Promise<FollowupMessage> {
		const result = await edit(this.token, this.id, newMessage)
		Object.assign(this, result)
		return result
	}
	/** Deletes this followup message
	 *
	 * Also updates this class instance
	 */
	async delete(): Promise<void> {
		return await _delete(this.token, this.id)
	}
	constructor(data: unknown, token: string) {
		super(data)

		this.token = token
	}
}
/** Creates a followup message */
async function create(
	token: string,
	/** The message to send - **One of content, files, or embeds is required** */
	message: ExecuteParams
): Promise<FollowupMessage> {
	return new FollowupMessage(
		await request.post(`webhooks/{APP_ID}/${token}`, message),
		token
	)
}
/** Gets a followup message */
async function get(
	token: string,
	messageId: Snowflake
): Promise<FollowupMessage> {
	return new FollowupMessage(
		await request.get(`webhooks/{APP_ID}/${token}/messages/${messageId}`),
		token
	)
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
/** Edits a followup message */
async function edit(
	token: string,
	messageId: Snowflake,
	message: EditParams
): Promise<FollowupMessage> {
	return new FollowupMessage(
		await request.patch(
			`webhooks/{APP_ID}/${token}/messages/${messageId}`,
			message
		),
		token
	)
}
async function _delete(token: string, messageId: Snowflake): Promise<void> {
	await request.delete(`webhooks/{APP_ID}/${token}/messages/${messageId}`)
}
/** Used to manage followup messages */
export { create, get, edit, _delete as delete }
/** Used to manage followup messages */
export default { create, get, edit, delete: _delete }
