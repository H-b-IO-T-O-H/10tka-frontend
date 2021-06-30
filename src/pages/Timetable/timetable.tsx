import React from "react";

import DragAndDrop from "@components/DragAndDrop";
import "./timetable.scss"



const Timetable = () => {
    return (
       <div>
           <DragAndDrop/>
       </div>
    )

}

export default React.memo(Timetable);
