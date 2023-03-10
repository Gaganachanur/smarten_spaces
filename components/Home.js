import React, { useState ,useEffect} from "react";
import { Text, View, TextInput, StyleSheet, Button,Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
const Home = ({navigation}) => {

  const [image, setImage] = useState(null);
  const [ hasGallery, setHasGallery ] =useState(null);

  useEffect(async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("permission denied");
      }
     }
          
     (async()=>{

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          setHasGallery(status === "granted")
        

     })();
  

  }, []);


  const form = StyleSheet.create({
    inputStyle: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View style={form.centered}>
      <View style={form.inputStyle}>
        <Text> Name</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to translate!"
          // onChangeText={newText => setText(newText)}
          // defaultValue={text}
        />
      </View>
      <View style={form.inputStyle}>
        <Text> DOB</Text>
        <Button onPress={showDatepicker} title="Date Of Birth" />
        <Text>selected: {date.toLocaleString()}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
      <View style={form.inputStyle}>
        <Text> Weight</Text>
        <TextInput
          style={{ height: 40 }}
          keyboardType = 'numeric'
          placeholder="Type here to translate!"
          // onChangeText={newText => setText(newText)}
           
        />
      </View>

      <Button
        // onPress={onPressLearnMore}
        title="Submit"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      
        onPress={() =>
          navigation.navigate('ChooseImage', {})
        }
      />

    </View>
  );
};

export default Home;
