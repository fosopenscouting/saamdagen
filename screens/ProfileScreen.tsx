import React from 'react';
import { Text, View } from '../components/Themed';
import { StyleSheet, Button } from 'react-native';
import NoProfile from '../components/Profile/NoProfile';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ticket } from '../models/Ticket';


const ProfileScreen = () => {

    const [ticketData, setTicketData] = useState<Ticket | null>();
    const navigation = useNavigation();


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTicket();
        });

        return unsubscribe;
    }, []);

    const getTicket = async () => {
        const ticket = await AsyncStorage.getItem('sd_ticket');

        if (ticket) {
            console.log(ticket)
            setTicketData(JSON.parse(ticket));
        }
        console.log('no ticket')
    }

    const deleteTicket = async () => {
        await AsyncStorage.removeItem('sd_ticket');
        setTicketData(null);
    }

    return (
        <View style={styles.container}>
            {ticketData ?
                (<>
                    <Text numberOfLines={10}>Naam: {`${ticketData.firstName} ${ticketData.lastName}`}</Text>
                    <Button title="Ticket wissen" onPress={deleteTicket} />
                </>) :
                <NoProfile />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
