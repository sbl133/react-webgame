const React = require("react");
const {useState, useRef}=React;

const WordRelay_hooks=()=>{
    const [word, setWord]=useState('범');
    const [value, setValue]=useState('');
    const [result, setResult ]=useState('');
    const inputRef = useRef(null);

    const onSubmit=(e)=>{
        e.preventDefault();
        if(word[word.length-1]===value[0]){
            setResult('딩동댕');
            setValue('');
            setWord(value);
            inputRef.current.focus();
        }
        else{
            setResult('땡');
            inputRef.current.focus();
        }
    }
    const onChange=(e)=>setValue(e.target.value);
    return (
        <>
        <div>{word}</div>
        <form onSubmit={onSubmit}>
            <input type="text" ref={inputRef} value={value}
            // value를 쓸거면 onChange도 같이 설정해줘야된다. 안그러면 Defaultvalue쓰셈
                onChange={onChange}/>   
            <button type="submit">입력!</button>
        </form>
        <div>{result}</div>
        </>
    );
    
}
export default WordRelay_hooks;