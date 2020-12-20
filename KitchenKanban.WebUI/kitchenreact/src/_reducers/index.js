import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users,createduser } from './users.reducer';
import { alert } from './alert.reducer';
import {items,createditem} from './itemsList.reducer';
import {kitchenCounters} from './kitchenCounter.reducer';
import {orders,getorder} from './order.reducer';

const rootReducer = combineReducers({
  authentication,
  users,createduser,
  alert,
  items,createditem,
  kitchenCounters,getorder,
  orders
});

export default rootReducer;