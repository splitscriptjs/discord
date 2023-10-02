import request from '../utils/request.js'
import toCamelCase from '../utils/toCamelCase.js'

import type { User } from './users'
import type { Snowflake } from '../types'

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
	constructor(data: unknown, guildId: Snowflake) {
		Object.assign(this, toCamelCase(data))
		this.guildId = guildId
	}
}
/** Returns list of emojis in guild */
async function list(guildId: Snowflake): Promise<Emoji[]> {
	const emojis = (await request.get(`guilds/${guildId}/emojis`)) as unknown[]
	return emojis.map((emoji) => new Emoji(emoji, guildId))
}
/** Return emoji object for given guild and emoji ids */
async function get(guildId: Snowflake, emojiId: Snowflake): Promise<Emoji> {
	return new Emoji(
		await request.get(`guilds/${guildId}/emojis/${emojiId}`),
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
		await request.post(`guilds/${guildId}/emojis`, emoji),
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
		await request.patch(`guilds/${guildId}/emojis/${emojiId}`, emoji),
		guildId
	)
}
/** Delete given emoji */
async function _delete(guildId: Snowflake, emojiId: Snowflake): Promise<void> {
	await request.delete(`guilds/${guildId}/emojis/${emojiId}`)
}
export { list, get, create, edit, _delete as delete }
export default { list, get, create, edit, delete: _delete }

//#region
type _Emoji = {
	/** emoji id */
	id: Snowflake | null
	/** emoji name */
	name: string | null
	/** roles allowed to use this emoji */
	roles?: string[]
	/** user that created this emoji */
	user?: User
	/** whether emoji must be wrapped in colons */
	requireColons?: boolean
	/** whether emoji is managed */
	managed?: boolean
	/** whether emoji is animated */
	animated?: boolean
	/** whether emojican be used */
	available?: boolean
}
//#endregion
export type { _Emoji as Emoji }
