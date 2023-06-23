import request from '../utils/request.js'
import { Emoji as RawEmoji, Snowflake, User } from '../types.js'

class Emoji {
	id: Snowflake
	name: string | null
	roles?: string[]
	user?: User
	require_colons?: boolean
	managed?: boolean
	animated?: boolean
	available?: boolean
	guild_id: Snowflake

	/** Gets this emoji
	 *
	 * Also updates this class instance
	 */
	async get() {
		const emoji = await get(this.guild_id, this.id)
		Object.assign(this, emoji)
		return emoji
	}
	/** Updates this emoji
	 *
	 * Also updates this class instance
	 */
	async edit(newEmoji: EditParams) {
		const emoji = await edit(this.guild_id, this.id, newEmoji)
		Object.assign(this, emoji)
		return emoji
	}
	/** Deletes this emoji */
	async delete() {
		return await _delete(this.guild_id, this.id)
	}
	constructor(data: RawEmoji & { id: Snowflake }, guild_id: Snowflake) {
		this.id = data.id
		this.name = data.name
		this.roles = data.roles
		this.user = data.user
		this.require_colons = data.require_colons
		this.managed = data.managed
		this.animated = data.animated
		this.available = data.available
		this.guild_id = guild_id
	}
}
/** Returns list of emojis in guild */
async function list(guildId: Snowflake): Promise<Emoji[]> {
	const emojis = (await request.get(
		`guilds/${guildId}/emojis`
	)) as unknown as (RawEmoji & { id: Snowflake })[]
	return emojis.map((emoji) => new Emoji(emoji, guildId))
}
/** Return emoji object for give guild and emoji ids */
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
/** Create new emoji for guild */
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
	name: string
	/** roles allowed to use this emoji */
	roles: Snowflake[] | null
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
