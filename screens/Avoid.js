import * as React from "react";
import { useState, useRef } from "react";
import { View, Text, Dimensions, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from '../constants/GlobalStyling.js';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import { scrollViewRef as svrProblem} from './Problemsolve.js';
import { whatToAvoid_texts } from '../constants/TextParagraphs.js';

//Variable declarations
const { width, height } = Dimensions.get('window');
const problemNav = 'Problem';
const exampleNav = 'Examples';

const rightImage = require('../assets/Grafisk-profil/Allequal_profilkit_230315/Allequal_grafik/PNG/Form-4/Artboard-28-copy-511.png');


export default function Avoid({navigation}) {

  const [showMore, setShowMore] = useState(false);
  const scrollOffsetRef = useRef(0);
  const scrollViewRef = useRef(null);

  //Scroll event, this method runs at the end of the user's scroll "drag"
  const handleScrollEndDrag = (event) => {
    const offsetY = Math.round(event.nativeEvent.contentOffset.y);
    const maxOffset = Math.round(event.nativeEvent.contentSize.height) - Math.round(event.nativeEvent.layoutMeasurement.height);

    //Check if the user is at the top of the page and try to go further up
    if(offsetY <= 0){
      if(svrProblem != null)
      {
        svrProblem.current.scrollTo({ x: 0, y: Math.round(height)*2, animated: false})
      }
      navigation.navigate(problemNav);
    }

    // Check if the user has reached the bottom of the page and try to go further down
    if (offsetY >= maxOffset-1) {
      navigation.navigate(exampleNav);
    }
  };

  //Scroll event, this method runs with every scroll
  const handleScroll = (event) =>{
    scrollOffsetRef.current = Math.round(event.nativeEvent.contentOffset.y);
  }

  return (
    <ScrollView ref={scrollViewRef}
    onScroll={handleScroll}
    onScrollEndDrag={handleScrollEndDrag}
    contentContainerStyle={{flexGrow: 1, flexDirection: "column", ...styles.background, justifyContent: "space-between",}}>
      <SafeAreaView style={[styleSheet.container]}>

        <Text style = {[styles.titleText, styleSheet.headerText]}>
        {whatToAvoid_texts[0]}
        </Text>
        
        <View style = {styleSheet.contentContainer}>
          
          {!showMore ? (<Text style={[styles.plainText, styleSheet.text]}>
            {/* insert text here */}
            {whatToAvoid_texts[1]} {'\n'}
          </Text>):(
            <Text style={[styles.plainText, styleSheet.text]}>
            {/* additional text */}
            {whatToAvoid_texts[1]} {'\n'}
            {'\n'}
            {whatToAvoid_texts[2]} {'\n'}
            {'\n'}
            {whatToAvoid_texts[3]} {'\n'}
            {'\n'}
            {whatToAvoid_texts[4]} {'\n'}
            {'\n'}
            {whatToAvoid_texts[5]} {'\n'}
            {'\n'}
            {whatToAvoid_texts[6]} {'\n'}
            {'\n'}
            {whatToAvoid_texts[7]} {'\n'}
            {'\n'}
            {whatToAvoid_texts[8]} {'\n'}
            {'\n'}
            {whatToAvoid_texts[9]} {'\n'}
            {'\n'}
            {whatToAvoid_texts[10]} {'\n'}
            {'\n'}
            {whatToAvoid_texts[11]} {'\n'}
            {'\n'}
            {whatToAvoid_texts[12]} {'\n'}
            {'\n'}
            {whatToAvoid_texts[13]} {'\n'}
            {'\n'}
            {whatToAvoid_texts[14]}
          </Text>)}
        </View>

          <View style={styleSheet.buttonContainer}>
            <TouchableOpacity style={[styleSheet.button]} onPress={() => setShowMore(!showMore)}>
              {!showMore ? (<Text style={[styleSheet.buttonText, styles.readMore_text]}> Read More </Text>) : null}
              {showMore ? (<Text style={[styleSheet.buttonText, styles.readMore_text]}> Read Less </Text>) : null}
            </TouchableOpacity>
          </View>
          

          <View style={styleSheet.rightImageContainer}>
          <ImageBackground source={rightImage} style={styleSheet.rightImage} />
          </View>

          {/*End of screen extra, to expand the screen for positioning (to get correct Y axis position) and to enable scrolling*/}
          {!showMore ? (<View style={styleSheet.endOfScreen}></View>) : (null)}

      </SafeAreaView>
    </ScrollView>
  );
}
// Styles for the components
const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EEE3',
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
  },
  contentContainer: {
    marginHorizontal: 40,
    alignItems: 'center',
  },
  rightImageContainer: {
    marginTop: 520,
    marginLeft: 170,
    position: 'absolute',
    zIndex: -1,
  },
  rightImage: {
    height: 230,
    width: 290,
  },
  headerText: {
    marginTop: 80,
    marginBottom: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'flex-start',
    marginLeft: '50%',
    transform: 'none',
    fontWeight: 'bold',
    marginBottom: 70,
  },
  button: {
    backgroundColor: "00FFFFFF",
  },
  buttonText: {
    fontSize: 20,
    color: "#000000",
  },
  endOfScreen:{
    width: width,
    height: height*0.5,
  },
});
