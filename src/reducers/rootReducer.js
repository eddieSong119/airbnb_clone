import { combineReducers} from 'redux';
import modalReducer from './modalReducer'
import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
})

export default rootReducer;