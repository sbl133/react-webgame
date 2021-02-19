import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
                //useMemo : 값을기억    useCallback : 함수를 기억
import Ball from './Ball';

function getWinNumbers(){
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i)=>i+1);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length -1];
    const winNumbers = shuffle.slice(0,6).sort((p, c)=> p-c);
    return [...winNumbers, bonusNumber];
}
const Lotto_hooks=()=>{
    const lottoNumbers = useMemo(()=>getWinNumbers(), []);
    const [winNumbers, setWinNumbers]=useState(lottoNumbers);
    const [winBalls, setWinBalls]=useState([]);
    const [bonus, setBonus]=useState(null);
    const [redo, setRedo]=useState(false);
    const timeouts=useRef([]);

    useEffect(()=>{
            for(let i=0; i < winNumbers.length-1; i++){
                timeouts.current[i] = setTimeout(()=>{
                    setWinBalls((prevWinBalls)=>[...prevWinBalls, winNumbers[i]])
                }, (i+1)*1000);
            };
            timeouts.current[6] = setTimeout(()=>{
                setBonus(winNumbers[6]);
                setRedo(true);
            }, 7000);
        return()=>{
            timeouts.current.forEach((v)=>{
                clearTimeout(v);
            });
        };
    }, [timeouts.current]) //두번째인자로 빈배열이 오면 componentDidMount와 동일
            //배열에 요소가 있으면 componentDidMount랑 componenetDidUpdate 둘다 수행
    const onClickRedo =useCallback( () =>{
        //console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current=[];
    }, [winNumbers]); //useCallback안에서 쓰이는 state를 두번째 인자에 넣어줘야 값이 바뀜
          //두번째 인자에 빈배열넣었을때 WinNumbers를 console.log로 찍으면 안바껴 있는데 공은 어떻게 달라질까?
          //자식component에 props로 함수를 넘겨줄때는 useCallback을 반드시 사용
    return(
        <>
        <div>당첨 숫자</div>
        <div id="결과창">
            {winBalls.map((v)=><Ball key={v} number={v}/>)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={onClickRedo}>한 번 더 !</button>}
        </>
    );
}
export default Lotto_hooks;