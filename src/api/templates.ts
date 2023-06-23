import request from '../utils/request.js'
import { Guild, Snowflake, Template as RawTemplate, User } from '../types'

class Template implements RawTemplate {
	//#region
	code: string
	name: string
	description: string | null
	usage_count: number
	creator_id: Snowflake
	creator: User
	created_at: string
	updated_at: string
	source_guild_id: Snowflake
	serialized_source_guild: Partial<Guild>
	is_dirty: boolean | null
	//#endregion

	/** Gets this template
	 *
	 * Also updates this class instance
	 */
	async get() {
		const result = await get(this.code)
		Object.assign(this, this.code)
		return result
	}

	/** Creates a guild from this template  */
	async createGuild(guild: CreateGuildParams) {
		return await createGuild(this.code, guild)
	}

	/** Syncs the template to the current guild state
	 *
	 * Also updates this class instance
	 */
	async sync() {
		const result = await sync(this.source_guild_id, this.code)
		Object.assign(this, result)
		return result
	}

	/** Updates this template
	 *
	 * Also updates this class instance
	 */
	async edit(template: EditParams) {
		const result = await edit(this.source_guild_id, this.code, template)
		Object.assign(this, result)
		return result
	}

	/** Deletes this template */
	async delete() {
		return await _delete(this.source_guild_id, this.code)
	}

	constructor(data: RawTemplate) {
		this.code = data.code
		this.name = data.name
		this.description = data.description
		this.usage_count = data.usage_count
		this.creator_id = data.creator_id
		this.creator = data.creator
		this.created_at = data.created_at
		this.updated_at = data.updated_at
		this.source_guild_id = data.source_guild_id
		this.serialized_source_guild = data.serialized_source_guild
		this.is_dirty = data.is_dirty
	}
}

/** Returns a guild template object for the given code */
async function get(code: string): Promise<Template> {
	return new Template(
		(await request.get(`guilds/templates/${code}`)) as unknown as RawTemplate
	)
}
type CreateGuildParams = {
	/** name of the guild (2-100 characters) */
	name: string
	/** base64 128x128 image for the guild icon */
	icon?: string
}
/** Create a new guild based on a template. */
async function createGuild(
	code: string,
	guild: CreateGuildParams
): Promise<Guild> {
	return (await request.post(
		`guilds/templates/${code}`,
		guild
	)) as unknown as Guild
}
/** Returns an array of guild template objects */
async function list(guildId: Snowflake): Promise<Template[]> {
	return (
		(await request.get(
			`guilds/${guildId}/templates`
		)) as unknown as RawTemplate[]
	).map((v) => new Template(v))
}
/** Creates a template for the guild */
async function create(
	guildId: Snowflake,
	template: {
		/** name of the template (1-100 characters) */
		name: string
		/** description for the template (0-120 characters) */
		description?: string | null
	}
): Promise<Template> {
	return new Template(
		(await request.post(
			`guilds/${guildId}/templates`,
			template
		)) as unknown as RawTemplate
	)
}
/** Syncs the template to the guild's current state */
async function sync(guildId: Snowflake, code: string): Promise<Template> {
	return new Template(
		(await request.put(
			`guilds/${guildId}/templates/${code}`
		)) as unknown as RawTemplate
	)
}
type EditParams = {
	/** name of the template (1-100 characters) */
	name?: string
	/** description for the template (0-120 characters) */
	description?: string | null
}
/** Edit the template's metadata */
async function edit(
	guildId: Snowflake,
	code: string,
	template: EditParams
): Promise<Template> {
	return new Template(
		(await request.patch(
			`guilds/${guildId}/templates/${code}`,
			template
		)) as unknown as Template
	)
}
/** Deletes the template */
async function _delete(guildId: Snowflake, code: string): Promise<void> {
	return (await request.delete(
		`guilds/${guildId}/templates/${code}`
	)) as unknown as void
}
export default { get, createGuild, list, create, sync, edit, delete: _delete }
