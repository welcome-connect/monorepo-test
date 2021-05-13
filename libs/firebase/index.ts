import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

import { Users } from './@types/Users'
import { dataPoint } from './utils/dataPoint'

const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = {
	users: dataPoint<Users>('users')
}
const functions = firebase.functions()

export { db, auth, firebase, functions }
