//Imports
import * as React from "react";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Animated, Image, ViewBase, Button, ImageBackground} from "react-native";
import {styles} from '../constants/GlobalStyling.js';
import { AntDesign } from "@expo/vector-icons";
import { exampleTexts, exampleDialog1, exampleDialog2, exampleDialog3 } from '../constants/TextParagraphs.js';

//Variable declarations
const { width, height } = Dimensions.get('window');
const avoidNav = 'Avoid';
const aboutNav = 'About';

//Image imports
const examplePerson = require('../assets/examplePerson.png');
const speechBubble = require('../assets/speechBubble.png');

export default function Examples( {navigation} ) {

  //Declared variables
  const [showText1, setShowText1] = useState(true);
  const [showText2, setShowText2] = useState(true);
  const [showText3, setShowText3] = useState(true);

  const scrollOffsetRef = useRef(0);
  const scrollViewRef = useRef(null);


  //Scroll event, this method runs at the end of the user's scroll "drag"
  const handleScrollEndDrag = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const maxOffset = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;

    //Check if the user is at the top of the page and try to go further up
    if(offsetY <= 0){
      navigation.navigate(avoidNav);
      console.log(avoidNav)
    }

    //Check if the user has reached the bottom of the page and try to go further down
    if (offsetY >= maxOffset) {
      navigation.navigate(aboutNav);
    }
  };

  //Scroll event, this method runs with every scroll
  const handleScroll = (event) =>{
    scrollOffsetRef.current = event.nativeEvent.contentOffset.y;
  }

  //Handles next step button
  const handleNextStep = () => {
    const currentY = scrollOffsetRef.current;
    if(currentY <= 0)
    {
      scrollViewRef.current.scrollTo({ x: 0, y: height, animated: true })
    }
    else if(currentY <= height+1)
    {
      scrollViewRef.current.scrollTo({ x: 0, y: height*2, animated: true })
    }
    else if(currentY <= height*2)
    {
      navigation.navigate(aboutNav);
    }
  };

  //Read more button
  const ReadMore = ( {showText, setShowText} ) => {
    return (
      <>
        <TouchableOpacity style={[localStyles.button]} onPress={() => setShowText(!showText)}>
          {showText ? (<Text style={[localStyles.buttonText, styles.titleText]}> Read More </Text>) : 
          (<Text style={[localStyles.buttonText, styles.titleText]}> Read Less </Text>)}
        </TouchableOpacity>
      </>
    );
  };

  //Next step button and text
  const NextStep = forwardRef((props, ref) => {

    const {showText} = props;
    const [nextStepText, setNextStepText] = useState("Next");

    const setText = (text) => {
      setNextStepText(text);
    };

    //Expose set text function using useImperativeHandle so it can be used by parent component
    useImperativeHandle(ref, () => ({
      setText,
    }));

    if(!showText) return null;

    return(
      <>
        <Text style={[styles.titleText, localStyles.nextStepText]}>{nextStepText}</Text>
        <TouchableOpacity style={[localStyles.nextStepArrow]} onPress={props.onPress}>
          <AntDesign name="circledowno" size={48} color="black" />
        </TouchableOpacity>
      </>
    );
  });
  
  //Component that contains an image
  const Person = forwardRef((props, ref) => {
    const sizeCoeff = useRef(new Animated.Value(1)).current;
    
    //Changes sizeCoeff value to 1.2 in 0.5 seconds
    const increaseSize = () => {
      Animated.timing(sizeCoeff, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
    
    //Changes sizeCoeff value to 1 in 0.5 seconds
    const decreaseSize = () => {
      Animated.timing(sizeCoeff, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
    
    //Expose animation functions using useImperativeHandle so they can be used by parent component
    useImperativeHandle(ref, () => ({
      increaseSize,
      decreaseSize,
    }));
    
    //Content
    return (
      <View>
        <Animated.Image
          source={examplePerson}
          style={[
            localStyles.examplePerson,
            {
              marginLeft: 10,
              width: 100,
              height: 100,
              transform: [{ scale: sizeCoeff }],
            },
          ]}
        />
      </View>
    );
  });
  
  //Component that contains an image
  const Bubble = forwardRef((props, ref) => {

    //Direction used for mirroring
    const [dir, setDir] = useState(1);

    //Text content
    const [text, setText] = useState("");

    //Fills the bubble with text from parameter
    const displayText = (text) => {
      setText(text);
    };

    //Mirror the bubble so that it is pointing in the opposite direction
    const mirrorSelf = () => {
      setDir(-dir);
    };

    //Expose animation functions using useImperativeHandle so they can be used by parent component
    useImperativeHandle(ref, () => ({
        displayText,
        mirrorSelf,
      })
    );

    //Content
    return (
      <ImageBackground
        source ={speechBubble} 
        style={[
          localStyles.speechBubble, 
          {
            transform:[{scaleX: dir}],
          },
          props.style,
        ]}
      >
        <Text style={[localStyles.text, {textAlign: "center", transform:[{scaleX:+dir}]}]}>{text}</Text>
      </ImageBackground>
    );
  });
  
  //Animation view
  const AnimationView = (props) => {
    
    const {showText} = props;
    
    if(!showText) return null;
    
    return (
      <View style={[localStyles.animatedView, {flexDirection: "row", justifyContent:"space-around"}]}>
        {props.children}
      </View>
    );
    
  };

  //Example page
  const ExamplePage = ( {nr, index, showText, setShowText, exampleDialog} ) => {

      const personRef1 = useRef(null);
      const personRef2 = useRef(null);
      const bubbleRef = useRef(null);
      const nextStepRef = useRef(null);

      //Index for the dialog content
      const [dialogIndex, setDialogIndex] = useState(0);

      //Used for keeping track of who is speaking
      const [speaker, setSpeaker] = useState(exampleDialog[0][0]);

      const handleIncreaseSize = (thisPersonRef) => {
        if(thisPersonRef.current){
          thisPersonRef.current.increaseSize();
        }
      };

      const handleDecreaseSize = (thisPersonRef) => {
        if(thisPersonRef.current){
          thisPersonRef.current.decreaseSize();
        }
      };

      const handleMirror = (thisBubbleRef) => {
        if(thisBubbleRef.current){
          thisBubbleRef.current.mirrorSelf();
        }
      };

      const handleTextFill = (thisBubbleRef, text) => {
        if(thisBubbleRef.current){
          thisBubbleRef.current.displayText(text);
        }
      };

      const handleNextStepText = (thisNextStepRef, text) => {
        if(thisNextStepRef.current){
          thisNextStepRef.current.setText(text);
        }
      };

      const handleButtonPressed = () => {
        //Next line in dialog
        if(dialogIndex < exampleDialog.length){

          //Initial size increase
          if(dialogIndex == 0){
            if(speaker === "1") handleIncreaseSize(personRef1);
            else handleIncreaseSize(personRef2);
          }

          //Get and set text in bubble
          const dialogLine = exampleDialog[dialogIndex][1];
          handleTextFill(bubbleRef, dialogLine);

          //Switch sides if the other person is speaking
          if(exampleDialog[dialogIndex][0] != speaker){
            handleMirror(bubbleRef);
            if(speaker === "1"){
              setSpeaker("2");
              handleDecreaseSize(personRef1);
              handleIncreaseSize(personRef2);
            }
            else {
              setSpeaker("1");
              handleDecreaseSize(personRef2);
              handleIncreaseSize(personRef1);
            }
          }

          //Set text to Finish if end of dialog reached
          if(dialogIndex == exampleDialog.length-1){
            handleNextStepText(nextStepRef, "Finish");
          }

          //Increment dialog index
          setDialogIndex(dialogIndex+1);

        }

        //End of dialog reached
        else {
          handleNextStep();
        }
      };

      return (
        <View style={localStyles.container}>
          <View>

            {/*Title*/}
            <Text style={[styles.titleText, localStyles.textHeader]}>Example {nr}</Text>

            {/*Text*/}
            {showText ? (<Text style={[styles.plainText, localStyles.text]}>{exampleTexts[index]}</Text>) : 
            (<Text style={[styles.plainText, localStyles.text]}>{exampleTexts[index+1]}</Text>)}
            
            {/*Read More Button*/}
            <ReadMore showText={showText} setShowText={setShowText}/>

            {/* Animated view */}
            <AnimationView showText={showText}>

              <Person ref={personRef1} style={[{marginTop:100}]}/>
              
              <Bubble ref={bubbleRef} style={[{marginTop:0}]}/>

              <Person ref={personRef2} style={[{marginTop:100}]}/>

            </AnimationView>

            {/*Next Step Text & Next Step Icon */}
            <NextStep ref={nextStepRef} showText={showText} onPress={handleButtonPressed}/>

          </View>
        </View>
    );
  };

  //EXAMPLES PAGES
  return (

    //ScrollView is the main container for the screen. This also handles scrolling and runs functions/events.
    <ScrollView ref={scrollViewRef}
    onScroll={handleScroll}
    onScrollEndDrag={handleScrollEndDrag} 
    contentContainerStyle={{flexGrow: 1, flexDirection: "column", ...styles.background, justifyContent: "space-between",}}
    snapToOffsets={[0, height, height*2]} >{/*snap to the different offsets*/}

      {/*Example 1*/}
      <ExamplePage nr = {1} index = {0} showText = {showText1} setShowText = {setShowText1} exampleDialog={exampleDialog1}/>
          
      {/*Example 2*/}
      <ExamplePage nr = {2} index = {2} showText = {showText2} setShowText = {setShowText2} exampleDialog={exampleDialog2}/>

      {/*Example 3*/}
      <ExamplePage nr = {3} index = {4} showText = {showText3} setShowText = {setShowText3} exampleDialog={exampleDialog3}/>

      {/*End of screen extra, to expand the screen for positioning.(to get correct Y axis position)*/}
      <View style={localStyles.endOfScreen}></View>

    </ScrollView>

  );
}


{/*Locally stored variable characteristics*/}
const localStyles = StyleSheet.create({

  container: {
    width: width,
    height: height,
  },

  endOfScreen:{
    width: width*0.05,
    height: height*0.05,
  },

  textHeader: {
    zIndex: 3,
    textAlign: "center",
    fontWeight: "normal",
    paddingTop: height*0.1,
  },
  
  text: {
    zIndex: 3,
    paddingHorizontal: width*0.075,
    fontWeight: "normal",
    paddingTop: height*0.03,
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
    marginTop: height*0.0125,
    marginLeft: width*0.725,
    fontSize: 22,
    color: "#000000",
    textAlign: "center",
  },

  nextStepArrow:{
    zIndex: 3,
    left: (width * 0.8),
    bottom: -(height*0.025),
  },

  animatedView:{
    width: width*0.9,
    height: height*0.32,
    marginTop: height*0.025,
    alignSelf: "center",
  },

  examplePerson: {
    marginTop: 100,
  },

  speechBubble: {
    width: 190,
    height: 125,
    marginTop: 10,
  },

});
