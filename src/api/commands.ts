import request from '../utils/request.js'
import {
	Command as RawCommand,
	CommandOption,
	CommandPermission,
	CommandType,
	LocaleObject,
	Snowflake
} from '../types'
import toCamelCase from '../utils/toCamelCase.js'

class Command {
	id!: Snowflake
	type?: number
	applicationId!: Snowflake
	guildId?: Snowflake
	name!: string
	nameLocalizations: object | null | undefined
	description!: string
	descriptionLocalizations?: object | null | undefined
	options?: CommandOption[]
	defaultMemberPermissions!: string | null
	dmPermission?: boolean
	defaultPermission?: boolean | null | undefined
	nsfw?: boolean
	version!: string

	/** Deletes this channel */
	async delete() {
		return await _delete(this.id, this.guildId)
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
		const result = await get(this.id, this.guildId)
		Object.assign(this, result)
		return result
	}
	async getPermissions(guildId: Snowflake): Promise<CommandPermission>
	async getPermissions(guildId?: undefined): Promise<CommandPermission>
	async getPermissions(guildId?: Snowflake): Promise<CommandPermission> {
		if (guildId) {
			return await permissions.get(this.id, guildId)
		} else if (!this.guildId) {
			throw new Error('This is not a guild command, must have `guildId`')
		} else {
			return await permissions.get(this.id, this.guildId)
		}
	}
	constructor(command: RawCommand) {
		Object.assign(this, toCamelCase(command))
	}
}

async function create(
	command: {
		/** Name of command, 1-32 characters */
		name: string
		/** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
		nameLocalizations?: LocaleObject | null
		/** 1-100 character description */
		description?: string
		/** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
		descriptionLocalizations?: LocaleObject | null
		/** Parameters for the command */
		options?: CommandOption[]
		/** Set of permissions represented as a bit set */
		defaultMemberPermissions?: string | null
		/** Replaced by `defaultMemberPermissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
		defaultPermission?: boolean
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
	nameLocalizations?: LocaleObject | null
	/** 1-100 character description */
	description?: string
	/** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
	descriptionLocalizations?: LocaleObject | null
	/** Parameters for the command */
	options?: CommandOption[]
	/** Set of permissions represented as a bit set */
	defaultMemberPermissions?: string | null
	/** Replaced by `defaultMemberPermissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
	defaultPermission?: boolean
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
	withLocalizations?: boolean
): Promise<Command[]> {
	const URL = guildId
		? `applications/{APP_ID}/guilds/${guildId}/commands`
		: `applications/{APP_ID}/commands`
	const commands = (await request.get(URL, {
		with_localizations: withLocalizations
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
		nameLocalizations?: LocaleObject | null
		/** 1-100 character description */
		description: string
		/** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
		descriptionLocalizations?: LocaleObject | null
		/** Parameters for the command */
		options?: CommandOption[]
		/** Set of permissions represented as a bit set */
		defaultMemberPermissions?: string | null
		/** Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
		dmPermission?: boolean | null
		/** Replaced by `defaultMemberPermissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
		defaultPermission?: boolean
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
