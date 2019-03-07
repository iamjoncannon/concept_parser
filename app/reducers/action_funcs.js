import axns from "./actions"

const axnFUNC_GET_ALL_CAMPUS = ( data ) => {

	return {
		type: axns.GET_ALL_CAMPUS,
		data
	}
}

const axnFUNC_GET_ALL_STUDENT = ( data ) => {

	return {
		type: axns.GET_ALL_STUDENT,
		data
	}
}

export const axnFORM_INPUT = ( formInput ) => {

	return {
		type: axns.FORM_INPUT,
		formInput
	}
}

const axnFUNC_ADD_STUDENT = ( student ) => {

	return {

		type: axns.ADD_STUDENT,
		student
	}
}

const axnFUNC_ADD_CAMPUS = ( campus ) => {

	return {

		type: axns.ADD_CAMPUS,
		campus
	}
}

export default {

	axnFUNC_GET_ALL_CAMPUS,
	axnFUNC_GET_ALL_STUDENT,
	axnFUNC_ADD_STUDENT,
	axnFUNC_ADD_CAMPUS
}
