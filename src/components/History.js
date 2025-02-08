import React from "react";

export default function History({history, jump}) {
    const moveList = [];
    for (let move=0; move< history.length; move++){
        moveList.push(<button key={move} onClick={()=>jump(move)}>go to move #  {move+1} </button>)
    };
    return (<div>
            {moveList}
    </div>
    );
}