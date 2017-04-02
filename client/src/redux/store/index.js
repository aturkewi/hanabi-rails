import { 
  createStore, 
  applyMiddleware, 
  combineReducers 
} from 'redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import Auth from '../modules/Auth';

const reducers = combineReducers({
  form,
  auth: Auth.reducer,
});
const middleware = [thunk];

export default createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware),
)

