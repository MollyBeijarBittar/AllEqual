//Imports
import * as React from "react";
import { useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity} from "react-native";
import {styles} from '../constants/GlobalStyling.js';
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { scrollViewRef as svrCalmness} from './CalmnessScreen.js';
import { problemSolving_texts} from '../constants/TextParagraphs.js';

//Variable declarations
const { width, height } = Dimensions.get('window');
const calmnessNav = 'Calmness';
const avoidNav = 'Avoid';
var currentSavedY = 0;
export var scrollViewRef;

//Image imports
const Image1 = require('../assets/Grafisk-profil/Allequal_profilkit_230315/Allequal_grafik/PNG/Form-1/7.png');
const Image2 = require('../assets/Grafisk-profil/Allequal_profilkit_230315/Allequal_grafik/PNG/Form-4/Artboard-28-copy-411.png');
const Image3 = require('../assets/Grafisk-profil/Allequal_profilkit_230315/Allequal_grafik/PNG/Form-3/6.png');
const Image4 = require('../assets/Grafisk-profil/Allequal_profilkit_230315/Allequal_grafik/PNG/Form-3/3.png');

export default function ProblemSolve( {navigation} ) {

  //Declared variables
  const [showText1, setShowText1] = useState(true);
  const [showText2, setShowText2] = useState(true);
  const [showText3, setShowText3] = useState(true);
  const scrollOffsetRef = useRef(0);
  scrollViewRef = useRef(null);


  //scroll event, this method is run at the end of the users scroll "drag"
  const handleScrollEndDrag = (event) => {
    const offsetY = Math.round(event.nativeEvent.contentOffset.y);
    const maxOffset = Math.round(event.nativeEvent.contentSize.height) - Math.round(event.nativeEvent.layoutMeasurement.height);

    //Check if the user is at the top of the page and tries to go further up
    if(offsetY <= 0){
      if(svrCalmness != null){
        svrCalmness.current.scrollTo({ x: 0, y: Math.round(height)*4, animated: false});{/*y: should be the last page on calmness (in this case 4 because 0 is included)*/}
      }
      navigation.navigate(calmnessNav);
    }

    // Check if the user has reached the bottom of the page and tries to go further down
    if (offsetY >= maxOffset) {
      navigation.navigate(avoidNav);
    }
  };

  //scroll event, this method runs with every scroll
  const handleScroll = (event) =>{
    scrollOffsetRef.current = Math.round(event.nativeEvent.contentOffset.y);
  }

  //handles next step button
  const handleNextStep = () => {
    const roundedHeight = Math.round(height);
    const currentY = Math.round(scrollOffsetRef.current);
    if(currentY <= 0)
    {
      scrollViewRef.current.scrollTo({ x: 0, y: roundedHeight, animated: true })
    }
    else if(currentY <= roundedHeight)
    {
      scrollViewRef.current.scrollTo({ x: 0, y: roundedHeight*2, animated: true })
    }
    else if(currentY <= roundedHeight*2)
    {
      navigation.navigate(avoidNav);
    }
  };

  const handleMomentumScrollEnd = (event) => {
    const offsetY = Math.round(event.nativeEvent.contentOffset.y);

    if(currentSavedY <= offsetY-(height*0.95) || currentSavedY >= offsetY+(height*0.95)){
      setShowText1(true);
      setShowText2(true);
      setShowText3(true);
      currentSavedY = offsetY;
    }
  }

  //PROBLEM SOLVE PAGE
  return (

  //ScrollView is the main container for the problem solve screen. This also handles scrolling and runs functions/events.
  <ScrollView ref={scrollViewRef}
  onScroll={handleScroll}
  onScrollEndDrag={handleScrollEndDrag}
  onMomentumScrollEnd={handleMomentumScrollEnd}
  contentContainerStyle={{flexGrow: 1, flexDirection: "column", ...styles.background, justifyContent: "space-between",}}
  //style={{flex: 1, flexDirection: 'column', ...styles.background}} <---- uncomment if needed(if contentContainerStyle does not work)
  snapToOffsets={[0, Math.round(height), Math.round(height)*2]} >{/*snap to the different offsets*/}

    <SafeAreaView style={localStyles.backContainer}>
      {/*Step 5*/}
            <View style={localStyles.container}>
              {/**Images */}
              <Image source={Image1} style={localStyles.Image1} />
              <Image source={Image2} style={localStyles.Image2} />
              

              {/*Title*/}
              <Text style={[styles.titleText, localStyles.textHeader]}>{problemSolving_texts[0]}</Text>
              <Text style={localStyles.subHeaderText}>  {problemSolving_texts[1]}</Text>

              {/*Text*/}
              {showText1 ? (<Text style={[styles.plainText, localStyles.text]}>{problemSolving_texts[2]}</Text>) : 
              (<Text style={[styles.plainText, localStyles.text]}>
              {problemSolving_texts[2]}{'\n'}{'\n'}{problemSolving_texts[3]}{'\n'}{problemSolving_texts[4]}{'\n'}{problemSolving_texts[5]}{'\n'}{problemSolving_texts[6]}</Text>)}
              
              {/*Read More Button*/}
              <TouchableOpacity style={[localStyles.button]} onPress={() => setShowText1(!showText1)}>
                {showText1 ? (<Text style={[localStyles.buttonText, styles.readMore_text]}> Read More </Text>) : 
                (<Text style={[localStyles.buttonText, styles.readMore_text]}> Read Less </Text>)}
              </TouchableOpacity>

              {/*Next Step Text & Next Step Icon */}
                {showText1 ? (<Text style={[styles.nextStep_text, localStyles.nextStepText]}>Next Step</Text>) : null}

              {showText1 ? (
              <TouchableOpacity style={[localStyles.nextStepArrow]} onPress={() => {handleNextStep();}}>
                <AntDesign name="circledowno" size={48} color="black" />
              </TouchableOpacity>
              ) : null} 

            </View>
        



      {/*Step 6*/}

          <View style={localStyles.container}>
              {/**Images */}
              <Image source={Image3} style={localStyles.Image3} />

              {/*Title*/}
              <Text style={[styles.titleText, localStyles.textHeader]}>{problemSolving_texts[7]}</Text>
              <Text style={localStyles.subHeaderText}>{problemSolving_texts[8]}</Text>
              
              {/*Text*/}
              {showText2 ? (<Text style={[styles.plainText, localStyles.text]}>{problemSolving_texts[9]}</Text>) : 
              (<Text style={[styles.plainText, localStyles.text]}>{problemSolving_texts[9]}{'\n'}{'\n'}{problemSolving_texts[10]}</Text>)}
              
              {/*Read More Button*/}
              <TouchableOpacity style={[localStyles.button]} onPress={() => setShowText2(!showText2)}>
                {showText2 ? (<Text style={[localStyles.buttonText, styles.readMore_text]}> Read More </Text>) : 
                (<Text style={[localStyles.buttonText, styles.readMore_text]}> Read Less </Text>)}
              </TouchableOpacity>

              {/*Next Step Text & Next Step Icon */}
              {showText2 ? (<Text style={[styles.nextStep_text, localStyles.nextStepText]}>Next Step</Text>) : null}
              {showText2 ? (
              <TouchableOpacity style={[localStyles.nextStepArrow]} onPress={() => {handleNextStep();}}>
                <AntDesign name="circledowno" size={48} color="black" />
              </TouchableOpacity>
              ) : null} 
          </View>

      {/*Step 7*/}

        <View style={localStyles.container}>
              {/**Images */}
              <Image source={Image4} style={localStyles.Image4} />

              {/*Title*/}
              <Text style={[styles.titleText, localStyles.textHeader]}>{problemSolving_texts[11]}</Text>
              <Text style={localStyles.subHeaderText}>{problemSolving_texts[12]}</Text>
              
              {/*Text*/}
              {showText3 ? (<Text style={[styles.plainText, localStyles.text]}>{problemSolving_texts[13]}</Text>) : 
              (<Text style={[styles.plainText, localStyles.text]}>{problemSolving_texts[13]}{'\n'}{'\n'}{problemSolving_texts[14]}</Text>)}
              
              {/*Read More Button*/}
              <TouchableOpacity style={[localStyles.button]} onPress={() => setShowText3(!showText3)}>
                {showText3 ? (<Text style={[localStyles.buttonText, styles.readMore_text]}> Read More </Text>) : 
                (<Text style={[localStyles.buttonText, styles.readMore_text]}> Read Less </Text>)}
              </TouchableOpacity>

              {/*Next Step Text & Next Step Icon */}
              {showText3 ? (<Text style={[styles.nextStep_text, localStyles.nextStepText]}>Next Step</Text>) : null}
              {showText3 ? (
              <TouchableOpacity style={[localStyles.nextStepArrow]} onPress={() => {handleNextStep();}}>
                <AntDesign name="circledowno" size={48} color="black" />
              </TouchableOpacity>
              ) : null} 
          </View>
    </SafeAreaView>


        {/*End of screen extra, to expand the screen for positioning.(to get correct Y axis position)*/}
        <View style={localStyles.endOfScreen}></View>

  </ScrollView>

  );
}


{/*Locally stored variable characteristics*/}
const localStyles = StyleSheet.create({
  backContainer:{
    flex:1
  },

  container: {
    width: width,
    height: height,
  },

  endOfScreen:{
    width: width*0.05,
    height: height*0.05,
  },
  
  text: {
    zIndex: 3,
    paddingHorizontal: width*0.045,
    fontWeight: "normal",
    paddingTop: height*0.01,
  },

  textHeader: {
    zIndex: 3,
    textAlign: "center",
    paddingTop: height*0.10,
  },

  subHeaderText: {
    zIndex: 3,
    textAlign: "center",
    paddingTop: height*0.05,
    fontFamily: "DMSerif",
    fontSize: 22,
  },

  button: {
    zIndex: 3,
    backgroundColor: "00FFFFFF",
    marginTop: height*0.025,
    marginLeft: width*0.55,
    fontWeight: "bold",
  },

  buttonText: {
    zIndex: 3,
  },

  nextStepText:{
    zIndex: 3,
    top: height*0.75,
    left: (width * 0.72),
    fontSize: 18,
    color: "#000000",
    position: "absolute",
  },

  nextStepArrow:{
    zIndex: 3,
    top: height*0.8,
    left: (width * 0.755),
    position: "absolute",
  },

  Image1: {
    width: 400,
    height: 300,
    bottom: height*0.4,
    right: width*0.6,
    zIndex: 1,
    transform: [{ rotate: '240deg' }],
    position: "absolute",
    alignSelf: 'center',
  },

  Image2: {
    width: 375,
    height: 300,
    bottom: height*0.025,
    right: -(width*0.525),
    zIndex: 1,
    position: "absolute",
    alignSelf: 'center',
  },
  
  Image3: {
    width: 470,
    height: 330,
    bottom: height*0.025,
    right: (width*0.425),
    zIndex: 1,
    transform: [{ rotate: '180deg'} , {scaleY: -1}],
    position: "absolute",
    alignSelf: 'center',
  },
  
  Image4: {
    width: 470,
    height: 330,
    bottom: -(height*0.175),
    right: -(width*0.325),
    zIndex: 1,
    transform: [{ rotate: '-160deg'}, {scaleY: -1}, {scaleX: -1}],
    position: "absolute",
    alignSelf: 'center',
  },
});
