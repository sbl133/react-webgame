import React, {Component} from 'react';

class WordRelay_class extends Component{
    constructor(props){
        super(props);
        this.state={
            word: '범',
            value: '',
            result: '',
        };
    }
    onSubmit=(e)=>{
        e.preventDefault();
        if(this.state.word[this.state.word.length-1]===this.state.value[0]){
            this.setState({
                result: '딩동댕',
                word: this.state.value,
                value: '',
            })
            this.input.focus();
        }
        else{
            this.setState({
                result:'땡',
                value: '',
            })
            this.input.focus();
        }
    }
    onChange=(e)=>this.setState({value:e.target.value});
    onRefinput=(c)=>{this.input=c};
    input;
    render() {
        return (
            <>
            <div>{this.state.word}</div>
            <form onSubmit={this.onSubmit}>
                <input type="text" ref={this.onRefinput} value={this.state.value}
                // value를 쓸거면 onChange도 같이 설정해줘야된다. 안그러면 Defaultvalue쓰셈
                 onChange={this.onChange}/>   
                <button type="submit">입력!</button>
            </form>
            <div>{this.state.result}</div>
            </>
        );
    }
}

export default WordRelay_class