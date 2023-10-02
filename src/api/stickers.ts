import request from '../utils/request.js'
import toCamelCase from '../utils/toCamelCase.js'
import type { Snowflake } from '../types'
import type { User } from './users.js'
/** Returns a sticker object for the given **Non Guild** sticker ID */
async function get(stickerId: Snowflake): Promise<Sticker> {
	return (await request.get(`stickers/${stickerId}`)) as unknown as Sticker
}
/** Returns the list of sticker packs available to Nitro subscribers */
async function listPacks(): Promise<{ stickerPacks: StickerPack[] }> {
	return (await request.get(`sticker-packs`)) as unknown as {
		stickerPacks: StickerPack[]
	}
}

class GuildSticker {
	id!: Snowflake
	packId?: `${bigint}`
	name!: string
	description!: string | null
	tags!: string
	asset?: string
	type!: StickerType.Guild
	formatType!: FormatType
	available?: boolean
	guildId!: `${bigint}`
	user!: User
	sortValue?: number

	/** Gets this sticker
	 *
	 * Also updates this class instance
	 */
	async get() {
		const result = await guild.get(this.guildId, this.id)
		Object.assign(this, result)
		return result
	}

	/** Edits this sticker
	 *
	 * Also updates this class instance
	 */
	async edit(sticker: EditParams) {
		const result = await guild.edit(this.guildId, this.id, sticker)
		Object.assign(this, result)
		return result
	}

	/** Deletes this sticker */
	async delete() {
		return await guild.delete(this.guildId, this.id)
	}

	constructor(data: unknown) {
		Object.assign(this, toCamelCase(data))
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
	async list(guildId: Snowflake): Promise<GuildSticker[]> {
		return ((await request.get(`guilds/${guildId}/stickers`)) as unknown[]).map(
			(v) => new GuildSticker(v)
		)
	},
	/** Returns a sticker object for the given guild and sticker IDs */
	async get(guildId: Snowflake, stickerId: Snowflake): Promise<GuildSticker> {
		return new GuildSticker(
			await request.get(`guilds/${guildId}/stickers/${stickerId}`)
		)
	},
	/** Create a new sticker for the guild */
	async create(
		guildId: Snowflake,
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
	): Promise<GuildSticker> {
		return new GuildSticker(
			await request.post(`guilds/${guildId}/stickers`, sticker)
		)
	},
	/** Edit the given sticker */
	async edit(
		guildId: Snowflake,
		stickerId: Snowflake,
		sticker: EditParams
	): Promise<GuildSticker> {
		return new GuildSticker(
			await request.patch(`guilds/${guildId}/stickers/${stickerId}`, sticker)
		)
	},
	/** Delete the given sticker */
	async delete(guildId: Snowflake, stickerId: Snowflake): Promise<void> {
		await request.delete(`guilds/${guildId}/stickers/${stickerId}`)
	}
}
export enum FormatType {
	PNG = 1,
	APNG,
	LOTTIE,
	GIF
}
export enum StickerType {
	/** an official sticker in a pack */
	Standard = 1,
	/** a sticker uploaded to a guild for the guild's members*/
	Guild
}
export { get, listPacks, guild }
export default { get, listPacks, guild }

type Sticker = {
	/** id of sticker */
	id: Snowflake
	/** id of pack the sticker is from */
	packId?: Snowflake
	/** name of sticker */
	name: string
	/** description of sticker */
	description: string | null
	/** autocomplete/suggestion tags for sticker */
	tags: string
	/** **deprecated** - previously sticker asset hash, now empty string */
	asset?: string
	/** type of sticker */
	type: StickerType
	/** type of sticker format */
	formatType: FormatType
	/** whether guild sticker can be used */
	available?: boolean
	/** id of guild that owns this sticker */
	guildId?: Snowflake
	/** user that uploaded guild sticker */
	user: User
	/** standard sticker's sort order within its pack */
	sortValue?: number
}
/** Represents a pack of standard stickers */
type StickerPack = {
	/** id of the sticker pack */
	id: Snowflake
	/** the stickers in the pack */
	stickers: Sticker[]
	/** name of the sticker pack */
	name: string
	/** id of the pack's SKU */
	skuId: Snowflake
	/** id of a sticker in the pack which is shown as the pack's icon */
	coverStickerId?: Snowflake
	/** description of the sticker pack */
	description: string
	/** id of the sticker pack's banner image */
	bannerAssetId?: Snowflake
}
type StickerItem = {
	/** id of the sticker */
	id: Snowflake
	/** name of the sticker */
	name: string
	/** type of sticker format (`1`: PNG, `2`: APNG, `3`: LOTTIE, `4`: GIF)*/
	formatType: FormatType
}
export type { Sticker, StickerPack, StickerItem }
