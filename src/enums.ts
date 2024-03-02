/** Visual appearance of the button */
export enum ButtonStyle {
	/** blurple */
	Primary = 1,
	/** gray */
	Secondary = 2,
	/** green */
	Success = 3,
	/** red */
	Danger = 4,
	/** gray - navigates to url */
	Link = 5
}
/** Type of component for a message */
export enum ComponentType {
	/** Container for other components */
	ActionRow = 1,
	/** Button object */
	Button = 2,
	/** Select menu for picking from defined text options */
	StringSelect = 3,
	/** Text input object */
	TextInput = 4,
	/** Select menu for users */
	UserSelect = 5,
	/** Select menu for roles */
	RoleSelect = 6,
	/** Select menu for mentionables (users and roles) */
	MentionableSelect = 7,
	/** Select menu for channels */
	ChannelSelect = 8
}
/** Select menu components */
export enum SelectType {
	/** Select menu for picking from defined text options */
	StringSelect = 3,
	/** Select menu for users */
	UserSelect = 5,
	/** Select menu for roles */
	RoleSelect = 6,
	/** Select menu for mentionables (users and roles) */
	MentionableSelect = 7,
	/** Select menu for channels */
	ChannelSelect = 8
}
/** Type of interaction that triggered */
export enum InteractionType {
	Ping = 1,
	ApplicationCommand = 2,
	MessageComponent = 3,
	ApplicationCommandAutocomplete = 4,
	ModalSubmit = 5
}
/** The type of activity */
export enum ActivityType {
	/** Playing {name} */
	Game,
	/** Streaming {details} */
	Streaming,
	/** Listening to {name} */
	Listening,
	/** Watching {name} */
	Watching,
	/** {emoji} {state} */
	Custom,
	/** Competing in {name} */
	Competing
}
/** Flag bits that describe the activity */
export enum ActivityFlag {
	Instance = 1 << 0,
	Join = 1 << 1,
	Spectate = 1 << 2,
	JoinRequest = 1 << 3,
	Sync = 1 << 4,
	Play = 1 << 5,
	PartyPrivacyFriends = 1 << 6,
	PartyPrivacyVoiceChannel = 1 << 7,
	Embedded = 1 << 8
}
/** User's membership state on a team */
export enum MembershipState {
	Invited = 1,
	Accepted = 2
}
