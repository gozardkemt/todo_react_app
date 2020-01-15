import React from 'react';
import {markAsDoneOrUndone, removeItemFromList, toggleAllDone} from './appService.js';
import './App.css';

const defaultState = {
		filter: 'all',
		currentvalue: '',
		todos: []
}

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = defaultState;

		document.addEventListener('keydown', (e) => {
			if (e.keyCode === 13) { this.addItemToList() }
		})
	}

	setCurrentValue = (e) => {
		this.setState({
			currentvalue: e.currentTarget.value
		})
	}

	setFilter = e => {
		this.setState({ filter: e.currentTarget.id })
	}

	addItemToList = () => {

		const newValue = this.state.currentvalue;
		if (!newValue) { return };

		const newItem = { value: newValue, done: false };

		this.setState({
			todos: [ ...this.state.todos, newItem ],
			currentvalue: ''
		})
	}

	clearItemFromList = (e) => {

		this.setState({
			todos: removeItemFromList(e.target.id, this.state.todos)
		})

	}

	markAsDone = e => {

		const id = e.currentTarget.nextSibling.nextSibling.id;
		const newDone = !this.state.todos[id].done;

		this.setState({
			todos: markAsDoneOrUndone(id, newDone, this.state.todos)
		})

	}

	toggleAllDone = e => {

		const bool = e.target.id === 'true' ? true : false;
		document.getElementsByClassName('arrow')[0].id = String(!bool);

		this.setState({
			todos: toggleAllDone( this.state.todos, bool)
		})

	}


	markAllasDone

	render() {
		const { todos, filter, currentvalue} = this.state;
		const left = todos.filter( (todo) => todo.done === false );

		return (
			<div className="app">
			    < Title/>
				< Input
					onChange={this.setCurrentValue}
					onClick={this.toggleAllDone}
					value={currentvalue}
					/>
				< List
					todos={todos}
					clear={this.clearItemFromList}
					onChange={this.markAsDone}
					filter={filter}
					/>
				< BottomBar
					left={left.length}
					count={todos.length}
					onClick={this.setFilter}
						 />
			</div>
		  )
	}
}

const Title = () => { return <h1 className="title" >todos</h1> }

const Input = (props) => {

	return (
		<div className="inputWrapper">
		    <label className="arrow" onClick={props.onClick} id="true"></label>
		    <input className="input" onChange={props.onChange} value={props.value} placeholder="things to do"/>
		</div>
		)
}

const List = (props) => {

	let { filter, clear, onChange, todos:items} = props;
	if (items.length < 1) { return null };

	if (filter === 'active') { items = items.filter( (todo) => todo.done === false ) }
	if (filter === 'completed') { items = items.filter( (todo) => todo.done === true ) }

	return items.map( (item, i) => < ListItem todo={item} key={i} i={i} clear={clear} onChange={onChange} /> )

}

class ListItem extends React.Component {

	render() {

		const { todo, clear, onChange, i} = this.props;
		const textStyle = todo.done ? { color: 'lightgray', textDecoration: 'line-through gray' } : {};

		return (
			<div className="listItemWrapper">
				<input style={{cursor: 'pointer'}} type="radio" className="radio" onClick={onChange} checked={todo.done}/>
				<div className="listItem"><span contenteditable="true" style={textStyle} className="itemText">{todo.value}</span></div>
				<b className="x" id={i} onClick={clear}>x</b>
			</div>
		)
	}
}

const BottomBar = ({left, count, onClick}) => {

	if ( count === 0 ) { return null }
	const bottomLinks = ['all', 'active', 'completed']

	return (
		<div className="bottomBar">
			<small style={{paddingLeft: '0.5rem'}}>{left} items left</small>
			{ bottomLinks.map( (name) => <BottomLink name={name} key={name} onClick={onClick} />) }
		</div>
	)
}

const BottomLink = ({name, onClick}) => <small className="bottomLink" id={name} onClick={onClick}>{name}</small>
