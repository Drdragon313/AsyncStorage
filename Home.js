import React, { useState,useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Switch,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


import background from "./assets/medina.jpeg";
import App from "./App";
const Home = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const toggleSwitch3 = () => setIsEnabled3((previousState) => !previousState);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const toggleSwitch4 = () => setIsEnabled4((previousState) => !previousState);
  const [isEnabled5, setIsEnabled5] = useState(false);
  const toggleSwitch5 = () => setIsEnabled5((previousState) => !previousState);


  const getData = async () => {
    console.log("Function started");
    console.log(selectedStartDate);
    try {
      const jsonValue = await AsyncStorage.getItem(selectedStartDate)
      console.log(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
     console.log(e);
    }
  };

  const storeDataToStorage = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(selectedStartDate, jsonValue)
      
    } catch (e) {
      console.log(e);
    }
  }


  const storeData =  () => {
    getData();
    const Data = [{
          "Fajar": isEnabled1,
          "Zuhar": isEnabled2,
          "Asr": isEnabled3,
          "Maghrib": isEnabled4,
          "Esha" : isEnabled5,
        }
      ];
      storeDataToStorage(Data);
  };

  const SwitchButton1 = () => {
    return (
      <View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled1 ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch1}
          value={isEnabled1}
        />
      </View>
    );
  };
  const SwitchButton2 = () => {
    return (
      <View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled2 ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch2}
          value={isEnabled2}
        />
      </View>
    );
  };
  const SwitchButton3 = () => {
    return (
      <View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled3 ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch3}
          value={isEnabled3}
        />
      </View>
    );
  };
  const SwitchButton4 = () => {
    return (
      <View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled4 ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch4}
          value={isEnabled4}
        />
      </View>
    );
  };
  const SwitchButton5 = () => {
    return (
      <View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled5 ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch5}
          value={isEnabled5}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.titleStyle}>Namaz Log</Text>
          <View style={styles.CalendarStyle}>
          <Calendar
  current={'2022-05-27'}
  minDate={'2022-03-27'}
  maxDate={new Date()}
  onDayPress={ day => {
    setSelectedStartDate(day['dateString'])
  }}
 
  monthFormat={'yyyy MM'}
  hideExtraDays={true}

  firstDay={1}
  onPressArrowLeft={subtractMonth => subtractMonth()}
  onPressArrowRight={addMonth => addMonth()}
 enableSwipeMonths={true}
/>
          </View>

          <View style={styles.selectedday}>
            <Text style={styles.textStyle}>Selected Date :</Text>
            <Text style={styles.textStyle}>
              {selectedStartDate ? selectedStartDate.toString() : ""}
            </Text>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
    <View style={{
      flexGrow: 1,
    }}>
     <Text style={styles.T1}>
              fajr  
    </Text>
    </View>
    <View style={{
      
      width: 200,
    }}>
      <SwitchButton1 style={styles.fajr} />      
    </View>
  </View>


  <View style={{flex: 1, flexDirection: 'row'}}>
    <View style={{
      flexGrow: 2}}>
     <Text style={styles.T2}>
              zohar
            </Text>
    </View>
    <View style={{
      width: 200,
    }}>
      <SwitchButton2 style={styles.zohar}/>      
    </View>
  </View>

  <View style={{flex: 1, flexDirection: 'row'}}>
<View style={{
  flexGrow: 2,
}}>
 <Text style={styles.T3}>
          Asr
         
        </Text>
</View>
<View style={{
  width: 200,
}}>
  <SwitchButton3 style={styles.Asr}/>      
</View>
</View>


<View style={{flex: 1, flexDirection: 'row'}}>
<View style={{
  flexGrow: 2,
}}>
 <Text style={styles.T4}>
          Maghrib
         
        </Text>
</View>
<View style={{
  width: 200,
}}>
  <SwitchButton4 style={styles.maghrib}/>      
</View>
</View>

<View style={{flex: 1, flexDirection: 'row'}}>
<View style={{
  flexGrow: 2,
}}>
 <Text style={styles.T5}>
          Isha
         
        </Text>
</View>
<View style={{
  width: 200,
}}>
  <SwitchButton5 style={styles.isha}/>      
</View>
</View>




  <View>
  <TouchableOpacity onPress={()=>storeData()}>
    <Text style={styles.savebtn}>save</Text>
  </TouchableOpacity>
</View>
        
        </ImageBackground>
      </View>
        </SafeAreaView>

);
};


export default Home ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  textStyle:{
    fontWeight:"bold",
  },
  CalendarStyle: {
    backgroundColor: "white",
    opacity: 0.8,
    borderRadius: 15,
    marginLeft: 10,
    margin: 5,
    marginRight: 10,
    marginBottom:5,
    height:320,
  },
  titleStyle: {
    textAlign: "center",
    fontSize: 30,
    margin: 1,
    fontWeight:"bold",
    color:"white"
  },
  fajr: {
    flex: 1,
    marginLeft: 3,
  },

  zohar: {
    flex: 1,
    marginLeft: 3,
  },

  Asr: {
    flex: 1,
    marginLeft: 3,
  },
  Maghrib: {
    flex: 1,
    marginLeft: 3,
  },
  Isha: {
    flex: 1,
    marginLeft: 3,
  },
 
  T1: {
    fontSize: 24,
    marginLeft:6, 
   color:"white",
   fontWeight:"bold",
  },
  T2: {
    fontSize: 24,
    marginLeft: 6,
    color:"white" ,
    fontWeight:"bold",
  },
  T3: {
    fontSize: 24,
    marginLeft: 6,
    color:"white" ,
    fontWeight:"bold",
  },
  T4: {
    fontSize: 24,
    marginLeft: 6, 
    color:"white",
    fontWeight:"bold",
  },
  T5: {
    fontSize: 24,
    marginLeft: 6,
    color:"white" ,
    fontWeight:"bold",
  },
  selectedday:{
    backgroundColor:"#cc4f55"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  savebtn:{
    borderRadius:30,
    width:100,
    height:25,
    fontSize:20,
    backgroundColor:"#c12F",
    textAlign:"center",
    alignSelf:"flex-end",
    alignContent:"center",
    marginBottom:10
  },
  
});
