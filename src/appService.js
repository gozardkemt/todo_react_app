
//  array of objects

export const markAsDoneOrUndone = (id, bool, list) => {
	const changeDone = (item, index) => parseInt(index) === parseInt(id) ? { value: item.value, done: bool } : item;
	return list.map(changeDone);
}

export const removeItemFromList = (id, list) => list.filter( (todo, i) => i !== parseInt(id) );
