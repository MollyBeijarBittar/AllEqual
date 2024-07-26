import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Platform, StatusBar} from 'react-native';
import { styles } from '../constants/GlobalStyling.js';
/*  RFPercentage stands for Responsive Font Percentage.
It is used to set styles based on a percentage of the screen height.
For example, if you want a component to take up 50% of the screen height, you can use RFPercentage(50) 

RFValue stands for Responsive Font Value.
It is used to set styles based on a reference screen width.
This is useful for creating responsive designs that look consistent across different screen sizes.
For example, if you want to set the font size to 16 on a reference screen width, you can use RFValue(16)
*/ 
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'; 
import { aboutUsTexts } from '../constants/TextParagraphs.js';

const AllEqualImage = require("../assets/Grafisk-profil/Allequal_profilkit_230315/Allequal-logo/Logo/PNG/AllEqual-GREEN.png");
const rightImage = require("../assets/Grafisk-profil/Allequal_profilkit_230315/Allequal_grafik/PNG/Form-4/Artboard-28-copy-411.png");
const leftImage = require("../assets/Grafisk-profil/Allequal_profilkit_230315/Allequal_grafik/PNG/Form-2/7.png");

export default function About({ navigation }) {
  const [showMore, setShowMore] = useState(false);
  const handleLinkPress = () => {
    const url= "http://allequal.se";
    Linking.openURL(url);
  };
  return (
    <SafeAreaView style={[styleSheet.container, styles.background]}>
      <Image source={AllEqualImage} style={styleSheet.AllEqual_logo} />

        <View  style={styleSheet.textView }> 
         <Text style={[styles.plainText, styleSheet.textStyle]}>
           {aboutUsTexts[0]} {aboutUsTexts[1]}{" "}
         <TouchableOpacity onPress={handleLinkPress}>
         <Text style={[styles.plainText, styleSheet.allEqual_website]}>{aboutUsTexts[2]}</Text>
         </TouchableOpacity>{" "}
           {aboutUsTexts[3]}
         </Text>
        </View>

         <View style={styleSheet.leftImageContainer}>
         <Image source={leftImage} style={[styleSheet.leftImage, { transform: [{ rotate: '320deg' }] }]} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Start")}>
          <Text style={[styles.titleText, styleSheet.start_page_text]}>Start Page</Text> 
        </TouchableOpacity>

        <View style={styleSheet.rightImageContainer}>
         <Image source={rightImage} style={styleSheet.rightImage} />
        </View>
    </SafeAreaView>
  );
}
// Styles for the components
const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  AllEqual_logo: {
    width: RFPercentage(40), 
    height: RFPercentage(10), 
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight * 3 : 0
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:0.6
  },
  leftImageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1
  },
  leftImage: {
    height: RFValue(300), // Responsive height
    width: RFValue(300), // Responsive width
    marginVertical: '55%',
    marginRight: '50%'
  },
  rightImageContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1
  },
  rightImage: {
    height: RFValue(190), 
    width: RFValue(235), 
    marginLeft: '100%',
    marginVertical: '30%'
  },
  
  allEqual_website: {
    color: '#00563B',
    textDecorationLine: 'underline'
  },
  textStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RFValue(20), 
    marginVertical: RFValue(4) 
  },
  read_more_button: {
    textAlign: "left",
    marginLeft: RFPercentage(25), // 25% of the screen width
  },
  start_page_text: {
    textAlign: 'center',
    marginRight: RFValue(15),
    marginBottom:  RFPercentage(20), 
  },
  textView: {
    marginTop: RFPercentage(2.5), 
  },
});