// `combineReducers` is not currently being used...but it should!
// When you're ready to use it, un-comment the line below!

import { combineReducers } from 'redux'
import student_state from './student_reducer'
import campus_state from './campus_reducer'

export default combineReducers({
  campus_state,
  student_state
});
