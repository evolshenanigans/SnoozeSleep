import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  FlatList,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import useUserData from "../hooks/useUserData";
import { addChallenge, updateChallenge } from "../services/handleFirestore";
import { Challenge } from "../types/indexTypes";
import { useUserContext } from "../services/Context";
import { Link, useRouter } from "expo-router";
import { colors } from "../utils/colors";
import AddChallenge from "../AddChallenge";
import ChallengeCard from "../common components/ChallengeCard";
import { allChallenges } from "../utils/allChallenges";

const challengeList = [
  "Challenge 1",
  "Challenge 2",
  "Challenge 3",
  "Challenge 4",
  "Challenge 5",
  "Challenge 6",
  "Challenge 7",
  "Challenge 8",
  "Challenge 9",
  "Challenge 10",
];
const CurrentTab = ({ challenges, onComplete, onAdd, router }) => (
  <View style={styles.tabContent}>
    {challenges ? (
      challenges.length > 0 ? (
        challenges.map((challenge: Challenge, index: number) => (
          <TouchableOpacity key={index} onPress={() => onComplete(challenge)}>
            <Text>{challenge.challengeTitle}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.noChallengesContainer}>
          <Link href={"/(tabs)/Challenges"} style={styles.emptyContent}>
            <Text style={styles.noChallengesText}>You currently have no challenges</Text>
          </Link>
          <Pressable
            style={styles.addChallengesBtn}
            onPress={() => router.push("/AddChallenge")}
          >
            <Text>Add Challenges</Text>
          </Pressable>
        </View>
      )
    ) : (
      <Text>Loading...</Text>
    )}
    {/* <Button title="Add Challenges" onPress={onAdd} /> */}
  </View>
);

const CompletedTab = ({ completedChallenges }) => (
  <View style={styles.tabContent}>
    {completedChallenges.map((challenge: string, index: number) => (
      <Text key={index}>{challenge}</Text>
    ))}
  </View>
);

const SavedTab = () => (
  <View style={styles.tabContent}>
    {/* Show saved challenges here */}
    <Text>Saved Challenges</Text>
  </View>
);

export default function Challenges() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "current", title: "Current" },
    { key: "completed", title: "Completed" },
    { key: "saved", title: "Saved" },
    // { key: "add", title: "+" },
  ]);
  // const [challenges, setChallenges] = useState(["Challenge 1", "Challenge 2"]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const currentUser = useUserContext();
  const { challenges } = useUserData();
  const router = useRouter();

  const onComplete = (challenge) => {
    // setChallenges(challenges.filter((item) => item !== challenge));
    updateChallenge(currentUser.email, challenge.challengeTitle, { isComplete: true });
    // MP TODO: should delete challenge from the list
    setCompletedChallenges([...completedChallenges, challenge.challengeTitle]);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const onAdd = () => {
    setModalVisible(true);
  };

  const onSelectChallenge = (challenge) => {
    // setChallenges([...challenges, challenge]);
    setModalVisible(false);
    addChallenge(currentUser.email, {
      challengeTitle: challenge,
      challengeStartDate: "",
      isComplete: false,
      isCurrent: false,
      isSaved: true,
    });
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "current":
        return (
          <CurrentTab
            challenges={challenges}
            onComplete={onComplete}
            onAdd={onAdd}
            router={router}
          />
        );
      case "completed":
        return <CompletedTab completedChallenges={completedChallenges} />;
      case "saved":
        return <SavedTab />;
      case "add":
        return <AddChallenge />;
      default:
        return null;
    }
  };

  const shuffledChallenges = challengeList.sort(() => Math.random() - 0.5);
  return (
    // main render
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require("../../assets/images/challengeSplash.png")}
        style={styles.splashImage}
      />
      <Text style={styles.title}> Your Challenges</Text>
      {/* Tabs */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          // INTERNAL TAB BAR
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TabBar
              {...props}
              activeColor={colors.themePrimary}
              indicatorStyle={{
                backgroundColor: colors.themePrimary,
              }}
              labelStyle={{
                color: "white",
                padding: 0,
                margin: 0,
                textTransform: "none",
              }}
              style={{
                backgroundColor: "transparent",
                shadowColor: "transparent",
                width: "75%",
              }}
            />
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "25%",
                height: "100%",
              }}
            >
              <Link href="/AddChallenge">
                <Image
                  source={require("../../assets/images/add.png")}
                  style={{
                    tintColor: colors.themeWhite,
                    height: 20,
                    backgroundColor: "blue",
                    width: 20,
                    resizeMode: "contain",
                  }}
                />
              </Link>
            </View>
          </View>
        )}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <FlatList
            data={challengeList}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelectChallenge(item)}>
                <Text style={styles.listItem}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <View style={styles.suggestedChallengesContainer}>
        <View style={styles.suggestedHeaderContainer}>
          <Text style={styles.suggestedChallengesHeader}>Suggested Challenges</Text>
          <Text style={styles.suggestedChallengesViewAll}>View All</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.keys(allChallenges).map((challenge, index) => (
            <View key={`suggested-${index}`}>
              <ChallengeCard challenge={allChallenges[challenge]} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addChallengesBtn: {
    backgroundColor: colors.themePrimary,
    paddingVertical: 10,
    width: "100%",
    display: "flex",
    alignItems: "center",
    borderRadius: 20,
  },
  emptyContent: {
    textAlign: "center",
    paddingBottom: 20,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  noChallengesContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  noChallengesText: {
    color: colors.themeWhite,
    fontSize: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.themeBackground,
  },
  splashImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
  suggestedChallengesContainer: {
    padding: 10,
  },
  suggestedChallengesHeader: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.themeWhite,
  },
  suggestedChallengesViewAll: {
    fontSize: 12,
    textDecorationLine: "underline",
    color: colors.themeWhite,
  },
  suggestedHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingHorizontal: 20,
  },
  tabContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.themeWhite,
    paddingTop: 100,
    paddingLeft: 20,
    paddingBottom: 10,
  },
});
