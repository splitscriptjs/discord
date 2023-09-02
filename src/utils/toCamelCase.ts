export default function toCamelCase<
	T extends Record<string, unknown> | Array<unknown> | undefined | null | unknown
>(value: T): T extends Array<object> ? {[K in keyof T]: KeysToCamelCase<T[K]>} :  (T extends object ? KeysToCamelCase<T>: T) {
	if (typeof value !== 'object' || value === null) {
		return value as  T extends Array<object> ? {[K in keyof T]: KeysToCamelCase<T[K]>} :  (T extends object ? KeysToCamelCase<T>: T)
	}
	if (Array.isArray(value)){ 
		if (value.every(item => typeof item === 'object' && item !== null)) {
			return value.map((sub) => toCamelCase(sub)) as unknown as  T extends Array<object> ? {[K in keyof T]: KeysToCamelCase<T[K]>} :  (T extends object ? KeysToCamelCase<T>: T)
		}
	}
	const newObj: Record<string, unknown>  = {}
	for (const key in value) {
		if (Object.prototype.hasOwnProperty.call(value, key)) {
			newObj[key.toLowerCase().replace(/_(\w)/g, (_, c) => c.toUpperCase())] = toCamelCase((value as Record<string, unknown>)[key] as Record<string, unknown> | null | undefined)
		}
	}
	return newObj as T extends Array<object> ? {[K in keyof T]: KeysToCamelCase<T[K]>} :  (T extends object ? KeysToCamelCase<T>: T)
}

type CamelCase<S extends string> = S extends `${infer P}_${infer Rest}`
	? `${Lowercase<P>}${Capitalize<CamelCase<Rest>>}`
	: S;

type KeysToCamelCase<T> = {
    [K in keyof T as CamelCase<string &K>]:  T[K] extends Array<unknown> ? {[Key in keyof T[K]]: KeysToCamelCase<T[K][Key]>} : T[K] extends object ? KeysToCamelCase<T[K]> : T[K]
}