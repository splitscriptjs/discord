import request from '../utils/request.js'
import { Emoji, Snowflake } from '../types.js'

/** Returns list of emojis in guild */
async function list(guild_id: Snowflake): Promise<Emoji[]> {
	return request.get(`guilds/${guild_id}/emojis`) as unknown as Emoji[]
}
/** Return emoji object for give guild and emoji ids */
async function get(guild_id: Snowflake, emoji_id: Snowflake): Promise<Emoji> {
	return request.get(
		`guilds/${guild_id}/emojis/${emoji_id}`
	) as unknown as Emoji
}
type CreateParams = {
	/** name of the emoji */
	name: string
	/** the 128x128 emoji image */
	image: string
	/** roles allowed to use this emoji */
	roles: Snowflake[]
}
/** Create new emoji for guild */
async function create(
	guild_id: Snowflake,
	emoji: CreateParams
): Promise<Emoji> {
	return request.post(`guilds/${guild_id}/emojis`, emoji) as unknown as Emoji
}

type ModifyParams = {
	/** name of the emoji */
	name: string
	/** roles allowed to use this emoji */
	roles: Snowflake[] | null
}
/** Modify given emoji */
async function modify(
	guild_id: Snowflake,
	emoji_id: Snowflake,
	emoji: ModifyParams
): Promise<Emoji> {
	return request.patch(
		`guilds/${guild_id}/emojis/${emoji_id}`,
		emoji
	) as unknown as Emoji
}
/** Delete given emoji */
async function _delete(
	guild_id: Snowflake,
	emoji_id: Snowflake
): Promise<void> {
	return request.delete(
		`guilds/${guild_id}/emojis/${emoji_id}`
	) as unknown as void
}
export default { list, get, create, modify, delete: _delete }
