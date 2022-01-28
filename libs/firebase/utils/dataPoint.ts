import firebase from 'firebase/app'
import { QueryDocumentSnapshot } from '@firebase/firestore-types'
import { config } from '../config'

const converter = <T>() => ({
	toFirestore: (data: T) => data,
	fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T
})

export const dataPoint = <T>(collectionPath: string) => {
	if (!firebase.apps.length) {
		firebase.initializeApp(config)
	}
	return firebase.firestore().collection(collectionPath).withConverter(converter<T>())
}
