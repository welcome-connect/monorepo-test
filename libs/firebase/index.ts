import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

import { config } from './config'
import { db } from './db'
import Users from './controllers/Users'
import Teams from './controllers/Teams'

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

const auth = firebase.auth()
const functions = firebase.functions()

export { db, auth, functions, Users, Teams, firebase }
