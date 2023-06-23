import request from '../utils/request.js'
import { Snowflake, Sticker, StickerPack, User } from '../types'

/** Returns a sticker object for the given **Non Guild** sticker ID */
async function get(sticker_id: Snowflake): Promise<Sticker> {
	return request.get(`stickers/${sticker_id}`) as unknown as Sticker
}
/** Returns the list of sticker packs available to Nitro subscribers */
async function listPacks(): Promise<{ sticker_packs: StickerPack[] }> {
	return request.get(`sticker-packs`) as unknown as {
		sticker_packs: StickerPack[]
	}
}

class GuildSticker implements Sticker {
	id: Snowflake
	pack_id?: `${bigint}`
	name: string
	description: string | null
	tags: string
	asset?: string
	type: number
	format_type: number
	available?: boolean
	guild_id: `${bigint}`
	user: User
	sort_value?: number

	/** Gets this sticker
	 *
	 * Also updates this class instance
	 */
	async get() {
		const result = await guild.get(this.guild_id, this.id)
		Object.assign(this, result)
		return result
	}

	/** Edits this sticker
	 *
	 * Also updates this class instance
	 */
	async edit(sticker: EditParams) {
		const result = await guild.edit(this.guild_id, this.id, sticker)
		Object.assign(this, result)
		return result
	}

	/** Deletes this sticker */
	async delete() {
		return await guild.delete(this.guild_id, this.id)
	}

	constructor(data: Sticker) {
		this.id = data.id
		this.pack_id = data.pack_id
		this.name = data.name
		this.description = data.description
		this.tags = data.tags
		this.asset = data.asset
		this.type = data.type
		this.format_type = data.format_type
		this.available = data.available
		//@ts-expect-error
		this.guild_id = data.guild_id
		this.user = data.user
		this.sort_value = data.sort_value
	}
}

type EditParams = {
	/** name of the sticker (2-30 characters) */
	name?: string
	/** description of the sticker (2-100 characters) */
	description?: string | null
	/** autocomplete/suggestion tags for the sticker (max 200 characters) */
	tags: string
}
const guild = {
	/** Returns an array of sticker objects for the given guild */
	async list(guild_id: Snowflake): Promise<Sticker[]> {
		return (
			(await request.get(`guilds/${guild_id}/stickers`)) as unknown as Sticker[]
		).map((v) => new GuildSticker(v))
	},
	/** Returns a sticker object for the given guild and sticker IDs */
	async get(guild_id: Snowflake, sticker_id: Snowflake): Promise<Sticker> {
		return new GuildSticker(
			(await request.get(
				`guilds/${guild_id}/stickers/${sticker_id}`
			)) as unknown as Sticker
		)
	},
	/** Create a new sticker for the guild */
	async create(
		guild_id: Snowflake,
		sticker: {
			/** name of the sticker (2-30 characters) */
			name: string
			/** description of the sticker (empty or 2-100 characters) */
			description: string
			/** autocomplete/suggestion tags for the sticker (max 200 characters) */
			tags: string
			/** the sticker file to upload, must be a PNG, APNG, GIF, or Lottie JSON file, max 512 KB */
			file: string
		}
	): Promise<Sticker> {
		return new GuildSticker(
			(await request.post(
				`guilds/${guild_id}/stickers`,
				sticker
			)) as unknown as Sticker
		)
	},
	/** Edit the given sticker */
	async edit(
		guild_id: Snowflake,
		sticker_id: Snowflake,
		sticker: EditParams
	): Promise<Sticker> {
		return new GuildSticker(
			(await request.patch(
				`guilds/${guild_id}/stickers/${sticker_id}`,
				sticker
			)) as unknown as Sticker
		)
	},
	/** Delete the given sticker */
	async delete(guild_id: Snowflake, sticker_id: Snowflake): Promise<void> {
		return (await request.delete(
			`guilds/${guild_id}/stickers/${sticker_id}`
		)) as unknown as void
	}
}

export default { get, listPacks, guild }
