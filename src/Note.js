import React, {Component} from 'react'
import {FaPencilAlt, FaTrash, FaSave} from 'react-icons/fa'


class Note extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }

        this.editBtn = this.editBtn.bind(this)
        this.removeBtn = this.removeBtn.bind(this)
        this.saveBtn = this.saveBtn.bind(this)
        this.renderEditForm = this.renderEditForm.bind(this)
        this.renderDisplayEachNote = this.renderDisplayEachNote.bind(this)
        this.randomBetween = this.randomBetween.bind(this)

    }

    componentWillMount() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight - 150, 'px'),
            transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
        }
    }

    randomBetween(x, y, s) {
        return x + Math.ceil(Math.random() * (y - x)) + s
    }

    componentDidUpdate() {
        var textArea
        if (this.state.editing) {
            textArea = this._newText
            textArea.focus()
            textArea.select()
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.children !== nextProps.children || this.state !== nextState
        )
    }

    editBtn() {
        this.setState({
            editing: true
        })
    }

    removeBtn() {
        this.props.onRemove(this.props.index)
    }

    saveBtn(e) {
        e.preventDefault()
        console.log('saveBtn 1')
        this.props.onChange(this._newText.value, this.props.index)
        console.log('saveBtn 2')

        this.setState({
            editing: false
        })
    }

    renderEditForm() {
        return (

            <div className="note" style={this.style}>
                <form onSubmit={this.saveBtn}>
					<textarea ref={input => this._newText = input}
                              defaultValue={this.props.children}/>
                    <button id="save"><FaSave/></button>
                </form>
            </div>
        )
    }

    renderDisplayEachNote() {
        return (
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
					<button onClick={this.editBtn} id="edit"><FaPencilAlt/></button>
					<button onClick={this.removeBtn} id="remove"><FaTrash/></button>
				</span>
            </div>
        )
    }

    render() {
        if (this.state.editing) {
            return this.renderEditForm()
        } else {
            return this.renderDisplayEachNote()
        }
    }
}

export default Note
