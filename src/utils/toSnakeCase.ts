export default function toSnakeCase<
	T extends Record<string, unknown> | unknown[] | undefined | null | unknown
>(
	value: T
): T extends object[]
	? { [K in keyof T]: KeysToSnakeCase<T[K]> }
	: T extends object
		? KeysToSnakeCase<T>
		: T {
	if (typeof value !== 'object' || value === null) {
		return value as T extends object[]
			? { [K in keyof T]: KeysToSnakeCase<T[K]> }
			: T extends object
				? KeysToSnakeCase<T>
				: T
	}
	if (Array.isArray(value)) {
		if (value.every((item) => typeof item === 'object' && item !== null)) {
			return value.map((sub: unknown) =>
				toSnakeCase(sub)
			) as unknown as T extends object[]
				? { [K in keyof T]: KeysToSnakeCase<T[K]> }
				: T extends object
					? KeysToSnakeCase<T>
					: T
		} else {
			return value as unknown as T extends object[]
				? { [K in keyof T]: KeysToSnakeCase<T[K]> }
				: T extends object
					? KeysToSnakeCase<T>
					: T
		}
	}

	const newObj: Record<string, unknown> = {}
	for (const key in value) {
		if (Object.prototype.hasOwnProperty.call(value, key)) {
			newObj[key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()] =
				toSnakeCase(
					(value as Record<string, unknown>)[key] as
						| Record<string, unknown>
						| null
						| undefined
				)
		}
	}
	return newObj as T extends object[]
		? { [K in keyof T]: KeysToSnakeCase<T[K]> }
		: T extends object
			? KeysToSnakeCase<T>
			: T
}
type SnakeCase<C extends string> = C extends `${infer A}${infer Rest}`
	? Rest extends Uncapitalize<Rest>
		? `${Uncapitalize<A>}${SnakeCase<Rest>}`
		: `${Uncapitalize<A>}_${SnakeCase<Rest>}`
	: ''
type KeysToSnakeCase<T> = {
	[K in keyof T as SnakeCase<string & K>]: T[K] extends unknown[]
		? { [Key in keyof T[K]]: KeysToSnakeCase<T[K][Key]> }
		: T[K] extends object
			? KeysToSnakeCase<T[K]>
			: T[K]
}
