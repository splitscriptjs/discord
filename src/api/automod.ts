import request from '../utils/request.js'
import {
	AutomodAction,
	TriggerMetadata,
	Snowflake,
	AutomodRule
} from '../types'
import toCamelCase from '../utils/toCamelCase.js'

class Rule {
	id!: Snowflake
	guildId!: Snowflake
	name!: string
	creatorId!: Snowflake
	eventType!: 1
	triggerType!: 1 | 3 | 4 | 5
	triggerMetadata!: object
	actions!: AutomodAction[]
	enabled!: boolean
	exemptRoles!: Snowflake[]
	exemptChannels!: Snowflake[]

	async get() {
		const rule = await get(this.guildId, this.id)
		Object.assign(this, rule)
		return rule
	}
	async edit(updatedRule: Partial<EditParams>) {
		const modified = await edit(this.guildId, this.id, updatedRule)
		Object.assign(this, modified)
		return modified
	}
	async delete() {
		return await _delete(this.guildId, this.id)
	}
	constructor(rule: AutomodRule) {
		Object.assign(this, toCamelCase(rule))
	}
}
/** Get a list of all rules currently configured for the guild */
async function list(guildId: Snowflake): Promise<Rule[]> {
	const rules = (await request.get(
		`guilds/${guildId}/auto-moderation/rules`
	)) as unknown as AutomodRule[]
	return rules.map((rule) => new Rule(rule))
}

/** Get a single rule  */
async function get(guildId: Snowflake, ruleId: Snowflake): Promise<Rule> {
	const rule = (await request.get(
		`guilds/${guildId}/auto-moderation/rules/${ruleId}`
	)) as unknown as AutomodRule
	return new Rule(rule)
}
type CreateParams = {
	/** the rule name */
	name: string
	/** the event type */
	eventType: number
	/** the trigger type */
	triggerType: 1 | 3 | 4 | 5
	/** the trigger metadata */
	triggerMetadata?: TriggerMetadata
	/** the actions which will execute when the rule is triggered */
	actions: AutomodAction[]
	/** whether the rule is enabled (`false` by default) */
	enabled?: boolean
	/** the role ids that should not be affected by the rule (Maximum of 20) */
	exemptRoles?: Snowflake[]
	/** the channel ids that should not be affected by the rule (Maximum of 50) */
	exemptChannels?: Snowflake[]
}
/** Create a new rule */
async function create(guildId: Snowflake, rule: CreateParams): Promise<Rule> {
	const newRule = (await request.post(
		`guilds/${guildId}/auto-moderation/rules`,
		rule
	)) as unknown as AutomodRule
	return new Rule(newRule)
}
type EditParams = Omit<CreateParams, 'triggerType'>
/** Edit an existing rule */
async function edit(
	guildId: Snowflake,
	ruleId: Snowflake,
	rule: Partial<EditParams>
): Promise<Rule> {
	const updatedRule = (await request.patch(
		`guilds/${guildId}/auto-moderation/rules/${ruleId}`,
		rule
	)) as unknown as AutomodRule
	return new Rule(updatedRule)
}
/** Delete a rule */
async function _delete(guildId: Snowflake, ruleId: Snowflake): Promise<void> {
	return request.delete(
		`guilds/${guildId}/auto-moderation/rules/${ruleId}`
	) as unknown as void
}

export default { list, get, create, edit, delete: _delete }
