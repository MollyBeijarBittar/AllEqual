//Imports
import * as React from "react";
import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "../constants/GlobalStyling.js";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { scrollViewRef as svrProblem} from './Problemsolve.js';
import { CalmnessScreen_texts } from "../constants/TextParagraphs.js";
import { WaveFunction } from "../components/WaveFunc.js";

//Variable declarations
const { width, height } = Dimensions.get('window');
const startNav = 'Start';
const problemNav = 'Problem';
var currentSavedY = 0;
export var scrollViewRef;

//Image imports
const Image1 = require("../assets/Grafisk-profil/Allequal_profilkit_230315/Allequal_grafik/PNG/Form-1/7.png");
const Image2 = require("../assets/Grafisk-profil/Allequal_profilkit_230315/Allequal_grafik/PNG/Form-4/Artboard-28-copy-411.png");
const Image3 = require("../assets/Grafisk-profil/Allequal_profilkit_230315/Allequal_grafik/PNG/Form-3/6.png");
const Image4 = require("../assets/Grafisk-profil/Allequal_profilkit_230315/Allequal_grafik/PNG/Form-3/3.png");

export default function CalmnessScreen({ navigation }) {
  //Declared variables
  const [showText1, setShowText1] = useState(true);
  const [showText2, setShowText2] = useState(true);
  const [showText3, setShowText3] = useState(true);
  const [showText4, setShowText4] = useState(true);
  const [showBreathing, setShowBreathing] = useState(false);
  const scrollOffsetRef = useRef(0);
  scrollViewRef = useRef(null);

  //Scroll event, this method runs at the end of the users scroll "drag"
  const handleScrollEndDrag = (event) => {
    const offsetY = Math.round(event.nativeEvent.contentOffset.y);
    const maxOffset = Math.round(event.nativeEvent.contentSize.height) - Math.round(event.nativeEvent.layoutMeasurement.height);

    //Check if the user is at the top of the page and try to go further up
    if (offsetY <= 0) {
      navigation.navigate(startNav);
    }
    //Check if the user has reached the bottom of the page and try to go further down
    if (offsetY >= maxOffset) {
      if(svrProblem != null){
        svrProblem.current.scrollTo({ x: 0, y: 0, animated: false})
      }
      navigation.navigate(problemNav);
    }
  };

  //Scroll event, this method runs with every scroll
  const handleScroll = (event) =>{
    scrollOffsetRef.current = Math.round(event.nativeEvent.contentOffset.y);
  }

  //Handles next step button
  const handleNextStep = () => {
    const roundedHeight = Math.round(height);
    const currentY = Math.round(scrollOffsetRef.current);
    if (currentY <= 0) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: roundedHeight,
        animated: true,
      });
    } else if (currentY == roundedHeight) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: roundedHeight * 2,
        animated: true,
      });
    } else if (currentY == roundedHeight * 2) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: roundedHeight * 3,
        animated: true,
      });
    } else if (currentY == roundedHeight * 3) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: roundedHeight * 4,
        animated: true,
      });
    } else if (currentY == roundedHeight * 4) {
      if(svrProblem != null){
        svrProblem.current.scrollTo({ x: 0, y: 0, animated: false});
      }
      navigation.navigate(problemNav);
    } else if (currentY == roundedHeight * 5) {
      if(svrProblem != null){
        svrProblem.current.scrollTo({ x: 0, y: 0, animated: false});
      }
      navigation.navigate(problemNav);
    } else {
    }
  };

  function WaveClassToFunc() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WaveFunction />
      </View>
    );
  }

  const handleMomentumScrollEnd = (event) => {
    const offsetY = Math.round(event.nativeEvent.contentOffset.y);

    if(currentSavedY <= offsetY-(height*0.95) || currentSavedY >= offsetY+(height*0.95)){
      setShowText1(true);
      setShowText2(true);
      setShowText3(true);
      setShowText4(true);
      currentSavedY = offsetY;
    }
  }

  const alert1 = () => {
    Alert.alert("", CalmnessScreen_texts[15], [
      { text: CalmnessScreen_texts[16] },
    ]);
  };

  const alert2 = () => {
    Alert.alert("", CalmnessScreen_texts[18], [
      { text: CalmnessScreen_texts[16] },
    ]);
  };

  const alert3 = () => {
    Alert.alert("", CalmnessScreen_texts[20], [
      { text: CalmnessScreen_texts[16] },
    ]);
  };

  //CALMNESS PAGE
  return (

  //ScrollView is the main container for the Calmness screen. This also handles scrolling and runs functions/events.
  <ScrollView ref={scrollViewRef}
  onScroll={handleScroll}
  onScrollEndDrag={handleScrollEndDrag}
  onMomentumScrollEnd={handleMomentumScrollEnd}
  contentContainerStyle={{flexGrow: 1, flexDirection: "column", ...styles.background, justifyContent: "space-between",}}
  snapToOffsets={[0, Math.round(height), Math.round(height)*2, Math.round(height)*3, Math.round(height)*4]} >{/*snap to the different offsets*/}

  <SafeAreaView style={localStyles.backContainer}> 
    {/*Step 1*/}
        <View style={localStyles.container}>      
              {/**Images */}
              <Image source={Image1} style={localStyles.Image1} />
              <Image source={Image2} style={localStyles.Image2} />

        {/*Title*/}
        <Text style={[styles.titleText, localStyles.textHeader]}>
          {CalmnessScreen_texts[0]}
        </Text>

        {/*Text*/}
        {showText1 ? (
          <Text style={[styles.plainText, localStyles.text]}>
            {CalmnessScreen_texts[2]}{" "}
          </Text>
        ) : null}
        {!showText1 ? (
          <Text style={[styles.plainText, localStyles.text]}>
            {CalmnessScreen_texts[2]} {"\n"} {"\n"}
            {CalmnessScreen_texts[3]}
          </Text>
        ) : null}

        {/*Read More Button*/}
        <TouchableOpacity
          style={[localStyles.button]}
          onPress={() => setShowText1(!showText1)}
        >
          {showText1 ? (
            <Text style={[localStyles.buttonText, styles.readMore_text]}>
              {" "}
              Read More{" "}
            </Text>
          ) : null}
          {!showText1 ? (
            <Text style={[localStyles.buttonText, styles.readMore_text]}>
              {" "}
              Read Less{" "}
            </Text>
          ) : null}
        </TouchableOpacity>

        {/*Next Step Text & Next Step Icon */}
        {showText1 ? (
          <Text style={[styles.titleText, localStyles.nextStepText]}>
            Next Step
          </Text>
        ) : null}
        {showText1 ? (
          <TouchableOpacity
            style={[localStyles.nextStepArrow]}
            onPress={() => {
              handleNextStep();
            }}
          >
            <AntDesign name="circledowno" size={48} color="black" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={localStyles.container}>
        {/*Title*/}
        <Text style={localStyles.subHeaderText}>{CalmnessScreen_texts[1]}</Text>
        {showBreathing ? null : <WaveClassToFunc />}
        {/*Next Step Text & Next Step Icon*/}
        <Text style={[styles.titleText, localStyles.nextStepText]}>
          Next Step
        </Text>

        <TouchableOpacity
          style={[localStyles.nextStepArrow]}
          onPress={() => {
            handleNextStep();
          }}
        >
          <AntDesign name="circledowno" size={48} color="black" />
        </TouchableOpacity>
      </View>

      {/*Step 2*/}
      <View style={localStyles.container}>
        {/**Images */}
        <Image source={Image3} style={localStyles.Image3} />

        {/*Title*/}
        <Text style={[styles.titleText, localStyles.textHeader]}>
          {CalmnessScreen_texts[4]}
        </Text>
        <Text style={localStyles.subHeaderText}>{CalmnessScreen_texts[5]}</Text>

        {/*Text*/}
        {showText2 ? (
          <Text style={[styles.plainText, localStyles.text]}>
            {CalmnessScreen_texts[6]}
          </Text>
        ) : null}
        {!showText2 ? (
          <Text style={[styles.plainText, localStyles.text]}>
            {CalmnessScreen_texts[6]} {"\n"} {"\n"}
            {CalmnessScreen_texts[7]} {"\n"} {"\n"}
            {CalmnessScreen_texts[8]}{" "}
          </Text>
        ) : null}

        {/*Read More Button*/}
        <TouchableOpacity
          style={[localStyles.button]}
          onPress={() => setShowText2(!showText2)}
        >
          {showText2 ? (
            <Text style={[localStyles.buttonText, styles.readMore_text]}>
              {" "}
              Read More{" "}
            </Text>
          ) : null}
          {!showText2 ? (
            <Text style={[localStyles.buttonText, styles.readMore_text]}>
              {" "}
              Read Less{" "}
            </Text>
          ) : null}
        </TouchableOpacity>

        {/*Next Step Text & Next Step Icon */}
        {showText2 ? (
          <Text style={[styles.nextStep_text, localStyles.nextStepText]}>
            Next Step
          </Text>
        ) : null}
        {showText2 ? (
          <TouchableOpacity
            style={[localStyles.nextStepArrow]}
            onPress={() => {
              handleNextStep();
            }}
          >
            <AntDesign name="circledowno" size={48} color="black" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/*Step 3*/}
      <View style={localStyles.container}>
        {/**Images */}
        <Image source={Image4} style={localStyles.Image4} />

        {/*Title*/}
        <Text style={[styles.titleText, localStyles.textHeader]}>
          {CalmnessScreen_texts[9]}
        </Text>
        <Text style={localStyles.subHeaderText}>
          {CalmnessScreen_texts[10]}
        </Text>

        {/*Text*/}
        {showText3 ? (
          <Text style={[styles.plainText, localStyles.text]}>
            {CalmnessScreen_texts[11]}{" "}
          </Text>
        ) : null}
        {!showText3 ? (
          <Text style={[styles.plainText, localStyles.text]}>
            {CalmnessScreen_texts[11]}
            {"\n"} {"\n"}
            {CalmnessScreen_texts[12]}
            {"\n"} {"\n"}
            {CalmnessScreen_texts[13]}{" "}
          </Text>
        ) : null}

        {/*Read More Button*/}
        <TouchableOpacity
          style={[localStyles.button]}
          onPress={() => setShowText3(!showText3)}
        >
          {showText3 ? (
            <Text style={[localStyles.buttonText, styles.readMore_text]}>
              {" "}
              Read More{" "}
            </Text>
          ) : null}
          {!showText3 ? (
            <Text style={[localStyles.buttonText, styles.readMore_text]}>
              {" "}
              Read Less{" "}
            </Text>
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity onPress={alert1} style={localStyles.alertButton}>
          {showText3 ? (
            <Text style={localStyles.alertButtonText}>
              {CalmnessScreen_texts[14]}{" "}
            </Text>
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity onPress={alert2} style={localStyles.alertButton}>
          {showText3 ? (
            <Text style={localStyles.alertButtonText}>
              {CalmnessScreen_texts[17]}{" "}
            </Text>
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity onPress={alert3} style={localStyles.alertButton}>
          {showText3 ? (
            <Text style={localStyles.alertButtonText}>
              {CalmnessScreen_texts[19]}{" "}
            </Text>
          ) : null}
        </TouchableOpacity>

        {/*Next Step Text & Next Step Icon */}
        {showText3 ? (
          <Text style={[styles.titleText, localStyles.nextStepText]}>
            Next Step
          </Text>
        ) : null}
        {showText3 ? (
          <TouchableOpacity
            style={[localStyles.nextStepArrow]}
            onPress={() => {
              handleNextStep();
            }}
          >
            <AntDesign name="circledowno" size={48} color="black" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/*Step 4*/}
      <View style={localStyles.container}>
        {/**Images */}
        <Image source={Image4} style={localStyles.Image4} />

        {/*Title*/}
        <Text style={[styles.titleText, localStyles.textHeader]}>
          {CalmnessScreen_texts[21]}
        </Text>
        <Text style={localStyles.subHeaderText}>
          {CalmnessScreen_texts[22]}
        </Text>

        {/*Text*/}
        {showText4 ? (
          <Text style={[styles.plainText, localStyles.text]}>
            {CalmnessScreen_texts[23]}
          </Text>
        ) : null}
        {!showText4 ? (
          <Text style={[styles.plainText, localStyles.text]}>
            {CalmnessScreen_texts[23]} {"\n"}
            {"\n"}
            {CalmnessScreen_texts[24]} {"\n"}
            {"\n"}
            {CalmnessScreen_texts[25]} {"\n"}
            {"\n"}
            {CalmnessScreen_texts[26]}
          </Text>
        ) : null}

        {/*Read More Button*/}
        <TouchableOpacity
          style={[localStyles.button]}
          onPress={() => setShowText4(!showText4)}
        >
          {showText4 ? (
            <Text style={[localStyles.buttonText, styles.readMore_text]}>
              {" "}
              Read More{" "}
            </Text>
          ) : null}
          {!showText4 ? (
            <Text style={[localStyles.buttonText, styles.readMore_text]}>
              {" "}
              Read Less{" "}
            </Text>
          ) : null}
        </TouchableOpacity>

        {/*Next Step Text & Next Step Icon */}
        {showText4 ? (
          <Text style={[styles.titleText, localStyles.nextStepText]}>
            Next Step
          </Text>
        ) : null}
        {showText4 ? (
          <TouchableOpacity
            style={[localStyles.nextStepArrow]}
            onPress={() => {
              handleNextStep();
            }}
          >
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

{
  /*Locally stored variable characteristics*/
}
const localStyles = StyleSheet.create({
  alertContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  backContainer:{
    flex:1
  },

  backContainer:{
    flex:1
  },

  container: {
    width: width,
    height: height,
  },

  endOfScreen: {
    width: width * 0.05,
    height: height * 0.05,
  },

  subHeaderText: {
    zIndex: 3,
    textAlign: "center",
    paddingTop: height * 0.05,
    fontFamily: "DMSerif",
    fontSize: 22,
  },

  textHeader: {
    zIndex: 3,
    textAlign: "center",
    paddingTop: height * 0.1,
  },

  text: {
    zIndex: 3,
    paddingHorizontal: width * 0.075,
    fontWeight: "normal",
    paddingTop: height * 0.05,
  },

  alertButton: {
    marginBottom: height * 0.025,
    zIndex: 3,
    backgroundColor: "#D6E0DE",
    alignSelf: "center",
    borderRadius: 50,
  },

  alertButtonText: {
    zIndex: 3,
    color: "#000000",
    fontFamily: "DMSerif",
    fontSize: 18,
  },

  button: {
    zIndex: 3,
    backgroundColor: "00FFFFFF",
    marginTop: height * 0.025,
    marginLeft: width * 0.55,
    fontWeight: "bold",
  },

  buttonText: {
    zIndex: 3,
    color: "#000000",
    paddingBottom: 50,
  },

  nextStepText: {
    zIndex: 3,
    top: height*0.75,
    left: (width * 0.72),
    fontSize: 18,
    color: "#000000",
    position: "absolute",
  },

  nextStepArrow: {
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
    transform: [{ rotate: "240deg" }],
    position: "absolute",
    alignSelf: "center",
  },

  Image2: {
    width: 375,
    height: 300,
    bottom: height*0.025,
    right: -(width*0.525),
    zIndex: 1,
    position: "absolute",
    alignSelf: "center",
  },

  Image3: {
    width: 470,
    height: 330,
    bottom: height*0.025,
    right: (width*0.425),
    zIndex: 1,
    transform: [{ rotate: "180deg" }, { scaleY: -1 }],
    position: "absolute",
    alignSelf: "center",
  },

  Image4: {
    width: 470,
    height: 330,
    bottom: -(height*0.175),
    right: -(width*0.325),
    zIndex: 1,
    transform: [{ rotate: "-160deg" }, { scaleY: -1 }, { scaleX: -1 }],
    position: "absolute",
    alignSelf: "center",
  },
});