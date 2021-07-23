import React from "react";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";

import {LessonsTime, Week} from "@config/config";
import IconPlus from "@components/IconPlus/IconPlus";

type Props = {
    Lists: object;
    removeList: (id: number) => void;
    removeItem: (list: string, id: number) => void;
}

const DroppableArea: React.FC<Props> = ({Lists, removeList, removeItem}) => {
    return (
        <div>
            {Object.keys(Lists).map((list) => (
                <Droppable key={list} droppableId={list}>
                    {(provided, snapshot) => (
                        <div className="DAndD-container" ref={provided.innerRef}
                             style={{border: snapshot.isDraggingOver ? "3px dashed #000" : "3px solid #ddd"}}>
                            <div
                                className="DAndD-container__header d-flex flex-row justify-content-between">
                                <span className="DAndD-container__header__text">{Week[list].day}</span>
                                <button type="button"
                                        className="link-button"
                                        onClick={() => {
                                            removeList(parseInt(list))
                                        }}
                                        style={{display: Lists[list].length ? "none" : ""}}
                                >
                                    <IconPlus/>
                                </button>
                            </div>
                            <div className="DAndD__content">
                                {Lists[list].length ? Lists[list].map((item: { id: string }, index: number) => (
                                        <Draggable key={item.id} draggableId={item.id}
                                                   index={index}>
                                            {(provided, snapshot) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps}
                                                     style={
                                                         provided.draggableProps.style
                                                     }>
                                                    <div className="DAndD-item"
                                                         style={{border: snapshot.isDragging ? "1px dashed #000" : "1px solid #ddd"}} {...provided.dragHandleProps}>
                                                        <button type="button"
                                                                className="link-button DAndD-item__close icon-red"
                                                                onClick={() => {
                                                                    removeItem(list, index)
                                                                }}>
                                                            <IconPlus/>
                                                        </button>
                                                        {item}
                                                        <div
                                                            className="DAndD-item__lessons d-flex flex-row align-items-center">
                                                            <FontAwesomeIcon icon={faClock}/>
                                                            <div className="ml-1">{LessonsTime[index]}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>)) :
                                    <div className="text-center">
                                        <span className="text-black-50">Drop items here</span>
                                    </div>
                                }
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            ))}
        </div>
    )
}

export default DroppableArea;