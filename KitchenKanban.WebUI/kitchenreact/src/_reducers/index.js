import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {items,createditem} from './itemsList.reducer';
import {kitchenCounters} from './kitchenCounter.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  items,createditem,
  kitchenCounters,
});

export default rootReducer;