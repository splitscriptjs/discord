import request from '../utils/request.js'
import type { Snowflake } from '../types'
import type { User } from './users'
import { Emoji } from './emojis.js'

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
	return (await request.get(
		`channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(
			emoji
		)}`,
		options
	)) as unknown as User[]
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
		await request.delete(
			`channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(
				emoji
			)}/@me`
		)
	},
	/** Delete a users reaction */
	async user(
		channelId: Snowflake,
		messageId: Snowflake,
		emoji: string,
		userId: Snowflake
	) {
		await request.delete(
			`channels/${channelId}/messages/${messageId}/reactions/${
				emoji ? encodeURIComponent(emoji) : ''
			}/${userId}`
		)
	}
}
export { listUsers, create, _delete as delete }
export default { listUsers, create, delete: _delete }

type _Reaction = {
	/** times this emoji has been used to react */
	count: number
	/** whether the current user reacted using this emoji */
	me: boolean
	/** emoji information */
	emoji: Partial<Emoji>
}
export type { _Reaction as Reaction }
