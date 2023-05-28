import request from '../utils/request.js'
import { Guild, Snowflake, Template } from '../types'
/** Returns a guild template object for the given code */
async function get(code: string): Promise<Template> {
	return request.get(`guilds/templates/${code}`) as unknown as Template
}
/** Create a new guild based on a template. */
async function createGuild(
	code: string,
	guild: {
		/** name of the guild (2-100 characters) */
		name: string
		/** base64 128x128 image for the guild icon */
		icon?: string
	}
): Promise<Guild> {
	return request.post(`guilds/templates/${code}`, guild) as unknown as Guild
}
/** Returns an array of guild template objects */
async function list(guild_id: Snowflake): Promise<Template[]> {
	return request.get(`guilds/${guild_id}/templates`) as unknown as Template[]
}
/** Creates a template for the guild */
async function create(
	guild_id: Snowflake,
	template: {
		/** name of the template (1-100 characters) */
		name: string
		/** description for the template (0-120 characters) */
		description?: string | null
	}
): Promise<Template> {
	return request.post(
		`guilds/${guild_id}/templates`,
		template
	) as unknown as Template
}
/** Syncs the template to the guild's current state */
async function sync(guild_id: Snowflake, code: string): Promise<Template> {
	return request.put(
		`guilds/${guild_id}/templates/${code}`
	) as unknown as Template
}
/** Modifies the template's metadata */
async function modify(
	guild_id: Snowflake,
	code: string,
	template: {
		/** name of the template (1-100 characters) */
		name?: string
		/** ndescription for the template (0-120 characters) */
		description?: string | null
	}
): Promise<Template> {
	return request.patch(
		`guilds/${guild_id}/templates/${code}`,
		template
	) as unknown as Template
}
/** Deletes the template */
async function _delete(guild_id: Snowflake, code: string): Promise<void> {
	return request.delete(
		`guilds/${guild_id}/templates/${code}`
	) as unknown as void
}
export default { get, createGuild, list, create, sync, modify, delete: _delete }
