import request from '../utils/request.js'
import {
	Snowflake,
	StageInstance as RawStageInstance,
	StageInstancePrivacyLevel
} from '../types'

class StageInstance implements RawStageInstance {
	id: Snowflake
	guild_id: Snowflake
	channel_id: Snowflake
	topic: string
	privacy_level: StageInstancePrivacyLevel
	discoverable_disabled: boolean
	guild_scheduled_event_id: Snowflake | null

	/** Gets this stage instance
	 *
	 * Also updates this class instance
	 */
	async get(): Promise<StageInstance> {
		const result = await get(this.channel_id)
		Object.assign(this, result)
		return result
	}
	/** Edits this stage instance
	 *
	 * Also updates this class instance
	 */
	async edit(instance: EditParams): Promise<StageInstance> {
		const result = await edit(this.channel_id, instance)
		Object.assign(this, result)
		return result
	}
	/** Deletes this stage instance */
	async delete() {
		return await _delete(this.channel_id)
	}

	constructor(data: RawStageInstance) {
		this.id = data.id
		this.guild_id = data.guild_id
		this.channel_id = data.channel_id
		this.topic = data.topic
		this.privacy_level = data.privacy_level
		this.discoverable_disabled = data.discoverable_disabled
		this.guild_scheduled_event_id = data.guild_scheduled_event_id
	}
}

/** Creates a new Stage instance associated to a Stage channel. */
async function create(instance: {
	/** The id of the Stage channel */
	channel_id: Snowflake
	/** The topic of the Stage instance (1-120 characters) */
	topic: string
	/** The privacy level of the Stage instance (default GUILD_ONLY) */
	privacy_level: StageInstancePrivacyLevel
	/** Notify @everyone that a Stage instance has started */
	send_start_notification?: boolean
}): Promise<StageInstance> {
	return new StageInstance(
		(await request.post(
			`stage-instances`,
			instance
		)) as unknown as RawStageInstance
	)
}
/** Gets the stage instance associated with the Stage channel, if it exists. */
async function get(channel_id: Snowflake): Promise<StageInstance> {
	return new StageInstance(
		(await request.get(
			`stage-instances/${channel_id}`
		)) as unknown as RawStageInstance
	)
}
type EditParams = {
	/** The topic of the Stage instance (1-120 characters) */
	topic?: string
	/** The privacy level of the Stage instance */
	privacy_level?: StageInstancePrivacyLevel
}
/** Edit an existing Stage instance. */
async function edit(
	channel_id: Snowflake,
	instance: EditParams
): Promise<StageInstance> {
	return new StageInstance(
		(await request.patch(
			`stage-instances/${channel_id}`,
			instance
		)) as unknown as RawStageInstance
	)
}
/** Deletes the Stage instance.  */
async function _delete(channel_id: Snowflake): Promise<void> {
	return request.delete(`stage-instances/${channel_id}`) as unknown as void
}
export default { create, get, edit, delete: _delete }
