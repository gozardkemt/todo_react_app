import { toggleOneDone, toggleAllDone, removeOne, removeAllDone } from './appService.js';

describe('toggleOneDone', () => {
	it('mark one done', () =>{
		const id = 0, bool = true, list = [{ value: 'text', done: false }];

		const data = toggleOneDone(id, bool, list);

		expect(data).toEqual([{ value: 'text', done: true }]);
	})
	it('mark one undone', () =>{
		const id = 0, bool = false, list = [{ value: 'text', done: true }];

		const data = toggleOneDone(id, bool, list);

		expect(data).toEqual([{ value: 'text', done: false }]);
	})
	it('mark one undone not second', () =>{
		const id = 0, bool = false, list = [{ value: 'text', done: true },{ value: 'othertext', done: true }];

		const data = toggleOneDone(id, bool, list);

		expect(data).toEqual([{ value: 'text', done: false },{ value: 'othertext', done: true }]);
	})
});

describe('toggleAllDone', () => {
	it('mark all done', () => {
		const bool = true, list = [{value: 'text', done: true},{ value: 'text', done: false}];

		const data = toggleAllDone(list, bool);

		expect(data).toEqual([{value: 'text', done: true},{ value: 'text', done: true}])

	})
	it('mark all undone', () => {
		const bool = false, list = [{value: 'text', done: true},{ value: 'text', done: true}];

		const data = toggleAllDone(list, bool);

		expect(data).toEqual([{value: 'text', done: false},{ value: 'text', done: false}])

	});
})

describe('removeOne', () => {
	it('remove first', () => {
		const id = 0, list = [{value: 'text', done: false},{ value: 'text', done: true}];

		const data = removeOne(id, list);

		expect(data).toEqual([{ value: 'text', done: true}]);
	})
	it('remove second', () => {
		const id = 1, list = [{value: 'text', done: false},{ value: 'text', done: true}];

		const data = removeOne(id, list);

		expect(data).toEqual([{ value: 'text', done: false}]);
	})
})

describe('removeAllDone', () => {
	it('all false', () => {
		const list = [{value: 'text', done: false},{ value: 'text', done: true}];

		const data = removeAllDone(list);

		expect(data).toEqual([{value: 'text', done: false}])

	})
	it('all false', () => {
		const list = [{value: 'text', done: true},{ value: 'text', done: true}];

		const data = removeAllDone(list);

		expect(data).toEqual([])
	})
})
