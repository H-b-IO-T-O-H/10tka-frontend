import React, {useEffect, useState} from "react";

import Card from "@components/Card";
import Lesson from "@components/Lesson";
import ButtonsLogo from "@components/ButtonsLogo";

import "./Home.scss"
import {makeGet} from "@utils/network";
import {Urls} from "@config/urls";
import {Labels} from "@components/DragAndDrop/config";
import {LessonsTime} from "@config/config";
import PostsList from "../PostsList";

const getWeekData = (): [number, string[], string] => {
    const date = new Date();
    const today = date.getDate();
    const weekDay = (date.getDay() + 6) % 7;
    const weekAgo = today - weekDay;

    const monthIdx = date.getMonth();
    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const months = ["января", "февраля", "март", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    const weekType = Math.floor(weekAgo / 7) % 2 === 0 ? "Зн" : "Чс"
    return [weekDay, days.map((day, index) => (`${day}, ${weekAgo + index} ${months[monthIdx]}`)), weekType]
}

type LessonType = {
    lesson_id: string;
    title: string;
    lesson_type: string;
    auditorium: string;
}

const prepareLessons = (lessons: Array<LessonType>) => {
    return lessons.map((lesson, index) => (
        <Lesson title={lesson.title} auditorium={lesson.auditorium} time={LessonsTime[index]}
                isEmpty={lesson.lesson_type === "free"}>
            <ButtonsLogo xs idx={Labels[lesson.lesson_type]}/>
        </Lesson>
    ))
};

const prepareWeek = (weekDays: Array<{ day_id: string, day_order: number, lessons: Array<LessonType> }>) => {
    const newList: Array<Array<React.ReactNode>> = [];

    weekDays.forEach((day, index) => {
        if (day.lessons) {
            newList[index] = prepareLessons(day.lessons)
        } else {
            newList[index] = []
        }
    })
    return newList
}

export const getWeekType = (week_type: string) => {
    return week_type === "Чс" ? 1 : 2
}

const Home = () => {
    const [weekInfo, changeWeekInfo] = useState<{ weekDay: number, days: string[] }>({weekDay: 0, days: []})
    const [orgInfo, changeOrgInfo] = useState({group: "", week_number: 0, week_type: "Чс"})
    const [lessons, changeLessons] = useState<Array<Array<React.ReactNode>>>([])

    useEffect(() => {

        const [weekDay, weekData, weekType] = getWeekData();

        changeWeekInfo({weekDay: weekDay, days: weekData});
        const userGroup = localStorage.getItem("user_group");
        if (userGroup) {
            makeGet(Urls.timetable.get(userGroup, getWeekType(weekType))).then((response) => {
                console.log("Ответ сервера успешно получен!");
                const week = response.data.week;
                const savedWeek = prepareWeek(week.days);
                changeLessons(savedWeek);
                changeOrgInfo({group: week.group, week_type: weekType, week_number: week.week_number});

            }).catch((error) => {
                console.log(error);
                return;
            });
        }

    }, [])

    return (
        <div>
            <div className="container d-flex flex-row justify-content-center align-items-center">
                {orgInfo.group !== "" ?
                    <div
                         className="timetable__title">{`Информация о группе ${orgInfo.group}, ${orgInfo.week_type}`}</div> :
                    <div className="timetable__title">Вы не прикреплены ни к одной из учебных групп</div>
                }
            </div>
            {orgInfo.group !== "" ?
                <div className="Home d-flex flex-row flex-nowrap">
                    {weekInfo.days.map((date, index) => (
                        <Card id={index} key={index} currentDay={weekInfo.weekDay} title={date} items={lessons[index]}/>
                    ))}
                </div> : null
            }
            <PostsList/>
        </div>
    )
}

export default React.memo(Home);