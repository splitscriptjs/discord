import request from '../utils/request.js'
import { Guild, Snowflake, Template as RawTemplate, User } from '../types'
import toCamelCase from '../utils/toCamelCase.js'

class Template {
	//#region
	code!: string
	name!: string
	description!: string | null
	usageCount!: number
	creatorId!: Snowflake
	creator!: User
	createdAt!: string
	updatedAt!: string
	sourceGuildId!: Snowflake
	serializedSourceGuild!: Partial<Guild>
	isDirty!: boolean | null
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
		const result = await sync(this.sourceGuildId, this.code)
		Object.assign(this, result)
		return result
	}

	/** Updates this template
	 *
	 * Also updates this class instance
	 */
	async edit(template: EditParams) {
		const result = await edit(this.sourceGuildId, this.code, template)
		Object.assign(this, result)
		return result
	}

	/** Deletes this template */
	async delete() {
		return await _delete(this.sourceGuildId, this.code)
	}

	constructor(data: RawTemplate) {
		Object.assign(this, toCamelCase(data))
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
		)) as unknown as RawTemplate
	)
}
/** Deletes the template */
async function _delete(guildId: Snowflake, code: string): Promise<void> {
	return (await request.delete(
		`guilds/${guildId}/templates/${code}`
	)) as unknown as void
}
export default { get, createGuild, list, create, sync, edit, delete: _delete }
