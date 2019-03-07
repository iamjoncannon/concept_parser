import axios from 'axios'
import action_funcs from "./action_funcs"

export const axnTHUNK_GET_ALL_CAMPUS = () => {

	return async (dispatch) => {

		const campusList = await axios.get('/api/campus');
	
		const { axnFUNC_GET_ALL_CAMPUS } = action_funcs

		dispatch(axnFUNC_GET_ALL_CAMPUS(campusList.data))
	}
}

export const axnTHUNK_GET_ALL_STUDENT = () => {

	return async (dispatch) => {

		const studentList = await axios.get('/api/students');
	
		const { axnFUNC_GET_ALL_STUDENT } = action_funcs

		dispatch(axnFUNC_GET_ALL_STUDENT(studentList.data))
	}
}

export const axnTHUNK_ADD_STUDENT = ( studentObject ) => {

	return async (dispatch) => {

		const newStudent = await axios.post('/api/students', studentObject);

		const { axnFUNC_ADD_STUDENT } = action_funcs

		dispatch(axnFUNC_ADD_STUDENT(newStudent.data))
	}
}

export const axnTHUNK_ADD_CAMPUS = ( campusObject ) => {

	return async (dispatch) => {

		const newCampus = await axios.post('/api/campus', campusObject);

		const { axnFUNC_ADD_CAMPUS } = action_funcs

		dispatch(axnFUNC_ADD_CAMPUS(newCampus.data))
	}
}

export const axnTHUNK_DELETE_CAMPUS = ( id ) => {

	return async (dispatch) => {

		const newCampus = await axios.delete(`/api/campus/${id}`);

		dispatch(axnTHUNK_GET_ALL_CAMPUS())
	}
}

export const axnTHUNK_DELETE_STUDENT = ( id ) => {

	return async (dispatch) => {

		const newCampus = await axios.delete(`/api/student/${id}`);

		dispatch(axnTHUNK_GET_ALL_STUDENT())
	}
}

export const axnTHUNK_UPDATE_CAMPUS = ( id, campusInfo ) => {

	return async (dispatch) => {

		const newCampus = await axios.put(`/api/campus/${id}`, campusInfo);

		dispatch(axnTHUNK_GET_ALL_CAMPUS())
	}
}

export const axnTHUNK_UPDATE_STUDENT = ( id, studentInfo ) => {

	return async (dispatch) => {

		const newStudent = await axios.put(`/api/student/${id}`, studentInfo);
		
		dispatch(axnTHUNK_GET_ALL_STUDENT())
	}
}
