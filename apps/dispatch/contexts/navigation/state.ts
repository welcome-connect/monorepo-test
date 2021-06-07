export enum NavActionTypes {
	ToggleNavExpand = 'TOGGLE_NAV_EXPAND'
}

export type NavigationState = {
	isNavExpanded: boolean
}

export const initialState = {
	isNavExpanded: false
}

export type NavigationActions = { type: 'TOGGLE_NAV_EXPAND' }

export const navigationReducer = (state: NavigationState, action: NavigationActions) => {
	switch (action.type) {
		case NavActionTypes.ToggleNavExpand:
			return { ...state, isNavExpanded: !state.isNavExpanded }
		default:
			return { ...state }
	}
}
