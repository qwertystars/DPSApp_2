import { View, Text } from "react-native";
import Meal from "./Meal";
//import React from "react";

export default function MealList({ mealData }) {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {console.log(mealData + "eeee")}
      {mealData.meals.map((meal) => {
        return <Meal meal={meal} key={meal.id} />;
      })}
    </View>
  );
}
