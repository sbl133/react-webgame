import React, {Component, createRef} from 'react';
import Try from './Try_class'

function getNumbers(){  //숫자 4개를 겹치지않고 랜덤으로 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(var i=0; i<4; i++){
        const chosen = candidate.splice(Math.floor(Math.random()*(9-i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component{
    state={
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };


    onSubmitForm=(e)=>{
        e.preventDefault();
        if(this.state.value===this.state.answer.join('')){
            this.setState({
                result: '홈런!',
                tries: [...this.state.tries, {try: this.state.value, result: '홈런!' }],
            });
            alert('홈런!! 게임을 다시 시작합니다.');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
            this.inputRef.current.focus();
        }
        else{
            const answerArray = this.state.value.split('').map((v)=>parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9){
                this.setState({
                    result: '10번 넘게 틀려서 실패 ! 답은 ' + this.state.answer.join(',') + '였습니다!',
                });
                alert('게임을 다시 시작합니다.');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            }
            else{
                for(let i=0; i<4; i++){
                    if(answerArray[i]===this.state.answer[i]){
                        strike++;
                    }
                    else if(this.state.answer.includes(answerArray[i])){
                        ball++;
                    }
                }
                this.setState({
                    tries:[...this.state.tries, {try:this.state.value, result: strike+'스트라이크'+ball+'볼입니다'}],
                    value:''
                });
            }
            this.inputRef.current.focus();
        }
    }

    onChangeInput=(e)=>{
        this.setState({
            value:e.target.value,
        })
    }
    //onRefInput=(c)=>{this.input=c}
    inputRef=createRef();
    render(){
        const {result, value, tries, answer}=this.state; //this.state생략
        return(
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput}/>
                    <button type="submit">입력!</button>
                </form>
                <div>시도 : {tries.length}</div>
                <ul>
                    {tries.map((v, i)=>{ //화살표함수에 중괄호가 없으면 return이 생략된것
                        return (
                            <Try key={(i+1)+'차 시도 :'} tryInfo={v} />
                        );
                    })}
                </ul>
            </>
        );
    }
}



//export const hello = 'hello'; //import {hello} const 는 여러번가능
//export const bye = 'hello'; //import {hello, bye}

export default NumberBaseball; //import NumberBaseball; default는 파일당? 한번
                                //module.exports랑 비슷(좀 다름)

//노드 모듈 시스템에서
//const React = require('react');
//exports.hello = 'hello';
//module.exports = NumberBaseball;