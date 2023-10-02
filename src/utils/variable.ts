import EventEmitter from 'node:events'

export const variable: Record<string, string | undefined> = {}
export const emitter = new EventEmitter()
export function set(key: string, value: string) {
	variable[key] = value
	emitter.emit('set', key, value)
}
export function get(key: string) {
	return variable[key]
}
export default { variable, emitter, set, get }
