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
                    var day = kt[2] - i < 10 ? '0' + (kt[2] - i) : kt[2] - i
                    arr.push(`${kt[0]}-${kt[1]}-${day}`)
                }
            }
            else {
                var maxDayOfMonth = new Date(bd[0], bd[1], 0).getDate();
                const sub = (maxDayOfMonth - bd[2])
                for (let i = 1; i <= sub; i++) {
                    arr.push(`${bd[0]}-${bd[1]}-${(bd[2] - 0) + i}`)
                }
                for (let i = 1; i < kt[2]; i++) {
                    var day = i < 10 ? '0' + i : i
                    arr.push(`${kt[0]}-${kt[1]}-${day}`)
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
                            [start]: { startingDay: true, color: '#50cebb', textColor: 'white' },
                            [end]: { endingDay: true, color: '#50cebb', textColor: 'white' },
                            ...middle.reduce((acc, cur) => {
                                acc[cur] = { startingDay: false, endingDay: false, color: '#70d7c7', textColor: 'white' }
                                return acc
                            }, {}),
                        }
                    }
                    onDayPress={(day) => handleTest(day)}
                    hideExtraDays={true}
                    minDate={minDay}
                />
            </View>
            <View style={{ marginTop: 20, justifyContent: 'space-between', flexDirection: 'row', padding: 10 }}>
                <View style={{ width: 150, height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'orange', fontSize: 15, fontWeight: 'bold' }}>Start: {start}</Text>
                </View>
                <View style={{ width: 150, height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'orange', fontSize: 15, fontWeight: 'bold' }}>Start: {end}</Text>
                </View>
            </View>
        </View>
    )
}