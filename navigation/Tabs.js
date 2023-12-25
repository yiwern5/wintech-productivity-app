import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import Svg, { Path } from 'react-native-svg'
import Home from "../screens/Home";
import Diary from "../screens/Diary";
import Diet from "../screens/Diet";
import Workout from "../screens/Workout";
import Schedule from "../screens/Schedule";
import Colors from "../constants/Colors";
import icons from "../constants/icons";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityLabel, accessibilityState, children, onPress }) => {

    var isSelected = accessibilityState.selected

    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        top: 0
                    }}
                >
                    <View style={{ flex: 1, backgroundColor: Colors.white }}></View>
                    <Svg
                        width={75}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={Colors.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: Colors.white }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: Colors.primary,
                        
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    backgroundColor: Colors.white
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

// const CustomTabBar = (props) => {
//     if (isIphoneX()) {
//         return (
//             <View>
//                 <View
//                     style={{
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         height: 30,
//                         backgroundColor: Colors.white
//                     }}
//                 ></View>
//                 <BottomTabBar {...props.props} />
//             </View>
//         )
//     } else {
//         return (
//             <BottomTabBar {...props.props} />
//         )
//     }
// }

const CustomTabBar = (props) => {
    return(
    <View>
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 30,
                backgroundColor: Colors.white
            }}
        ></View>
        <BottomTabBar {...props.props} />
    </View>
)}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: "transparent",
                    borderTopColor: "transparent",
                },
            }}
            tabBar={(props) => <CustomTabBar props={props} />}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.home}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? Colors.black : Colors.primary,
                            }}
                        />
                    ),
                    tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />
            
            <Tab.Screen
                name="Schedule"
                component={Schedule}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.schedule}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? Colors.black : Colors.primary,
                            }}
                        />
                    ),
                    tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />

            <Tab.Screen
                name="Diary"
                component={Diary}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.diary}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? Colors.black : Colors.primary,
                            }}
                        />
                    ),
                    tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />

            <Tab.Screen
                name="Diet"
                component={Diet}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.diet}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? Colors.black : Colors.primary,
                            }}
                        />
                    ),
                    tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />

            <Tab.Screen
                name="Workout"
                component={Workout}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.workout}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? Colors.black : Colors.primary,
                            }}
                        />
                    ),
                    tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})

export default Tabs;