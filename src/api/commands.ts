import request from '../utils/request.js'
import {
	Command,
	CommandOption,
	CommandPermission,
	CommandType,
	LocaleObject,
	Snowflake
} from '../types'

async function create(
	command: {
		/** Name of command, 1-32 characters */
		name: string
		/** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
		name_localizations?: LocaleObject | null
		/** 1-100 character description */
		description?: string
		/** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
		description_localizations?: LocaleObject | null
		/** Parameters for the command */
		options?: CommandOption[]
		/** Set of permissions represented as a bit set */
		default_member_permissions?: string | null
		/** Replaced by `default_member_permissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
		default_permission?: boolean
		/** Type of command, defaults `1` if not set */
		type?: CommandType
		/** Indicates whether the command is age-restricted */
		nsfw?: boolean
	},
	guild_id?: Snowflake
): Promise<Command> {
	const URL = guild_id
		? `applications/{APP_ID}/guilds/${guild_id}/commands`
		: `applications/{APP_ID}/commands`
	return request.post(URL, command) as unknown as Command
}
async function _delete(
	command_id: Snowflake,
	guild_id?: Snowflake
): Promise<void> {
	const URL = guild_id
		? `applications/{APP_ID}/guilds/${guild_id}/commands/${command_id}`
		: `applications/{APP_ID}/commands/${command_id}`
	return request.delete(URL) as unknown as void
}
async function update(
	command_id: Snowflake,
	command: {
		/** Name of command, 1-32 characters */
		name?: string
		/** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
		name_localizations?: LocaleObject | null
		/** 1-100 character description */
		description?: string
		/** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
		description_localizations?: LocaleObject | null
		/** Parameters for the command */
		options?: CommandOption[]
		/** Set of permissions represented as a bit set */
		default_member_permissions?: string | null
		/** Replaced by `default_member_permissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
		default_permission?: boolean
		/** Indicates whether the command is age-restricted */
		nsfw?: boolean
	},
	guild_id?: Snowflake
): Promise<Command> {
	const URL = guild_id
		? `applications/{APP_ID}/guilds/${guild_id}/commands/${command_id}`
		: `applications/{APP_ID}/commands/${command_id}`
	return request.patch(URL, command) as unknown as Command
}
async function list(
	guild_id?: Snowflake | null,
	with_localizations?: boolean
): Promise<Command[]> {
	const URL = guild_id
		? `applications/{APP_ID}/guilds/${guild_id}/commands`
		: `applications/{APP_ID}/commands`
	return request.get(URL, {
		with_localizations: with_localizations
	}) as unknown as Command[]
}
async function bulkOverwrite(
	commands: {
		/** ID of the command, if known */
		id?: Snowflake
		/** Name of command, 1-32 characters */
		name: string
		/** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
		name_localizations?: LocaleObject | null
		/** 1-100 character description */
		description: string
		/** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
		description_localizations?: LocaleObject | null
		/** Parameters for the command */
		options?: CommandOption[]
		/** Set of permissions represented as a bit set */
		default_member_permissions?: string | null
		/** Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
		dm_permission?: boolean | null
		/** Replaced by `default_member_permissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
		default_permission?: boolean
		/** Type of command, defaults `1` if not set */
		type?: CommandType
		/** Indicates whether the command is age-restricted */
		nsfw?: boolean
	}[],
	guild_id?: Snowflake
): Promise<void> {
	const URL = guild_id
		? `applications/{APP_ID}/guilds/${guild_id}/commands`
		: `applications/{APP_ID}/commands`

	return request.post(URL, commands) as unknown as void
}
async function get(
	command_id: Snowflake,
	guild_id?: Snowflake
): Promise<Command> {
	const URL = guild_id
		? `applications/{APP_ID}/guilds/${guild_id}/commands/${command_id}`
		: `applications/{APP_ID}/commands/${command_id}`

	return request.get(URL) as unknown as Command
}
const permissions = {
	async get(
		command_id: Snowflake,
		guild_id?: Snowflake
	): Promise<CommandPermission> {
		const URL = guild_id
			? `applications/{APP_ID}/guilds/${guild_id}/commands/${command_id}/permissions`
			: `applications/{APP_ID}/commands/${command_id}/permissions`

		return request.get(URL) as unknown as CommandPermission
	},
	async update(
		command_id: Snowflake,
		permissions: Partial<CommandPermission>[],
		guild_id?: Snowflake
	) {
		let URL = guild_id
			? `applications/{APP_ID}/guilds/${guild_id}/commands/${command_id}/permissions`
			: `applications/{APP_ID}/commands/${command_id}/permissions`

		return request.put(URL, { permissions: permissions })
	}
}
export default {
	create,
	delete: _delete,
	update,
	list,
	bulkOverwrite,
	get,
	permissions
}
