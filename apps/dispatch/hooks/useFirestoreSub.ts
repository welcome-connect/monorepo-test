import { useEffect, useRef, useState } from 'react'
import { firebase } from '@welcome-connect/firebase'
import deepEqual from 'fast-deep-equal/react'

type Query<T> = firebase.firestore.Query<T>
type DocumentData = firebase.firestore.DocumentData

export function useFirebaseSub(query: Query<DocumentData>) {
	const [error, setError] = useState<Error | null>(null)
	const [status, setStatus] = useState('idle')
	const [data, setData] = useState<DocumentData[]>([])

	const cachedQuery = useRef(query)
	useEffect(() => {
		if (!deepEqual(cachedQuery.current, query)) {
			cachedQuery.current = query
		}
	}, [query])

	useEffect(
		function fetchData() {
			setStatus('loading')
			const unsubscribe = query.onSnapshot(
				snapshot => {
					const data: DocumentData[] = []
					snapshot.forEach(doc => data.push(doc.data()))
					setStatus('success')
					setData(data)
				},
				(error: Error) => {
					setError(error)
					setStatus('error')
				}
			)

			return () => unsubscribe()
		},
		[cachedQuery.current]
	)

	return { data, status, error }
}
