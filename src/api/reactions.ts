import request from '../utils/request.js'
import { Snowflake } from '../types'

/** Get a list of users that reacted with a specific emoji */
async function list(
	channel_id: Snowflake,
	message_id: Snowflake,
	emoji: string,
	options?: {
		/** Get users after this user ID */
		after?: Snowflake
		/** Max number of users to return (1-100) */
		limit?: number
	}
) {
	return request.get(
		`channels/${channel_id}/messages/${message_id}/reactions/${encodeURIComponent(
			emoji
		)}`,
		options
	) as unknown
}
/** Add a reaction to a message */
async function create(
	channel_id: Snowflake,
	message_id: Snowflake,
	emoji: string
) {
	return request.post(
		`channels/${channel_id}/messages/${message_id}/reactions/${encodeURIComponent(
			emoji
		)}/@me`
	)
}
const _delete = {
	/** Delete the bots own reaction */
	async own(
		channel_id: Snowflake,
		message_id: Snowflake,
		emoji: string
	): Promise<void> {
		return request.delete(
			`channels/${channel_id}/messages/${message_id}/reactions/${encodeURIComponent(
				emoji
			)}/@me`
		) as unknown as void
	},
	/** Delete a users reaction */
	async user(
		channel_id: Snowflake,
		message_id: Snowflake,
		emoji: string,
		user_id: Snowflake
	): Promise<void> {
		return request.delete(
			`channels/${channel_id}/messages/${message_id}/reactions/${encodeURIComponent(
				emoji
			)}/${user_id}`
		) as unknown as void
	},
	/** Delete all reactions from a message
	 *
	 * Specify `emoji` to delete all reactions of a specific emoji
	 */
	async all(
		channel_id: Snowflake,
		message_id: Snowflake,
		emoji?: string
	): Promise<void> {
		return request.delete(
			`channels/${channel_id}/messages/${message_id}/reactions/${
				emoji ? encodeURIComponent(emoji) : ''
			} `
		) as unknown as void
	}
}
export default { list, create, _delete }
