const React = require('react');
const {Component}=React;

class Gugudan extends Component{
    constructor(props){
     super(props)
      this.state={
        first:Math.ceil(Math.random()*9),
        second:Math.ceil(Math.random()*9),
        value: '',
        result: '',
        prefirst:'',
        presecond:'',
      };
    }
    onSubmit= (e) =>{
        e.preventDefault();
        //parseInt : 문자열을 숫자로 바꾸기 위해 사용
        if(parseInt(this.state.value)===this.state.first*this.state.second){
            this.setState((prevState)=>{
                return{
                result:prevState.value + "정답",
                first:Math.ceil(Math.random()*9),
                second:Math.ceil(Math.random()*9),
                value:" ",
                }
            });
            this.input.focus();
        }
        else{
            this.setState({
                result:"땡",
                value:" ",
            });
            this.input.focus();
        }
    };
    onChange=(e)=>{
        this.setState({
            value:e.target.value
        })
    }
    input;
    onRefInput = (c)=>{this.input=c}
    //state가 바뀔때마다 render가 실행되기 때문에 method들을 밖에서 선언한다.
    render(){
        return(
            <React.Fragment>
                <div>{this.state.first}곱하기{this.state.second}는?</div>
                <form onSubmit={this.onSubmit}>
                    <input ref={this.onRefInput}type="number" value={this.state.value} 
                    onChange={this.onChange}/>
                    <button type="submit">입력</button>
                </form>
                <div>
                    {this.state.resultvalue}
                    {this.state.result}</div>
            </React.Fragment>
        );
    }
 }
 module.exports = Gugudan;