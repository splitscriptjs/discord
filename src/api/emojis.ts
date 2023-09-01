import request from '../utils/request.js'
import { Emoji as RawEmoji, Snowflake, User } from '../types.js'
import toCamelCase from '../utils/toCamelCase.js'

class Emoji {
	/** emoji id */
	id!: Snowflake
	/** emoji name */
	name!: string | null
	/** roles allowed to use this emoji */
	roles?: string[]
	/** user that created this emoji */
	user?: User
	/** whether this emoji must be wrapped in colons */
	requireColons?: boolean
	/** whether this emoji is managed */
	managed?: boolean
	/** whether this emoji is animated */
	animated?: boolean
	/** whether this emoji can be used, may be false due to loss of Server Boosts */
	available?: boolean
	/** id of guild this emoji is in */
	guildId: Snowflake

	/** Gets this emoji
	 *
	 * Also updates this class instance
	 */
	async get() {
		const emoji = await get(this.guildId, this.id)
		Object.assign(this, emoji)
		return emoji
	}
	/** Updates this emoji
	 *
	 * Also updates this class instance
	 */
	async edit(newEmoji: EditParams) {
		const emoji = await edit(this.guildId, this.id, newEmoji)
		Object.assign(this, emoji)
		return emoji
	}
	/** Deletes this emoji */
	async delete() {
		return await _delete(this.guildId, this.id)
	}
	constructor(data: RawEmoji & { id: Snowflake }, guildId: Snowflake) {
		Object.assign(this, toCamelCase(data))
		this.guildId = guildId
	}
}
/** Returns list of emojis in guild */
async function list(guildId: Snowflake): Promise<Emoji[]> {
	const emojis = (await request.get(
		`guilds/${guildId}/emojis`
	)) as unknown as (RawEmoji & { id: Snowflake })[]
	return emojis.map((emoji) => new Emoji(emoji, guildId))
}
/** Return emoji object for given guild and emoji ids */
async function get(guildId: Snowflake, emojiId: Snowflake): Promise<Emoji> {
	return new Emoji(
		(await request.get(
			`guilds/${guildId}/emojis/${emojiId}`
		)) as unknown as RawEmoji & { id: Snowflake },
		guildId
	)
}
type CreateParams = {
	/** name of the emoji */
	name: string
	/** the 128x128 emoji image */
	image: string
	/** roles allowed to use this emoji */
	roles: Snowflake[]
}
/** Create new emoji for a guild */
async function create(guildId: Snowflake, emoji: CreateParams): Promise<Emoji> {
	return new Emoji(
		(await request.post(
			`guilds/${guildId}/emojis`,
			emoji
		)) as unknown as RawEmoji & { id: Snowflake },
		guildId
	)
}

type EditParams = {
	/** name of the emoji */
	name?: string
	/** roles allowed to use this emoji */
	roles?: Snowflake[] | null
}
/** Edit given emoji */
async function edit(
	guildId: Snowflake,
	emojiId: Snowflake,
	emoji: EditParams
): Promise<Emoji> {
	return new Emoji(
		(await request.patch(
			`guilds/${guildId}/emojis/${emojiId}`,
			emoji
		)) as unknown as RawEmoji & { id: Snowflake },
		guildId
	)
}
/** Delete given emoji */
async function _delete(guildId: Snowflake, emojiId: Snowflake): Promise<void> {
	return request.delete(
		`guilds/${guildId}/emojis/${emojiId}`
	) as unknown as void
}
export default { list, get, create, edit, delete: _delete }
