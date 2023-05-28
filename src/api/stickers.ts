import request from '../utils/request.js'
import { Snowflake, Sticker, StickerPack } from '../types'

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

const guild = {
	/** Returns an array of sticker objects for the given guild */
	async list(guild_id: Snowflake): Promise<Sticker[]> {
		return request.get(`guilds/${guild_id}/stickers`) as unknown as Sticker[]
	},
	/** Returns a sticker object for the given guild and sticker IDs */
	async get(guild_id: Snowflake, sticker_id: Snowflake): Promise<Sticker> {
		return request.get(
			`guilds/${guild_id}/stickers/${sticker_id}`
		) as unknown as Sticker
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
		return request.post(
			`guilds/${guild_id}/stickers`,
			sticker
		) as unknown as Sticker
	},
	/** Modify the given sticker */
	async modify(
		guild_id: Snowflake,
		sticker_id: Snowflake,
		sticker: {
			/** name of the sticker (2-30 characters) */
			name?: string
			/** description of the sticker (2-100 characters) */
			description?: string | null
			/** autocomplete/suggestion tags for the sticker (max 200 characters) */
			tags: string
		}
	): Promise<Sticker> {
		return request.patch(
			`guilds/${guild_id}/stickers/${sticker_id}`,
			sticker
		) as unknown as Sticker
	},
	/** Delete the given sticker */
	async delete(guild_id: Snowflake, sticker_id: Snowflake): Promise<void> {
		return request.delete(
			`guilds/${guild_id}/stickers/${sticker_id}`
		) as unknown as void
	}
}

export default { get, listPacks, guild }
