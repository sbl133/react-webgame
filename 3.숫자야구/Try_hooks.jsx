import React, {memo, useState} from'react';
const Try = memo(({tryInfo})=>{
    const [result, setResult] = useState(tryInfo.result);
    const onClick = ()=>{   //props를 바꾸고 싶으면 state로 받아서 바꾼다.
        setResult('1');
    };
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onClick}>{tryInfo.result}</div>
        </li>
    )
});

export default Try;