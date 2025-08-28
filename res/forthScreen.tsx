import { useEffect } from "react";
import { StyleSheet, View } from "react-native"
// import {
//   BluetoothManager,
//   BluetoothEscposPrinter,
// } from 'react-native-bluetooth-escpos-printer';


const forthScreen = () => {

useEffect(() => {
//   BluetoothManager.enableBluetooth().then(
//     devices => {
//       console.log('Available devices:', devices); // List of paired devices
//     },
//     err => {
//       console.log('Bluetooth error:', err);
//     }
//   );
}, []);

const printReceipt = async () => {
  try {
    // await BluetoothManager.connect('XX:XX:XX:XX:XX:XX'); // MAC address
    // await BluetoothEscposPrinter.printText("Hello Thermal Printer\n\r", {
    //   encoding: 'GBK',
    //   codepage: 0,
    //   widthtimes: 2,
    //   heigthtimes: 2,
    //   fonttype: 1,
    // });
  } catch (e) {
    console.log('Print Error:', e);
  }
};

    return(
        <View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    
})
export default forthScreen;