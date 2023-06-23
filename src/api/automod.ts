import request from '../utils/request.js'
import {
	AutomodAction,
	TriggerMetadata,
	Snowflake,
	AutomodRule
} from '../types'

class Rule implements AutomodRule {
	id: Snowflake
	guild_id: Snowflake
	name: string
	creator_id: Snowflake
	event_type: 1
	trigger_type: 1 | 3 | 4 | 5
	trigger_metadata: object
	actions: AutomodAction[]
	enabled: boolean
	exempt_roles: Snowflake[]
	exempt_channels: Snowflake[]

	async get() {
		const rule = await get(this.guild_id, this.id)
		Object.assign(this, rule)
		return rule
	}
	async edit(updatedRule: Partial<EditParams>) {
		const modified = await edit(this.guild_id, this.id, updatedRule)
		Object.assign(this, modified)
		return modified
	}
	async delete() {
		return await _delete(this.guild_id, this.id)
	}
	constructor(rule: AutomodRule) {
		this.id = rule.id
		this.guild_id = rule.guild_id
		this.name = rule.name
		this.creator_id = rule.creator_id
		this.event_type = rule.event_type
		this.trigger_type = rule.trigger_type
		this.trigger_metadata = rule.trigger_metadata
		this.actions = rule.actions
		this.enabled = rule.enabled
		this.exempt_roles = rule.exempt_roles
		this.exempt_channels = rule.exempt_channels
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
	event_type: number
	/** the trigger type */
	trigger_type: 1 | 3 | 4 | 5
	/** the trigger metadata */
	trigger_metadata?: TriggerMetadata
	/** the actions which will execute when the rule is triggered */
	actions: AutomodAction[]
	/** whether the rule is enabled (`false` by default) */
	enabled?: boolean
	/** the role ids that should not be affected by the rule (Maximum of 20) */
	exempt_roles?: Snowflake[]
	/** the channel ids that should not be affected by the rule (Maximum of 50) */
	exempt_channels?: Snowflake[]
}
/** Create a new rule */
async function create(guildId: Snowflake, rule: CreateParams): Promise<Rule> {
	const newRule = (await request.post(
		`guilds/${guildId}/auto-moderation/rules`,
		rule
	)) as unknown as AutomodRule
	return new Rule(newRule)
}
type EditParams = Omit<CreateParams, 'trigger_type'>
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
