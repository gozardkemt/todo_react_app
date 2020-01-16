import React from 'react';
import {markAsDoneOrUndone, removeItemFromList, toggleAllDone, clearAllDone} from './appService.js';
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
		this.arrow = React.createRef()
	}

	setCurrentValue = (e) => {
		this.setState({
			currentvalue: e.currentTarget.value
		})
	}

	setFilter = e => {
		this.setState({ filter: e.currentTarget.id })
	}

	addItemToList = (e) => {

		if (e.keyCode !== 13) { return }

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

	clearAllDone = () => {

		this.setState({
			todos: clearAllDone(this.state.todos)
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

		this.bool = e.target.id === 'true' ? true : false;
		this.arrow.current.id = String(!this.bool);

		this.setState({
			todos: toggleAllDone( this.state.todos, this.bool)
		})

	}

	render() {
		const { todos, filter, currentvalue} = this.state;

		return (
			<div className="app" onKeyUp={this.addItemToList} >
			    < Title/>
				< Input
					onChange={this.setCurrentValue}
					onClick={this.toggleAllDone}
					value={currentvalue}
					arrow={this.arrow}
					/>
				< List
					todos={todos}
					clear={this.clearItemFromList}
					onChange={this.markAsDone}
					filter={filter}
					/>
				< BottomBar
					onClick={this.setFilter}
					clearAllDone={this.clearAllDone}
					todos={todos}
						 />
			</div>
		  )
	}
}

const Title = () => { return <h1 className="title" >todos</h1> }

class Input extends React.Component {

	render() {

		return (
			<div className="inputWrapper">
			    <label className="arrow" onClick={this.props.onClick} ref={this.props.arrow} id="true"></label>
			    <input autoFocus className="input" onChange={this.props.onChange} value={this.props.value} placeholder="things to do"/>
			</div>
			)
	}
}

const List = ({ filter, clear, onChange, todos}) => {

	if (todos.length < 1) { return null };

	if (filter === 'active') { todos = clearAllDone(todos) }
	if (filter === 'completed') { todos = todos.filter( (todo) => todo.done === true ) }

	return todos.map( (item, i) => < ListItem todo={item} key={i} i={i} clear={clear} onChange={onChange} /> )

}

class ListItem extends React.Component {

	render() {

		const { todo, clear, onChange, i} = this.props;
		const todoStyle = todo.done ? { color: 'lightgray', textDecoration: 'line-through gray' } : {};

		return (
			<div className="listItemWrapper">
				<input style={{cursor: 'pointer'}} type='checkbox' className="checkbox" onChange={onChange} checked={todo.done}/>
				<input style={todoStyle} className="inputInList" value={todo.value} readOnly={true} />
				<b className="x" id={i} onClick={clear}>x</b>
			</div>
		)
	}
}

const BottomBar = ({ onClick, todos, clearAllDone:clearClick}) => {

	if ( todos.length === 0 ) { return null }

	const bottomLinks = ['all', 'active', 'completed'];
	const activeTodos = clearAllDone(todos);

	return (
		<div className="bottomBar">
			<small style={{paddingLeft: '0.5rem'}}>{activeTodos.length} left</small>
			{ bottomLinks.map( (name) => <BottomLink name={name} key={name} onClick={onClick} />) }
			< BottomClear onClick={clearClick} todos={todos}/>
		</div>
	)
}

const BottomLink = ({name, onClick}) => <small className="bottomLink" id={name} onClick={onClick}>{name}</small>

const BottomClear = ({ onClick, todos }) => {

	if (todos.some( (item) => item.done === true )) {
		return <small className="bottomLink" id="clear" onClick={onClick}>clear</small>
	}
	return null
}
