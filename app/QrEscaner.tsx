import {CameraView} from  'expo-camera';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QrEscaner(){
    return (
        <SafeAreaView style={styleSheet.container}>

            {Platform.OS === "android" ? <StatusBar hidden /> : null}

            <CameraView
                style={styleSheet.camStyle}
                facing="back" //camara de atras
                barcodeScannerSettings={
                    {
                        barcodeTypes: ["qr"], //solo los qr
                    }
                }

                onBarcodeScanned={
                    ({ data }) => {
                        console.log(data); // here you can get your barcode id or url
                    }
                }
            />

        </SafeAreaView>
    );

}

const styleSheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 20
    },
    camStyle: {
        position: 'absolute',
        width: 300,
        height: 300
    }
});
