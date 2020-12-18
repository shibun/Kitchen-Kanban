import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users,createduser } from './users.reducer';
import { alert } from './alert.reducer';
import {items,createditem} from './itemsList.reducer';
import {kitchenCounters} from './kitchenCounter.reducer';

const rootReducer = combineReducers({
  authentication,
  users,createduser,
  alert,
  items,createditem,
  kitchenCounters,
});

export default rootReducer;