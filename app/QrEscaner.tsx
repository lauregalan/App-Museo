import {CameraView} from  'expo-camera';
import { router } from 'expo-router';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QrEscaner(){
    
    interface Fossil {
    _id: string;
    name: string;
    // ... puedes agregar más campos si quieres, pero con _id basta para que compile
    }

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
                    async ({ data }) => {
                        //console.log(data); // en data voy a obtener el id de un fosil en especifico
                        const ans = await fetch("http://192.168.0.101:3001/fossils/" + data );
                        const fosiles = await ans.json()
                        //console.log(fosiles)

                        router.push({ 
                            pathname: "/fossildetails", 
                            params: { fossil: JSON.stringify(fosiles) } 
                        })
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
