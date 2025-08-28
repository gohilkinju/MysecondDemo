import React from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    StyleSheet,
    FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "./images";
import strings from "./strings";
// import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";


const DATA = [
    { id: '1', title: 'Item One' },
    { id: '2', title: 'Item Two' },
    { id: '3', title: 'Item Three' },
    { id: '4', title: 'Item Four' },
];


const dashbordScreen = () => {

    const renderItem = ({ item }) => (
        <View
            style={{
                marginHorizontal:30,alignSelf:'center',marginBottom:10
            }}
        >
            <ImageBackground
                source={require('../assets/productBg.png')}
                style={styles.productList}
            >
                <View style={{padding:12}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',marginTop:8}}>
                    <Image  
                    source={require('../assets/heartSelected.png')}
                    style={{height:20,width:20,}}
                    ></Image></View>
                   <View style={{marginTop:20}}>
                    <Image 
                    source={require('../assets/electricBicycle.png')}
                    style={{height:80,width:"100%",resizeMode:'contain'}}
                    ></Image>
                    <Text style={{ color: "#fff",  fontSize: 16 }}>
                        {"Road Bike"}
                    </Text>
                    <Text style={{ color: "#fff",fontWeight: "bold", }}>{"PEUGEOT - LR01"}</Text>
                    <Text style={{ color: "#fff" }}>{"$1,999.99"}</Text>
                </View>
                </View>
            </ImageBackground>
        </View>

    );


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0A0D2B" }}>
            <ImageBackground
                source={require('../assets/mainBg.png')}
                style={styles.mainBg}
            >
                <StatusBar barStyle="light-content" />
                {/* Top Section */}
                <View style={{ padding: 16 }}>
                    <View
                        style={styles.containerMain}
                    >
                        <Text style={{ fontSize: 22, color: "white", fontWeight: "bold" }}>
                            {strings.ChooseYourBike}
                        </Text>
                        <TouchableOpacity>

                        </TouchableOpacity>
                    </View>
                </View>

                <ImageBackground
                    source={require('../assets/bg_product.png')}
                    style={styles.productBg}
                >

                    <Image source={require('../assets/electricBicycle.png')}
                        style={styles.product} />

                    <View
                        style={{
                            paddingHorizontal: 16,
                        }}
                    >

                        <Text style={{
                            color: "#fff",
                            fontSize: 16,
                            marginHorizontal: 16,
                            fontWeight: "bold",
                        }}>
                            30% Off
                        </Text>
                    </View>
                </ImageBackground>


                <View style={{ 
                    flexDirection: "row", 
                    paddingHorizontal:16,
                    gap: 8,
                    paddingVertical:14
                 }}>
                    
                        <TouchableOpacity
                            style={{
                                padding: 24,
                                backgroundColor: "#2E3B71",
                                borderRadius: 10,
                                minWidth: 50,
                                alignItems: "center",
                                marginTop:14,
                                marginBottom:0
                            }}
                        >
                            <Text style={{ color: "#fff" }}>{"All"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: 20,
                                backgroundColor: "#2E3B71",
                                borderRadius: 10,
                                minWidth: 50,
                                alignItems: "center",
                                marginTop:10,
                                marginBottom:4
                            }}
                        >
                            <Image source={images.electric}
                        style={{height:30,width:30}} />

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: 20,
                                backgroundColor: "#2E3B71",
                                borderRadius: 10,
                                minWidth: 50,
                                alignItems: "center",
                                marginTop:8,
                                marginBottom:7
                            }}
                        >
                            <Image source={images.road}
                        style={{height:30,width:30}} />

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: 20,
                                backgroundColor: "#2E3B71",
                                borderRadius: 10,
                                minWidth: 50,
                                alignItems: "center",
                                marginTop:4,
                                marginBottom:10
                            }}
                        >
                            <Image source={images.mountain}
                        style={{height:30,width:30}} />

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: 20,
                                backgroundColor: "#2E3B71",
                                borderRadius: 10,
                                minWidth: 50,
                                alignItems: "center",
                                marginTop:0,
                                marginBottom:14
                            }}
                        >
                            <Image source={images.union}
                        style={{height:30,width:30}} />

                        </TouchableOpacity>
                </View>


                <View style={{flex:1,marginBottom:70}}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                    />
                </View>

                <View style={styles.bottomNav}>
                    <LinearGradient
                        colors={['#363E51', '#181C24']}
                        style={styles.gradient}
                    >
                        <TouchableOpacity style={styles.selectedButton}>
                            <Image
                                source={require('../assets/bicycle.png')}
                                style={styles.selectedIcon}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image
                                source={require('../assets/map.png')}
                                style={styles.icon}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image
                                source={require('../assets/cart.fill.png')}
                                style={styles.icon}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image
                                source={require('../assets/person.fill.png')}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ImageBackground>
        </SafeAreaView >
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
    },

    gradient: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 5,
    },

    selectedButton: {
        backgroundColor: '#2A72FF',
        padding: 12,
        borderRadius: 30,
    },
    selectedIcon: {
        width: 20,
        height: 20,
        tintColor: '#fff',
        resizeMode: "contain"
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#aaa',
        resizeMode: "contain"
    },
    productBg: {
        width: "98%",
        height: 280,
        resizeMode: "contain"
    },
    productList: {
        width: 150,
        height: 220,
        resizeMode: "contain"

    },
    mainBg: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    product: {
        alignSelf: 'center',
        marginTop: 50,
        resizeMode: "contain"
    },
    containerMain:{
        flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
    }

});
export default dashbordScreen