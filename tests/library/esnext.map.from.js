import { createIterable } from '../helpers/helpers';

QUnit.test('Map.from', function (assert) {
  var Map = core.Map;
  var from = Map.from;
  assert.isFunction(from);
  assert.arity(from, 1);
  assert.ok(Map.from() instanceof Map);
  assert.deepEqual(core.Array.from(Map.from([])), []);
  assert.deepEqual(core.Array.from(Map.from([[1, 2]])), [[1, 2]]);
  assert.deepEqual(core.Array.from(Map.from([[1, 2], [2, 3], [1, 4]])), [[1, 4], [2, 3]]);
  assert.deepEqual(core.Array.from(Map.from(createIterable([[1, 2], [2, 3], [1, 4]]))), [[1, 4], [2, 3]]);
  var pair = [1, 2];
  var context = {};
  Map.from([pair], function (element, index) {
    assert.same(element, pair);
    assert.same(index, 0);
    assert.same(this, context);
    return element;
  }, context);
  assert.throws(function () {
    from([1, 2]);
  });
  var arg = null;
  function F(it) {
    return arg = it;
  }
  from.call(F, createIterable([1, 2, 3]), function (it) {
    return it ** 2;
  });
  assert.deepEqual(arg, [1, 4, 9]);
});
