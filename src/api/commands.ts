import request from '../utils/request.js'
import {
	Command as RawCommand,
	CommandOption,
	CommandPermission,
	CommandType,
	LocaleObject,
	Snowflake
} from '../types'

class Command {
	id: Snowflake
	type?: number
	application_id: Snowflake
	guild_id?: Snowflake
	name: string
	name_localizations: object | null | undefined
	description: string
	description_localizations?: object | null | undefined
	options?: CommandOption[]
	default_member_permissions: string | null
	dm_permission?: boolean
	default_permission?: boolean | null | undefined
	nsfw?: boolean
	version: string

	/** Deletes this channel */
	async delete() {
		return await _delete(this.id, this.guild_id)
	}
	/** Updates this channel
	 *
	 * Also updates this class instance
	 */
	async edit(updatedCommand: EditParams): Promise<Command> {
		const result = await edit(this.id, updatedCommand)
		Object.assign(this, result)
		return result
	}
	/** Gets this command
	 *
	 * Also updates this class instance
	 */
	async get() {
		const result = await get(this.id, this.guild_id)
		Object.assign(this, result)
		return result
	}
	async getPermissions(guildId: Snowflake): Promise<CommandPermission>
	async getPermissions(guildId?: undefined): Promise<CommandPermission>
	async getPermissions(guildId?: Snowflake): Promise<CommandPermission> {
		if (guildId) {
			return await permissions.get(this.id, guildId)
		} else if (!this.guild_id) {
			throw new Error('This is not a guild command, must have `guildId`')
		} else {
			return await permissions.get(this.id, this.guild_id)
		}
	}
	constructor(command: RawCommand) {
		this.id = command.id
		this.type = command.type
		this.application_id = command.application_id
		this.guild_id = command.guild_id
		this.name = command.name
		this.name_localizations = command.name_localizations
		this.description = command.description
		this.description_localizations = command.description_localizations
		this.options = command.options
		this.default_member_permissions = command.default_member_permissions
		this.dm_permission = command.dm_permission
		this.default_permission = command.default_permission
		this.nsfw = command.nsfw
		this.version = command.version
	}
}
async function a() {
	const command = await get('1')
	const perms = await command.getPermissions()
}

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
	guildId?: Snowflake
): Promise<Command> {
	const URL = guildId
		? `applications/{APP_ID}/guilds/${guildId}/commands`
		: `applications/{APP_ID}/commands`
	const _command = request.post(URL, command) as unknown as RawCommand
	return new Command(_command)
}
async function _delete(
	commandId: Snowflake,
	guildId?: Snowflake
): Promise<void> {
	const URL = guildId
		? `applications/{APP_ID}/guilds/${guildId}/commands/${commandId}`
		: `applications/{APP_ID}/commands/${commandId}`
	return request.delete(URL) as unknown as void
}

type EditParams = {
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
}
async function edit(
	commandId: Snowflake,
	command: EditParams,
	guildId?: Snowflake
): Promise<Command> {
	const URL = guildId
		? `applications/{APP_ID}/guilds/${guildId}/commands/${commandId}`
		: `applications/{APP_ID}/commands/${commandId}`
	const _command = (await request.patch(URL, command)) as unknown as RawCommand
	return new Command(_command)
}
async function list(
	guildId?: Snowflake | null,
	with_localizations?: boolean
): Promise<Command[]> {
	const URL = guildId
		? `applications/{APP_ID}/guilds/${guildId}/commands`
		: `applications/{APP_ID}/commands`
	const commands = (await request.get(URL, {
		with_localizations: with_localizations
	})) as unknown as RawCommand[]
	return commands.map((command) => new Command(command))
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
	guildId?: Snowflake
): Promise<void> {
	const URL = guildId
		? `applications/{APP_ID}/guilds/${guildId}/commands`
		: `applications/{APP_ID}/commands`

	return request.post(URL, commands) as unknown as void
}
async function get(
	commandId: Snowflake,
	guildId?: Snowflake
): Promise<Command> {
	const URL = guildId
		? `applications/{APP_ID}/guilds/${guildId}/commands/${commandId}`
		: `applications/{APP_ID}/commands/${commandId}`

	const command = request.get(URL) as unknown as RawCommand
	return new Command(command)
}
const permissions = {
	async list(guildId: Snowflake): Promise<CommandPermission[]> {
		return (await request.get(
			`applications/{APP_ID}/guilds/${guildId}/commands/permissions`
		)) as unknown as CommandPermission[]
	},
	async get(
		commandId: Snowflake,
		guildId: Snowflake
	): Promise<CommandPermission> {
		return (await request.get(
			`applications/{APP_ID}/guilds/${guildId}/commands/${commandId}/permissions`
		)) as unknown as CommandPermission
	}
}
export default {
	create,
	delete: _delete,
	edit,
	list,
	bulkOverwrite,
	get,
	permissions
}
