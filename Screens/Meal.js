import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Image } from "react-native";
//import React from "react";

export default function Meal({ meal }) {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/recipes/" +
        meal.id +
        "/information?apiKey=938e60394e4d435ba65fe5e8139f02f2"
    )
      .then((response) => {
        console.log("Yes");
        response.json();
      })
      .then((data) => {
        //setImageURL(data.image);
        console.log(data);
      })
      .catch(() => {
        console.log("error");
      });
  }, [meal.id]);

  return (
    <TouchableOpacity>
      <View
        style={{
          height: 130,
          width: 130,
          backgroundColor: "#FFF",
        }}
      >
        {console.log(meal)}
        <Text>{meal.title}</Text>
        <Image src={imageURL} />
      </View>
    </TouchableOpacity>
  );
}
