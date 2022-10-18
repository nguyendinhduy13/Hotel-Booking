import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
export default function TestCalendar() {
    const minDay = new Date().toISOString().split('T')[0]
    const [start, setStart] = useState('')
    const [middle, setMiddle] = useState([])
    const [end, setEnd] = useState('')
    const showMid = () => {
        console.log(middle)
    }
    const aaaaa = [
        '2022-10-3',
        '2022-10-4',
        '2022-10-5',
        '2022-10-6',
    ]
    useEffect(() => {
        if (start != '' && end != '') {
            const bd = start.split('-')
            const kt = end.split('-')
            const arr = []
            if (kt[1] == bd[1]) {
                const sub = (kt[2] - bd[2])
                for (let i = 1; i < sub; i++) {
                    arr.push(`${kt[0]}-${kt[1]}-${kt[2] - i}`)
                }
            }
            else {
                var maxDayOfMonth = new Date(bd[0], bd[1], 0).getDate();
                const sub = (maxDayOfMonth - bd[2])
                for (let i = 1; i <= sub; i++) {
                    var day = (bd[2] - 0) + i
                    arr.push(`${bd[0]}-${bd[1]}-${day}`)
                }
                for (let i = 1; i < kt[2]; i++) {
                    arr.push(`${kt[0]}-${kt[1]}-${i}`)
                }
            }
            setMiddle(arr)
        }
    }, [end])
    const handleTest = (day) => {
        if (start !== "" && end !== "") {
            setStart(day.dateString)
            setEnd('')
            setMiddle([])
        }
        if (start === "") {
            setStart(day.dateString)
        }
        else if (end === "" && day.dateString > start) {
            setEnd(day.dateString)
        }
        else if (day.dateString < start) {
            setStart(day.dateString)
        }
    }
    return (
        <View>
            <TouchableOpacity onPress={() => showMid()}>
                <Text>Test</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 50 }}>
                <Calendar
                    markingType={'period'}
                    markedDates={
                        {
                            [start]: { startingDay: true, color: 'green', textColor: 'white' },
                            [end]: { endingDay: true, color: 'green', textColor: 'white' },
                            ...middle.reduce((acc, cur) => {
                                acc[cur] = { color: 'green', textColor: 'white' }
                                return acc
                            }, {})
                        }
                    }
                    onDayPress={(day) => handleTest(day)}
                    hideExtraDays={true}
                // minDate={minDay}
                />
            </View>
        </View>
    )
}