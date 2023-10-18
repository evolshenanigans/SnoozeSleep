import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import useUserData from "../hooks/useUserData";
import { addTask, updateTask } from "../services/handleFirestore";
import { Task } from "../types/indexTypes";
import { calculateTime } from "../services/handleTime";
import { colors } from "../utils/colors";
import SleepLogMaker from "./SleepLogMaker";

const TaskList = ({ currentUser }) => {
  const { tasks } = useUserData(currentUser ? currentUser.email : null);
  const [currTask, setCurrTask] = useState<string>("abc");

  const handleAddATask = () => {
    // TODO: this is how you add a task. Change out hardcoded vals for some input form vals maybe?
    addTask(currentUser.email, {
      taskTitle: currTask,
      taskDuration: 20,
      isComplete: false,
      taskStartTime: "10 00 PM", // times must be string of HH MM AA where AA is AM or PM
      enableNotification: true,
    });
    setCurrTask((prev) => prev + "abc");
  };

  const handlePress = (taskTitle: string, changeTo: boolean) => {
    updateTask(currentUser.email, taskTitle, { isComplete: changeTo });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.tasksContainer}>
          {tasks ? (
            tasks.length > 0 ? (
              tasks.map((task: Task, index: number) => (
                <View style={styles.card} key={`tasks-${index}`}>
                  <View style={styles.textContainer}>
                    <Text style={styles.taskText}>{task.taskTitle}</Text>
                    <Text style={styles.timeframeText}>
                      {calculateTime(task.taskStartTime)} -{" "}
                      {calculateTime(task.taskStartTime, 0, task.taskDuration)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => handlePress(task.taskTitle, !task.isComplete)}
                  >
                    {/* {task.isComplete && <Text style={styles.checkMark}>✔</Text>} */}
                    {task.isComplete && (
                      <Image
                        source={require("../../assets/images/loadingStar.png")}
                        style={styles.checkMark}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.message}>You currently have no sleep tasks</Text>
            )
          ) : (
            <Text>Loading...</Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddATask}>
          <Text style={styles.buttonText}>Add a Night Routine</Text>
        </TouchableOpacity>
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
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.themeAccent4,
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  checkMark: {
    width: 25,
    height: 25,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: "gray",
  },
  taskText: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.textWhite,
  },
  tasksContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    color: colors.textWhite,
  },
  timeframeText: {
    fontSize: 14,
    color: colors.textWhite,
  },
});
