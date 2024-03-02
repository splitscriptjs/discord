import request from '../utils/request.js'
import type {
	AllowedMentions,
	Attachment,
	Component,
	Embed,
	Snowflake
} from '../types'
import type { Message } from './messages'
import { CommandOptionChoice } from './commands.js'
class Response {
	token: string

	/** Gets the message from this response */
	async get(): Promise<Message> {
		return await get(this.token)
	}
	/** Edits the message from this response  */
	async edit(message: EditParams): Promise<Message> {
		return await edit(this.token, message)
	}
	/** Deletes the message from this response */
	async delete(): Promise<void> {
		await _delete(this.token)
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
	)) as Message
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
	)) as Message
}
async function _delete(token: string): Promise<void> {
	await request.delete(`webhooks/{APP_ID}/${token}/messages/@original`)
}
export enum TextInputStyle {
	/** Single-line input */
	Short = 1,
	/** Multi-line input */
	Paragraph = 2
}
export enum CallbackType {
	/** acknowledge a ping */
	Pong = 1,
	/** respond to an interaction with a message */
	Reply = 4,
	/** acknowledge an interaction and edit a response later, the user sees a loading state */
	DeferredReply = 5,
	/** for components, acknowledge an interaction and edit the original message later, the user doesn't see a loading state */
	DeferredEditMessage = 6,
	/** for components, edit the message the component was attached to */
	EditMessage = 7,
	/** respond to an autocomplete interaction with suggested choices */
	AutocompleteResult = 8,
	/** respond to an interaction with a popup modal */
	Modal = 9,
	/** respond to an interaction with an upgrade button, only available for apps with monetization enabled */
	PremiumRequired = 10
}
export enum CallbackMessageType {
	/** respond to an interaction with a message */
	Reply = 4,
	/** acknowledge an interaction and edit a response later, the user sees a loading state */
	DeferredReply = 5,
	/** for components, acknowledge an interaction and edit the original message later, the user doesn't see a loading state */
	DeferredEditMessage = 6,
	/** for components, edit the message the component was attached to */
	EditMessage = 7
}
/** Used to manage interaction responses */
export { create, get, edit, _delete as delete }
/** Used to manage interaction responses */
export default { create, get, edit, delete: _delete }

export type InteractionResponse =
	| {
			/** ACK a Ping */
			type: CallbackType.Pong
	  }
	| {
			type: CallbackMessageType
			data: InteractionCallbackDataMessage
	  }
	| {
			/** respond to an autocomplete interaction with suggested choices */
			type: CallbackType.AutocompleteResult
			data: InteractionCallbackDataAutocomplete
	  }
	| {
			/** respond to an interaction with a popup modal */
			type: CallbackType.Modal
			data: InteractionCallbackDataModal
	  }
export type InteractionCallbackData =
	| InteractionCallbackDataMessage
	| InteractionCallbackDataAutocomplete
	| InteractionCallbackDataModal
export type InteractionCallbackDataMessage = {
	/** whether response is tts */
	tts?: boolean
	/** message content */
	content?: string
	/** up to 10 embeds */
	embeds?: Embed[]
	/** allowed mentions */
	allowedMentions?: AllowedMentions
	/** message flags combined as bitfield (only `SuppressEmbeds` and `Ephemeral` can be set) */
	flags?: number
	/** message components */
	components?: Component[]
	/** attachment objects with filename and description */
	attachment?: Partial<Attachment>[]
}
export type InteractionCallbackDataAutocomplete = {
	/** autocomplete choices (max of 25 choices) */
	choices: CommandOptionChoice[]
}
export type InteractionCallbackDataModal = {
	/** a developer-defined identifier for the modal, max 100 characters */
	customId: string
	/** the title of the popup modal, max 45 characters */
	title: string
	/** between 1 and 5 (inclusive) components that make up the modal */
	components: Component[]
}
