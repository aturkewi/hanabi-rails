import { 
  createStore, 
  applyMiddleware, 
  combineReducers 
} from 'redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import auth from '../modules/Auth/reducer';
import games form '../modules/Games/reducer';

const reducers = combineReducers({
  form,
  auth,
  games,
});
const middleware = [thunk];

export default createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware),
)

