import test from 'node:test';
import assert from 'node:assert/strict';
import { tasksReducer, isTasks } from '../src/state/tasks.js';
import { cartReducer, cartTotal } from '../src/state/cart.js';

test('Todo: add, toggle, delete and hydrate without mutating previous state', () => {
  const first = { id: '1', text: 'Первая', done: false };
  const second = { id: '2', text: 'Вторая', done: false };
  const initial = Object.freeze([Object.freeze(first)]);
  const added = tasksReducer(initial, { type: 'ADD', payload: second });
  assert.deepEqual(added, [second, first]);
  const toggled = tasksReducer(added, { type: 'TOGGLE', payload: '2' });
  assert.equal(toggled[0].done, true);
  assert.equal(second.done, false);
  assert.equal(toggled[1], first, 'Unchanged task keeps its reference for React.memo');
  assert.deepEqual(tasksReducer(toggled, { type: 'DELETE', payload: '1' }), [toggled[0]]);
  assert.deepEqual(tasksReducer(initial, { type: 'HYDRATE', payload: [] }), []);
  assert.equal(tasksReducer(initial, { type: 'HYDRATE', payload: {} }), initial);
  assert.throws(() => tasksReducer(initial, { type: 'UNKNOWN' }));
});

test('Saved tasks reject invalid shapes and duplicate IDs', () => {
  assert.equal(isTasks(null), false);
  assert.equal(isTasks({}), false);
  assert.equal(isTasks([null]), false);
  assert.equal(isTasks([{ id: '1', text: 'test', done: 'false' }]), false);
  const task = { id: '1', text: 'test', done: false };
  assert.equal(isTasks([task, task]), false);
  assert.equal(isTasks([task]), true);
});

test('Cart: quantities, totals, decrease to zero, remove and clear', () => {
  const empty = Object.freeze([]);
  const one = cartReducer(empty, { type: 'ADD', id: 'book' });
  Object.freeze(one[0]);
  const two = cartReducer(one, { type: 'ADD', id: 'book' });
  const mixed = cartReducer(two, { type: 'ADD', id: 'notebook' });
  assert.equal(one[0].quantity, 1);
  assert.equal(two[0].quantity, 2);
  assert.equal(cartTotal(mixed), 3450);
  const decreased = cartReducer(mixed, { type: 'DECREASE', id: 'book' });
  assert.equal(cartTotal(decreased), 1950);
  assert.deepEqual(cartReducer(decreased, { type: 'DECREASE', id: 'book' }), [{ id: 'notebook', quantity: 1 }]);
  assert.deepEqual(cartReducer(mixed, { type: 'REMOVE', id: 'book' }), [{ id: 'notebook', quantity: 1 }]);
  assert.deepEqual(cartReducer(mixed, { type: 'CLEAR' }), []);
  assert.equal(cartReducer(mixed, { type: 'ADD', id: 'missing' }), mixed);
  assert.throws(() => cartReducer(mixed, { type: 'UNKNOWN' }));
});
