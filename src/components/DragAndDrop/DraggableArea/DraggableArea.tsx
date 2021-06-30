import React from "react";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";

type Props = {
    droppableColumn: Array<{ props: { btn: { id: string } } }>
}

const DraggableArea: React.FC<Props> = ({droppableColumn}) => {
    return (
        <Droppable droppableId="items" isDropDisabled={true}>
            {(provided) => (
                <div>
                    <div className="DAndD-draggable"  ref={provided.innerRef}>
                        {
                            droppableColumn.map((item, index) => {
                                return (
                                    <Draggable
                                        key={item.props.btn.id}
                                        draggableId={item.props.btn.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <React.Fragment>
                                                <div ref={provided.innerRef}
                                                     {...provided.draggableProps}
                                                     {...provided.dragHandleProps}
                                                >
                                                    <div className="DAndD-items__column" style={{
                                                        border: snapshot.isDragging ?
                                                            "1px dashed #000" : "1px solid #ddd"
                                                    }}>
                                                        <FontAwesomeIcon className="DAndD-items__column__drop ml-1"
                                                                         icon={faBars} size={"lg"}
                                                                         style={{color: snapshot.isDragging ? "#35b8b8" : ""}}/>
                                                        {item}
                                                    </div>
                                                </div>
                                                {snapshot.isDragging && (
                                                    <div className="DAndD-items__column__dragged">
                                                        <div style={{opacity: "0"}}>
                                                            {item}
                                                        </div>
                                                    </div>)
                                                }
                                            </React.Fragment>
                                        )}
                                    </Draggable>)
                            })}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    )
}

export default DraggableArea;