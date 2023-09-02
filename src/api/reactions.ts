import request from '../utils/request.js'
import { Snowflake, User } from '../types'

class Reaction {
	channelId: Snowflake
	messageId: Snowflake
	emoji: string

	/** Get a list of users who reacted with this */
	async listUsers(options?: ListUsersOptions) {
		return await listUsers(this.channelId, this.messageId, this.emoji, options)
	}

	delete = {
		/** Delete the bots reaction */
		own: async () => {
			return await _delete.own(this.channelId, this.messageId, this.emoji)
		},
		/** Deletes a users reaction */
		user: async (userId: Snowflake) => {
			return await _delete.user(
				this.channelId,
				this.messageId,
				this.emoji,
				userId
			)
		}
	}
	constructor(channelId: Snowflake, messageId: Snowflake, emoji: string) {
		this.channelId = channelId
		this.messageId = messageId
		this.emoji = emoji
	}
}

type ListUsersOptions = {
	/** Get users after this user ID */
	after?: Snowflake
	/** Max number of users to return (1-100) */
	limit?: number
}
/** Get a list of users that reacted with a specific emoji */
async function listUsers(
	channelId: Snowflake,
	messageId: Snowflake,
	emoji: string,
	options?: ListUsersOptions
): Promise<User[]> {
	return request.get(
		`channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(
			emoji
		)}`,
		options
	) as unknown as User[]
}
/** Add a reaction to a message */
async function create(
	channelId: Snowflake,
	messageId: Snowflake,
	emoji: string
) {
	await request.put(
		`channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(
			emoji
		)}/@me`
	)
	return new Reaction(channelId, messageId, emoji)
}
const _delete = {
	/** Delete the bots own reaction */
	async own(
		channelId: Snowflake,
		messageId: Snowflake,
		emoji: string
	): Promise<void> {
		return request.delete(
			`channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(
				emoji
			)}/@me`
		) as unknown as void
	},
	/** Delete a users reaction */
	async user(
		channelId: Snowflake,
		messageId: Snowflake,
		emoji: string,
		userId: Snowflake
	) {
		return request.delete(
			`channels/${channelId}/messages/${messageId}/reactions/${
				emoji ? encodeURIComponent(emoji) : ''
			}/${userId}`
		) as unknown as void
	}
}
export default { listUsers, create, _delete }
