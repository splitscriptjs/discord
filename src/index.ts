import { listen } from './auth/listen.js'
import { login } from './auth/login.js'

import automod from './api/automod.js'
import bans from './api/bans.js'
import channels from './api/channels.js'
import commands from './api/commands.js'
import emojis from './api/emojis.js'
import followups from './api/followups.js'
import guilds from './api/guilds.js'
import integrations from './api/integrations.js'
import invites from './api/invites.js'
import members from './api/members.js'
import messages from './api/messages.js'
import reactions from './api/reactions.js'
import responses from './api/responses.js'
import roles from './api/roles.js'
import scheduledEvents from './api/scheduledEvents.js'
import stageInstances from './api/stageInstances.js'
import stickers from './api/stickers.js'
import templates from './api/templates.js'
import users from './api/users.js'
import webhooks from './api/webhooks.js'
import widgets from './api/widgets.js'

// CJS
export {
	listen,
	login,
	automod,
	bans,
	channels,
	commands,
	emojis,
	followups,
	guilds,
	integrations,
	invites,
	members,
	messages,
	reactions,
	responses,
	roles,
	scheduledEvents,
	stageInstances,
	// sticker create prob broken
	stickers,
	templates,
	users,
	webhooks,
	widgets
}

// ESM
export default {
	listen,
	login,

	automod,
	bans,
	channels,
	commands,
	emojis,
	followups,
	guilds,
	integrations,
	invites,
	members,
	messages,
	reactions,
	responses,
	roles,
	scheduledEvents,
	stageInstances,
	// sticker create prob broken
	stickers,
	templates,
	users,
	webhooks,
	widgets
}

import * as Events from './Events.js'
export type { Events }
