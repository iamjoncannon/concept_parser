// import { actions } from "./../store"
import axns from "./actions"

const initialState = {
	campusList : [],
	formInput : {}
}

export default function campus_reducer (state = initialState, action) {
	
	switch (action.type) {

		case axns.GET_ALL_CAMPUS: {
			
			return {...state, formInput: {}, campusList : [...action.data]}

		}

		case axns.FORM_INPUT: {

			if (action.formInput[0] != 'campus'){

				return {...state }
			}

			return  {...state, formInput : {...action.formInput[1]} }
		}		
    
		case axns.ADD_CAMPUS: {

			return {...state, formInput: {} , campusList: [...state.campusList, action.campus]}
		}

		default:
		  return state
	}
}


