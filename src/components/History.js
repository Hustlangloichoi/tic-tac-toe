import React from "react";

export default function History({history, jump}) {
    const moveList = [];
    for (let move=0; move< history.length; move++){
        moveList.push(<button key={move} onClick={()=>jump(move)}>go to move #  {move} </button>)
    };
    return (<div className="historymove"> History
            {moveList}
    </div>
    );
}