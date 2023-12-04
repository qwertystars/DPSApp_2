import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Image } from "react-native";
import { Linking } from "react-native";
//import React from "react";

export default function Meal({ meal }) {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    // fetch(
    //   "https://api.spoonacular.com/recipes/" +
    //     meal.id +
    //     "/information?apiKey=938e60394e4d435ba65fe5e8139f02f2"
    // )
    //   .then((response) => {
    //     console.log("Yes");
    //     response.json();
    //   })
    //   .then((data) => {
    //     //setImageURL(data.image);
    //     console.log(data);
    //   })
    //   .catch(() => {
    //     console.log("error");
    //   });
    setImageURL(
      "https://spoonacular.com/recipeImages/" + meal.id + "-556x370.jpg"
    );
  }, [meal.id]);

  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(meal.sourceUrl);
      }}
    >
      <View
        style={{
          paddingLeft: 5,
        }}
      >
        <View
          style={{
            height: 132,
            width: 132,
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 10,
            borderWidth: 2.8,
            borderColor: "rgba(180, 229, 255, 0.8)",
          }}
        >
          <View
            style={{
              paddingTop: 5,
              borderRadius: 10,
            }}
          >
            <Image
              style={{
                width: 120,
                height: 70,
                borderRadius: 10,
              }}
              source={{
                uri:
                  imageURL == ""
                    ? "https://i.pinimg.com/originals/90/7a/a4/907aa4bd16d66fe106478f74739ee21b.jpg"
                    : imageURL,
              }}
            />
          </View>
          <View style={{ height: 35 }}>
            <Text numberOfLines={2} style={{ color: "rgba(180, 229, 255, 1)" }}>
              {meal.title}
            </Text>
          </View>
          <Text style={{ fontSize: 11, color: "rgba(180, 229, 255, 1)" }}>
            Click for more info
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
