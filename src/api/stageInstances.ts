import request from '../utils/request.js'
import {
	Snowflake,
	StageInstance as RawStageInstance,
	StageInstancePrivacyLevel
} from '../types'
import toCamelCase from '../utils/toCamelCase.js'

class StageInstance {
	id!: Snowflake
	guildId!: Snowflake
	channelId!: Snowflake
	topic!: string
	privacyLevel!: StageInstancePrivacyLevel
	discoverableDisabled!: boolean
	guildScheduledEventId!: Snowflake | null

	/** Gets this stage instance
	 *
	 * Also updates this class instance
	 */
	async get(): Promise<StageInstance> {
		const result = await get(this.channelId)
		Object.assign(this, result)
		return result
	}
	/** Edits this stage instance
	 *
	 * Also updates this class instance
	 */
	async edit(instance: EditParams): Promise<StageInstance> {
		const result = await edit(this.channelId, instance)
		Object.assign(this, result)
		return result
	}
	/** Deletes this stage instance */
	async delete() {
		return await _delete(this.channelId)
	}

	constructor(data: RawStageInstance) {
		Object.assign(this, toCamelCase(data))
	}
}

/** Creates a new Stage instance associated to a Stage channel. */
async function create(instance: {
	/** The id of the Stage channel */
	channelId: Snowflake
	/** The topic of the Stage instance (1-120 characters) */
	topic: string
	/** The privacy level of the Stage instance (default) */
	privacyLevel: StageInstancePrivacyLevel
	/** Notify @everyone that a Stage instance has started */
	sendStartNotification?: boolean
}): Promise<StageInstance> {
	return new StageInstance(
		(await request.post(
			`stage-instances`,
			instance
		)) as unknown as RawStageInstance
	)
}
/** Gets the stage instance associated with the Stage channel, if it exists. */
async function get(channelId: Snowflake): Promise<StageInstance> {
	return new StageInstance(
		(await request.get(
			`stage-instances/${channelId}`
		)) as unknown as RawStageInstance
	)
}
type EditParams = {
	/** The topic of the Stage instance (1-120 characters) */
	topic?: string
	/** The privacy level of the Stage instance */
	privacyLevel?: StageInstancePrivacyLevel
}
/** Edit an existing Stage instance. */
async function edit(
	channelId: Snowflake,
	instance: EditParams
): Promise<StageInstance> {
	return new StageInstance(
		(await request.patch(
			`stage-instances/${channelId}`,
			instance
		)) as unknown as RawStageInstance
	)
}
/** Deletes the Stage instance.  */
async function _delete(channelId: Snowflake): Promise<void> {
	return request.delete(`stage-instances/${channelId}`) as unknown as void
}
export default { create, get, edit, delete: _delete }
