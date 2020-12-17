import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {itemsList} from './itemsList.reducer';
import {kitchenCounters} from './kitchenCounter.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  itemsList,
  kitchenCounters,
});

export default rootReducer;