import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import Meal from "./Meal";
//import React from "react";

export default function MealList({ mealData }) {
  // const [jsonData, setJsonData] = useState("");

  // useEffect(() => {
  //   setJsonData(JSON.parse(mealData));
  // });

  return (
    <View
      style={{
        paddingLeft: 0,
        paddingTop: 0,
        flexDirection: "row",
      }}
    >
      {mealData.meals.map((meal) => {
        return <Meal meal={meal} key={meal.id} />;
      })}
    </View>
  );
}
