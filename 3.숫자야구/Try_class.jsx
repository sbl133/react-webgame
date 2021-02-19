import React, {PureComponent} from'react';
class Try extends PureComponent{
    state={
        result: this.props.result,//props바꾸고 싶으면 state로 받아서 바꾼다.
    }
    render(){
        return(
           <li>
               <div>{this.props.tryInfo.try}</div>
               <div>{this.props.tryInfo.result}</div>
           </li>
        );
    }
}

export default Try;