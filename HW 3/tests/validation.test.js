import test from 'node:test';
import assert from 'node:assert/strict';
import { validateForm, validateCity, validateReview } from '../src/utils/validation.js';
const valid = { name: 'Анна', email: 'anna@example.com', password: 'hello1', confirmPassword: 'hello1', age: '18', agree: true };
test('registration accepts valid data and age boundaries', () => {
  assert.deepEqual(validateForm(valid), {});
  assert.deepEqual(validateForm({ ...valid, age: '120' }), {});
});
test('registration rejects invalid ages, names, passwords and missing consent', () => {
  for (const age of ['', ' ', '17', '121', 'abc', '18.5']) assert.ok(validateForm({ ...valid, age }).age);
  assert.ok(validateForm({ ...valid, name: '12' }).name);
  assert.ok(validateForm({ ...valid, email: 'x@' }).email);
  assert.ok(validateForm({ ...valid, password: 'abcdef' }).password);
  assert.ok(validateForm({ ...valid, confirmPassword: '' }).confirmPassword);
  assert.ok(validateForm({ ...valid, agree: false }).agree);
});
test('city validation changes when country changes', () => {
  assert.equal(validateCity('Россия', ' москва '), '');
  assert.ok(validateCity('Беларусь', 'Москва'));
  assert.equal(validateCity('Беларусь', 'Минск'), '');
});
test('review validates rating range and trimmed text length', () => {
  assert.deepEqual(validateReview({ name: 'Анна', rating: '5', text: 'Отличная работа!' }), {});
  assert.ok(validateReview({ name: 'Анна', rating: '6', text: '          ' }).rating);
  assert.ok(validateReview({ name: 'Анна', rating: '5', text: '          ' }).text);
});
