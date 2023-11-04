import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import { Task } from "../types/indexTypes";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { tasks } = useUserData();
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.tasksContainer}>
          {tasks ? (
            tasks.length > 0 ? (
              tasks.map((task: Task, index: number) => (
                <View key={`tasks-${index}`}>
                  <TaskCard task={task} />
                </View>
                // per card
              ))
            ) : (
              <View>
                <Image
                  source={require("../../assets/images/sadCloud.png")}
                  style={{ alignSelf: "center" }}
                />
                <Text style={styles.message}>You have no night routine tasks</Text>
              </View>
            )
          ) : (
            <Text style={styles.message}>Loading...</Text>
          )}
        </View>
        {/* end of task container */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#9174D0",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    width: 240,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  cardCol: {
    display: "flex",
    flexDirection: "column",
  },
  message: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: "gray",
  },
  tasksContainer: {
    flex: 1,
  },
});
