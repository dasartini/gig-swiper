import { useContext, useEffect, useState } from "react";

import { Image, StyleSheet, Text, View, Pressable, FlatList, TouchableOpacity, Button } from "react-native";

import { GigStackContext } from "../contexts/GigStackContext";
import { LikedGigContext } from "../contexts/LikedGigContext";
import { DislikedGigContext } from "../contexts/DislikedGigContext";
import { WebView } from 'react-native-webview'; 
import SpotifyWebView from "./TrackPreview";


export function GigCard(props) {

  const { toggleGigInfoVisible, setCurrentGig, stackNumber, setStackNumber } = props
  const { gigStack } = useContext(GigStackContext)
  const {setLikedGigs, likedGigs} = useContext(LikedGigContext)
  const [spotifyUrl, setSpotifyUrl] = useState(false)
  const [likedIds, setLikedIds] = useState([])
  const {dislikedIds, setDislikedIds} = useContext(DislikedGigContext)

  const imageurl = gigStack[stackNumber].xlargeimageurl

  function handleLike() {
    setStackNumber(stackNumber + 1)
    setCurrentGig(gigStack[stackNumber])
    const newLike = {
      id: gigStack[stackNumber].id,
      title: gigStack[stackNumber].eventname,
      location: gigStack[stackNumber].venue.name,
      imageurl: gigStack[stackNumber].xlargeimageurl,
      description: gigStack[stackNumber].description,
      eventname: gigStack[stackNumber].eventname,
      doorsopening: gigStack[stackNumber].openingtimes.doorsopen,
      doorsclosing: gigStack[stackNumber].openingtimes.doorsclose,
      lastentry: gigStack[stackNumber].openingtimes.lastentry,
      date: gigStack[stackNumber].date,
      town: gigStack[stackNumber].venue.town,
      postcode: gigStack[stackNumber].venue.postcode,
      link: gigStack[stackNumber].link
    }
    setLikedGigs([...likedGigs, newLike])

    setLikedIds([...likedIds, gigStack[stackNumber].id]

    )
  }
  useEffect(() => { setCurrentGig(gigStack[stackNumber]) 
    setSpotifyUrl(false)
    if(gigStack[stackNumber].artists) {
      if(gigStack[stackNumber].artists[0]){
  
        if(gigStack[stackNumber].artists[0].spotifymp3url) {
          console.log(gigStack[stackNumber].artists[0].spotifymp3url)
  
          
        setSpotifyUrl(true) 
     
        }else {
          setSpotifyUrl(false)
        }
      }
  
      
    }  

  }, [stackNumber, gigStack])

  function handleDislikeById() {
    
    setStackNumber(stackNumber + 1)
    setCurrentGig(gigStack[stackNumber])
    if (dislikedIds.length === 0) {
      setDislikedIds([gigStack[stackNumber].id])
    }
    else { dislikedIds.push(gigStack[stackNumber].id) }
    console.log("put on redlist", dislikedIds)

  }


   function handleReset(){
console.log("reset pressed")
    setDislikedIds([])

   }
  {
    if (likedIds.includes(gigStack[stackNumber].id || dislikedIds.includes(gigStack[stackNumber].id))) {
      setStackNumber(stackNumber + 1)

    }
  }



  return (
    <>
      {gigStack === "nosearch" || stackNumber === gigStack.length - 1 ?

        <>
          <Text style={styles.typeACity}>Type a place name to search</Text>
        </>

        :
        (<View style={[styles.container, styles.shadow]}>
          <View style={[styles.row, styles.height50]}>
            <Image style={styles.cardArrowL} source={require('../assets/left.png')} />

            <View style={[styles.imageView, styles.shadowHeavy]}>
              <Image style={styles.cardImage} source={{ uri: imageurl }} />
            </View>
            
            <Image style={styles.cardArrowR} source={require('../assets/right.png')} />
          </View>

          <View style={[styles.row, styles.height30, styles.column]}>
            <SpotifyWebView></SpotifyWebView>
            <Text style={styles.header}>{gigStack[stackNumber].eventname}</Text>
            <Text style={styles.text}>{gigStack[stackNumber].venue.name}</Text>
            <Text style={styles.text}>{gigStack[stackNumber].date}</Text>
            {gigStack[stackNumber].entryprice ? <Text style={styles.text}>£{gigStack[stackNumber].entryprice}</Text> : null}
          </View>


          <View style={[styles.row, styles.height25]}>
            <Pressable style={styles.cardButton} onPress={handleDislikeById}>
              <Image style={styles.cardButtonImage} source={require('../assets/nah.png')} />
            </Pressable>
            <Pressable style={styles.cardButton} onPress={toggleGigInfoVisible}>
              <Image style={styles.infoButton} source={require('../assets/info.png')} />
            </Pressable>
            <Pressable onPress={handleLike} style={styles.cardButton}  >
              <Image style={styles.cardButtonImage} source={require('../assets/rock-on.png')} />
            </Pressable>
          </View>
          
          {spotifyUrl ? <View><Text>Play audio preview</Text></View>:null} 
          {dislikedIds.length > 0 && <Button styles={styles.resetButton} title="Reset" onPress={handleReset} />}
          {/* <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/3w0w2T288dec0mgeZZqoNN?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
          {/* <WebView 
            originWhitelist={['*']} 
            source={{ html: <iframe src="https://open.spotify.com/embed/track/3w0w2T288dec0mgeZZqoNN?utm_source=generator&theme=0"></iframe> }} 
          />  */}
        </View>
        
      
      
      )
      }
   

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    width: '90%',
    height: "90%",
    marginVertical: "2.5%",
    borderRadius: 20,

    // padding: 10,      
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",

  },
  height50: {
    height: "50%",
  },
  height25: {
    height: "15%",
  },
  height30: {
    height: "35%",
  },
  column: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: 'flex-start',
  },
  cardArrowL: {
    width: "20%",
    objectFit: "contain",
    transform: [{translateX: -10}],
  },
  cardArrowR: {
    width: "20%",
    objectFit: "contain",
    transform: [{translateX: 10}],
  },
  imageView: {
    height: '60%',
    width: '60%',
    transform: [{scale: 1.1}],
    objectFit: "contain",
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  cardButton: {
    width: "33%",
    height: 100,
    objectFit: "contain",
    alignItems: 'center',
  },
  infoButton: {
    width: "50%",
    objectFit: "contain",
    alignItems: 'center',
  },
  cardButtonImage: {
    width: "100%",
    objectFit: "contain",
    alignItems: 'center',
  },
  resetButton:{
  
  },
  header: {
    fontSize: 20,
    width: '100%',
    padding: 5,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    width: '100%',
    padding: 5,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10
  },
  shadowHeavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 15
  },
  typeACity: {
    margin: 40,
    fontSize: 30,
    textAlign: 'center',
  },
  darken: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    
  },
});
