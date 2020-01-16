
//  array of objects

export const markAsDoneOrUndone = (id, bool, list) => {
	const change = (item, index) => parseInt(index) === parseInt(id) ? { value: item.value, done: Boolean(bool) } : item;
	return list.map(change);
}

export const toggleAllDone = (list, bool) => list.map( (item) => { return { value: item.value, done: Boolean(bool) }});

export const clearAllDone = (list) => list.filter( (item) => item.done === false );

export const removeItemFromList = (id, list) => list.filter( (todo, i) => i !== parseInt(id) );
