import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import QrIndicator from "../components/Profile/QrIndicator";
import { View } from "../components/Themed";
import { Ticket } from "../models/Ticket";
// TODO: add a cancel button
// TODO: add a way to turn the flash of the phone on or off
const ScanScreen = () => {

    const navigation = useNavigation();
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [ticketData, setTicketData] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        // TODO: move this to a routed screen that gets the ticket from the api and stores it. That way we can enable deep linking from an url as well.
        if (ticketData) {
            fetch(
                `https://ticketing.fos.be/api/ticket?hash=${ticketData}`,
                {
                    method: 'GET'
                })
                .then(res => res.json()).then(async data => await storeTicket(data).then(res => navigation.navigate('ProfileScreen')))
        }

    }, [ticketData])

    const storeTicket = async (data: any) => {
        try {
            const ticket: Ticket = {
                firstName: data.data.firstName,
                lastName: data.data.lastName,
                ticketType: data.data.submissionData.data.formValues.type_deelnemer_keuze,
                workshopBeforeNoon: data.data.submissionData.data.formValues.workshops_voormiddag,
                workshopAfterNoon: data.data.submissionData.data.formValues.workshops_namiddag,
                activityBeforeNoon: data.data.submissionData.data.formValues.activiteit_namiddag,
                activityAfterNoon: data.data.submissionData.data.formValues.activiteit_voormiddag,
            }
            await AsyncStorage.setItem('sd_ticket', JSON.stringify(ticket))
        }
        catch (e) {
            console.error(e);
        }
    }

    const handleBarCodeScanned = ({ type, data }: any): void => {
        setScanned(true);
        setTicketData(data);
    };

    // TODO: provide a way to reenable giving of permission. Maybe also do this check before we navigate to the scan screen.
    if (!hasCameraPermission) {
        return (
            <View style={styles.container}>
                <Text>Je gaf geen toestemming om je camera te gebruiken.</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Camera
                barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr], // Only allow scanning of QR codes, this causes less battery usage and false positives
                }}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // Prevents repeated scanning of the same code
                style={StyleSheet.absoluteFillObject}
            />
            <QrIndicator />
        </View>
    )
};

export default ScanScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
