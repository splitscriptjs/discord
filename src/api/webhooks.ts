import request from '../utils/request.js'
import {
	AllowedMentions,
	Attachment,
	Component,
	Embed,
	Message,
	Snowflake,
	Webhook
} from '../types.js'

/** Creates a new webhook and returns a webhook object on success */
async function create(
	channel_id: Snowflake,
	webhook: {
		/** name of the webhook (1-80 characters) */
		name: string
		/** image for the default webhook avatar */
		avatar?: string | null
	}
): Promise<Webhook> {
	return request.post(
		`channels/${channel_id}/webhooks`,
		webhook
	) as unknown as Webhook
}
/** Returns a list of channel webhook objects */
async function listChannel(channel_id: Snowflake): Promise<Webhook[]> {
	return request.get(`channels/${channel_id}/webhooks`) as unknown as Webhook[]
}
/** Returns a list of guild webhook objects */
async function listGuild(guild_id: Snowflake): Promise<Webhook[]> {
	return request.get(`channels/${guild_id}/webhooks`) as unknown as Webhook[]
}
/** Returns the new webhook object for the given id */
async function get(webhook_id: Snowflake): Promise<Webhook> {
	return request.get(`webhooks/${webhook_id}`) as unknown as Webhook
}

/** Modify a webhook */
async function modify(
	webhook_id: Snowflake,
	webhook: {
		/** the default name of the webhook */
		name?: string
		/** image for the default webhook avatar */
		avatar?: string | null
		/** the new channel id this webhook should be moved to */
		channel_id?: Snowflake
	}
): Promise<Webhook> {
	return request.patch(`webhooks/${webhook_id}`, webhook) as unknown as Webhook
}
/** Delete a webhook permanently */
async function _delete(webhook_id: Snowflake): Promise<void> {
	return request.delete(`webhooks/${webhook_id}`) as unknown as void
}
const withToken = {
	/** Returns the new webhook object for the given id, doesn't require being logged in, by the webhook token */
	async get(
		webhook_id: Snowflake,
		webhook_token: string
	): Promise<Omit<Webhook, 'user'>> {
		return request.get(
			`webhooks/${webhook_id}/${webhook_token}`
		) as unknown as Omit<Webhook, 'user'>
	},
	/** Modify a webhook, doesn't require being logged in, by the webhook token */
	async modify(
		webhook_id: Snowflake,
		webhook_token: string,
		webhook: {
			/** the default name of the webhook */
			name?: string
			/** image for the default webhook avatar */
			avatar?: string | null
		}
	): Promise<Omit<Webhook, 'user'>> {
		return request.patch(
			`webhooks/${webhook_id}/${webhook_token}`,
			webhook
		) as unknown as Omit<Webhook, 'user'>
	},
	/** Delete a webhook permanently, doesn't require being logged in, by the webhook token */
	async delete(webhook_id: Snowflake, webhook_token: string): Promise<void> {
		return request.delete(
			`webhooks/${webhook_id}/${webhook_token}`
		) as unknown as void
	}
}
/**
 * Sends a message to a webhook
 *
 * Will return `void` if options.wait is not set to `true`
 */
async function execute<B extends boolean>(
	webhook_id: Snowflake,
	webhook_token: string,
	data: {
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
	),
	options?: {
		/** 	waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error) */
		wait?: B
		/** Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived. */
		thread_id?: Snowflake
	}
): Promise<B extends true ? Message : void> {
	return request.post(
		`webhooks/${webhook_id}/${webhook_token}`,
		data,
		options
	) as unknown as B extends true ? Message : void
}
const message = {
	/** Returns a previously-sent webhook message from the same token */
	async get(
		webhook_id: Snowflake,
		webhook_token: string,
		message_id: Snowflake,
		thread_id?: Snowflake
	): Promise<Message> {
		return request.get(
			`webhooks/${webhook_id}/${webhook_token}/messages/${message_id}`,
			thread_id ? { thread_id } : {}
		) as unknown as Message
	},
	/** Edits a previously-sent webhook message from the same token */
	async edit(
		webhook_id: Snowflake,
		webhook_token: string,
		message_id: Snowflake,
		message: {
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
		},
		thread_id?: Snowflake
	): Promise<Message> {
		return request.patch(
			`webhooks/${webhook_id}/${webhook_token}/messages/${message_id}`,
			message,
			thread_id ? { thread_id } : null
		) as unknown as Message
	},
	/** Deletes a message that was created by the webhook */
	async delete(
		webhook_id: Snowflake,
		webhook_token: string,
		message_id: Snowflake,
		thread_id?: Snowflake
	): Promise<void> {
		return request.delete(
			`webhooks/${webhook_id}/${webhook_token}/messages/${message_id}`,
			null,
			thread_id ? { thread_id } : null
		) as unknown as void
	}
}
export default {
	create,
	listChannel,
	listGuild,
	get,
	modify,
	delete: _delete,
	withToken,
	execute,
	message
}
