import React from 'react';
import './TextInput.css'

class TextInput extends React.Component {
    state = {
        text: "",
        status: 0
    };
    onTextChange = event => {
        this.setState({
            text: event.target.value,
            status: 0
        });
    }
    render() {
        return (
            <div class="form__group">
                <input className='form__field' name="name" onChange={this.onTextChange} value={this.state.text} type='text' id={this.props.id} placeholder={this.props.ph} style={{marginTop: this.props.top, width: this.props.w, color: this.props.color}}></input>
                <label for="name" class="form__label">e-mail</label>
            </div>
        )
    }
};

export default TextInput;
