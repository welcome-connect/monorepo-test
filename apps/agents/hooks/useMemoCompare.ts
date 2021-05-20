import { useEffect, useRef } from 'react'

type Next<T> = T | undefined
type Compare<T> = (a: T | undefined, b: T | undefined) => boolean

export function useMemoCompare<T>(next: Next<T>, compare: Compare<T>): T | undefined {
	const previousRef = useRef<T>()

	const previous = previousRef.current
	const isEqual = compare(previous, next)

	useEffect(() => {
		if (!isEqual) {
			previousRef.current = next
		}
	})

	return isEqual ? previous : next
}
