import React,{useState} from 'react';
import { Text, View,Dimensions,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';
import {
  LineChart,
} from "react-native-chart-kit";


function Stats() {

  const TempData = [{ data: [0,0,0,0,0] }];

  const[dataFromDb,setdataFromDb] = useState(TempData);

  const labelsofnamaz = ['Fajr', 'Zahar', 'Asar', 'Maghrib', 'Esha']; 
  
  const datafromstorage = dataFromDb;

  const getCurrentDate=(date)=>{
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + '-0' + month + '-' + date;
};
const fetchDataofWeek = async(setData) => {
  const week = [];  
  for (var i = 6; i >= 0; i--) {
    var date = new Date();
    var temp = null;
    temp = getCurrentDate(date.getDate() - i)
    week.push(temp);
  };
  console.log(week);
  var fajarcount = 0;
  var zuharcount = 0;
  var asrcount = 0;
  var maghribcount = 0;
  var eshacount = 0 ;  
  for (var i = 0; i < 7; i++) {
     try {
       const jsonValue = await AsyncStorage.getItem(week[i]);
       if (jsonValue != null) {
         const parseValue = JSON.parse(jsonValue);
         if(parseValue[0]["Fajar"]){fajarcount++};
         if(parseValue[0]["Zuhar"]){zuharcount++};
         if(parseValue[0]["Asr"]){asrcount++};
         if(parseValue[0]["Maghrib"]){maghribcount++};          
         if(parseValue[0]["Isha"]){eshacount++};          
       }
       console.log("You Fetch the data with date ",week[i]," with data ",jsonValue); 
     } catch(e) {
       console.log(e);
     }
   }
   const data = [{data:[fajarcount,zuharcount,asrcount,maghribcount,eshacount]}];
   setdataFromDb(data);
   console.log("Total: ",fajarcount," - ",zuharcount," - ",asrcount," - ",maghribcount," - ",eshacount); 

  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor:"#F87217"}}>
      <Text style={{color:"#fff", fontSize:"20"}}>Weekly Namaz Log</Text>
      <LineChart
    data={{
      labels: labelsofnamaz,
      datasets: datafromstorage
    }}
    width={Dimensions.get("window").width} 
    height={250}
    yAxisInterval={1}
    xAxisInterval={1}
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "blue",
      backgroundGradientTo: "#ffa726",
      color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 15,
      },
      propsForDots: {
        r: "6",
        strokeWidth: "6",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
    }}
  />
  <View >
    <Button
    style={{padding:15,backgroundColor:'black',}}
            title="Weekly"
            color="white"
            onPress={()=> fetchDataofWeek()}
          />
    </View>
    </View>

    
  );
}

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Reports" component={Stats} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;