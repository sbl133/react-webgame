import React, {useState, useRef} from 'react';

const ResponseHooks =()=>{
    const [state, setState] = useState('waiting');
    const [message, setMassge] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    const timeOut=useRef(null);
    const startTime=useRef();
    const endTime = useRef();

    const onClickScreen=()=>{
        if(state === 'waiting'){
            setState('ready');
            setMassge('초록색이 되면 클릭하세요.');
            timeOut.current=setTimeout(()=>{
                setState('now');
                setMassge('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random()*1000)+1000); //2~3초 랜덤
        }
        else if(state==='ready'){ //성급하게 클릭
            clearTimeout(timeOut.current);
            setState('waiting');
            setMassge('너무 성급하시군요! 초록색이 된 후에 클릭하세요');
        }
        else if(state==='now'){ //반응속도 체크
            endTime.current=new Date();
            setState('waiting');
            setMassge('클릭해서 시작하세요');
            setResult((prevResult)=>{
                return [...prevResult, endTime.current- startTime.current]
            })
        }
    }
    const onReset = ()=>{
        setResult([]);
    }
    const renderAverage = () =>{
        return result.length === 0 ? 
               null : <>
                    <div>평균시간 : {result.reduce((a,c)=>a+c)/result.length}ms</div>
                    <button onClick={onReset}>reset</button>
                    </> 
    }
    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
            </> 
    );
};

export default ResponseHooks;