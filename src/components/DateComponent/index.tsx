import React, { useState, useEffect } from "react";
import { Platform, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

type AndroidMode = 'date' | 'time';
type IDateComponent = {
    value: string;
    onChangeDate: Function
};

const DateComponent = ({ value, onChangeDate }: IDateComponent) => {
    const [date, setDate] = useState<Date>(new Date(1598051730000));
    const [mode, setMode] = useState<AndroidMode>('date');
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        onChangeDate(date.toLocaleDateString());
    }, [date])

    const onChange = (e, selectedDate: Date) => {
        const currentDate: Date = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode: AndroidMode) => {
        if (Platform.OS === 'android') {
            setShow(false);
            // for iOS, add a button that closes the picker
            DateTimePickerAndroid.open({
                value: date,
                onChange,
                mode: currentMode,
                is24Hour: true,
            });
        }
        setMode(currentMode);
        setShow(true)

    };

    return (
        <View>
            {Platform.OS !== 'android' ? (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            ) :
                <TouchableOpacity style={styles.container} onPress={() => showMode('date')}>
                    <Text>{value}</Text>
                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderColor: '#000000',
        borderWidth: 2,
        backgroundColor: '#ffffff'
    },
});

export default DateComponent;