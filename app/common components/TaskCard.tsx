import { View, Text, Pressable, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { calculateTime } from "../services/handleTime";
import { colors } from "../utils/colors";
import { useUserContext } from "../services/Context";
import { deleteNotification, deleteTask, updateTask } from "../services/handleFirestore";
import { Task } from "../types/indexTypes";

type CardProps = {
  task: Task;
};

const TaskCard: React.FC<CardProps> = ({ task }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const currentUser = useUserContext();

  const handlePress = (taskTitle: string, changeTo: boolean) => {
    updateTask(currentUser.email, taskTitle, { isComplete: changeTo });
  };
  return (
    <Pressable
      style={[styles.card, isPressed ? styles.deleteStuff : {}]}
      onLongPress={() => {
        setIsPressed((prev) => !prev);
      }}
    >
      <View style={styles.textAndBtnRow}>
        <View style={styles.textContainer}>
          <Text style={styles.taskText}>{task.taskTitle}</Text>
          <Text style={styles.timeframeText}>
            {calculateTime({
              time: task.taskStartTime,
              leadingZero: false,
            })}{" "}
          </Text>
        </View>
        {isPressed ? (
          <Pressable
            onPress={() => {
              deleteTask(currentUser.email, task.taskTitle);
              deleteNotification(currentUser.email, task.taskTitle);
              setIsPressed(false);
            }}
          >
            <Image
              source={require("../../assets/images/trash.png")}
              style={styles.trashIcon}
            />
          </Pressable>
        ) : (
          <TouchableOpacity
            style={[
              styles.circle,
              task.isComplete ? styles.circleTrue : styles.circleFalse,
            ]}
            onPress={() => handlePress(task.taskTitle, !task.isComplete)}
          >
            {task.isComplete && (
              <Image
                source={require("../../assets/images/check.png")}
                style={styles.checkMark}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.progressBar}>
        <View style={{ width: "100%", paddingTop: 0 }}></View>
      </View>
    </Pressable>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.themeAccent4,
    padding: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  checkMark: {
    width: 25,
    height: 25,
    tintColor: colors.themeWhite,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  circleFalse: {
    borderColor: colors.themeGray,
    backgroundColor: colors.themeGray,
    color: colors.themeWhite,
  },
  circleTrue: {
    backgroundColor: colors.themeSecondary,
    borderColor: colors.themePrimary,
    color: colors.themeWhite,
  },
  deleteStuff: {
    borderColor: colors.themeRed,
    borderWidth: 2,
  },
  progressBar: {
    display: "flex",
    flexDirection: "row",
  },
  taskText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: colors.themeWhite,
  },
  textAndBtnRow: {
    display: "flex",
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    color: colors.themeWhite,
  },
  timeframeText: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.themeWhite,
  },
  trashIcon: {
    opacity: 1,
    height: 30,
    width: 30,
    marginVertical: 5,
    resizeMode: "contain",
    tintColor: colors.themeRed,
    alignSelf: "baseline",
  },
});
