import axns from "./actions"

const initialState = {
	studentList : [],
	formInput: {}
}

export default function student_reducer (state = initialState, action) {
	
  switch (action.type) {

		case axns.GET_ALL_STUDENT: {
			
			return {...state, formInput: {}, studentList : [...action.data]}
		}

		case axns.FORM_INPUT: {

			if (action.formInput[0] != 'student'){

				return {...state }
			}

			return  {...state, formInput : {...action.formInput[1]} }
		}		
    
		case axns.ADD_STUDENT: {

			return {...state, formInput: {} , studentList: [...state.studentList, action.student]}
		}

    default:
      return state
  }
}
