import React, { useEffect, useState } from "react";
import { View, Text, Platform, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Constants } from "expo-constants";

const Images = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [hasGallery, setHasGallery] = useState(null);

  useEffect(async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("permission denied");
      }
    }

    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGallery(status === "granted");
    })();
  }, []);

  const PickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  if (hasGallery === false) {
    return <Text> no acess to internal storage</Text>;
  }

  const chooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      // You can use the uri property to display the image:
      const source = { uri: result.uri };
      setImage(source);
      // You can also pass the base64 string to your backend to save the image:
      const base64String = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Do whatever you need to do with the image source and base64 string.
    }
  };

  return (
    <View>
      <Button
        title="choose Image"
        style={{ flex: 1, justifycontent: "center" }}
        onPress={PickImage}
      ></Button>
      {image && (
        <View>
          <Image
            source={{ url: image }}
            style={{
              flex: 1 / 2,
            }}
          />
        </View>
      )}

      <Button title="Select Image" onPress={chooseImage} />
      {image && (
        <View>
          <Image
            source={{ url: image }}
            style={{
              width: 300,
              height: 200,
            }}
          />
        </View>
      )}

      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: "https://images.unsplash.com/photo-1678196710829-acea98264173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
        }}
        resizeMode={"cover"} // cover or contain its upto you view look
      />

      <Text> ultra</Text>
    </View>
  );
};
export default Images;
