import React, { useState } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { getScheduleData } from '../services/DataService';
import { ScheduleData } from '../models/ScheduleData';
import * as Animatable from 'react-native-animatable';

import { Text, View } from '../components/Themed';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { TouchableOpacity } from '@gorhom/bottom-sheet';

interface DayInfo {
    day: number
}

const DayScreen : React.FC<DayInfo> = (dayInfo: DayInfo) => {
    const [activeSections, setActiveSections] = useState<number[] | string[]>([]);
    const [hideOverview, setHideOverview] = useState(false);
    const dayEvents : ScheduleData[] = getScheduleData()
        .filter((event) => event.startTime.getDate() == dayInfo.day);

    const renderScheduleTime = (scheduleData : ScheduleData) : string => {
        var startHours = `${scheduleData.startTime.getHours()}`.padStart(2, '0');
        var startMinutes = `${scheduleData.startTime.getMinutes()}`.padStart(2, '0');
        var startTime = `${startHours}u${startMinutes}`;
        if (scheduleData.endTime) {
            var endHours = `${scheduleData.endTime.getHours()}`.padStart(2, '0');
            var endMinutes = `${scheduleData.endTime.getMinutes()}`.padStart(2, '0');
            return `${startTime} tot ${endHours}u${endMinutes}`;
        } else {
            return startTime;
        }
    };

    const renderHeader = (content : ScheduleData, _, isActive : boolean) => {
        return (
            <Animatable.View
                duration={400}
                //style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <Text /*style={styles.headerText}*/>
                    {renderScheduleTime(content)} - {content.location}{"\n"}
                    {content.name}
                </Text>
            </Animatable.View>
        );
    };

    const renderContent = (content: ScheduleData, _, isActive : boolean) => {
        return (
            <Animatable.View
                duration={400}
                // style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
                    {content.description}
                </Animatable.Text>
            </Animatable.View>
        );
    }

    return (
        <View>
            <ScrollView contentContainerStyle={{
                paddingTop: 30 }}>
                <TouchableOpacity
                    onPress={() => setHideOverview(!hideOverview)}>
                    <Text>ALGEMENE OPENINGSUREN</Text>
                </TouchableOpacity>
                <Collapsible collapsed={hideOverview}>
                    <View style={styles.container}>
                        <Text>
                            Infopunt: 20u00 tot 02u30{"\n"}
                            Hoofdbar: 21u00 tot 02u00{"\n"}
                            Rustige bar: 23u00 tot 02u30{"\n"}
                            Bar fuiftent: 22u30 tot 03u00{"\n"}
                            FOS-Shop: 20u00 tot 22u00
                        </Text>
                    </View>
                </Collapsible>
                <Accordion
                    sections={dayEvents}
                    renderHeader={renderHeader}
                    // renderSectionTitle={renderHeader}
                    renderContent={renderContent}
                    activeSections={activeSections}
                    onChange={setActiveSections}
                />
            </ScrollView>
        </View>
    )
};

export default DayScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});