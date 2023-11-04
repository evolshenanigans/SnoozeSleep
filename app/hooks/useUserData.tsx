import { useState, useEffect, useContext } from "react";
import { FIREBASE_DB } from "../services/FirebaseConfig";
import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import {
  Challenge,
  Task,
  User,
  UserDataResponse,
  UserNotification,
} from "../types/indexTypes";
import { UserContext, useUserContext } from "../services/Context";

const useUserData = (): UserDataResponse => {
  const [userData, setUserData] = useState<User | any>();
  const [userTasks, setUserTasks] = useState<Task[] | any>();
  const [userChallenges, setUserChallenges] = useState<Challenge[] | any>();
  const [userNotifications, setUserNotifications] = useState<Challenge[] | any>();
  const currentUser = useUserContext();
  const email = currentUser?.email;

  const db = FIREBASE_DB;

  useEffect(() => {
    /************ FETCH DATA ********************
     * initial fetch on component mount
     */
    const fetchFieldData = async () => {
      try {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("USER DATA:", docSnap.data());
          setUserData(docSnap.data() as User);
        } else {
          console.log("No such document!!");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSubcollectionData = async <T,>(
      subcollection: string
    ): Promise<T[] | undefined> => {
      /**
       * Fetches TASKS, CHALLENGES, and NOTIFICATIONS
       */
      try {
        const docRef = collection(db, "users", email, subcollection);
        const q = query(docRef);
        const querySnapshot = await getDocs(q);
        const result: T[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as T;
          result.push({
            id: doc.id,
            ...data,
          });
        });
        // subcollection === "challenges" && console.log(result);
        return result;
      } catch (error) {
        console.error(`Error getting ${subcollection}:`, error);
      }
    };

    if (email) {
      /**
       * Call initial fetches
       */
      const setData = async () => {
        fetchFieldData();
        const tasks = await fetchSubcollectionData<Task>("tasks");
        const challenges = await fetchSubcollectionData<Challenge>("challenges");
        const notifications = await fetchSubcollectionData<UserNotification>(
          "notifications"
        );
        setUserTasks(tasks);
        setUserChallenges(challenges);
        setUserNotifications(notifications);
      };
      setData();
      // console.log("USER DATA FROM HOOK", userData);

      /************ SUBSCRIPTION ********************
       * Subscription setup monitors real-time updates to data changes in Firestore
       */
      const unsubscribeFunctions: (() => void)[] = [];

      const unsubscribe: () => void = onSnapshot(doc(db, "users", email), (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.data() as User);
        } else {
          console.log("no snapshot doc available.");
        }
      });
      unsubscribeFunctions.push(unsubscribe);

      const unsubscribeSubcollections = [
        { collectionName: "tasks", setFn: setUserTasks },
        { collectionName: "challenges", setFn: setUserChallenges },
        { collectionName: "notifications", setFn: setUserNotifications },
      ];

      unsubscribeSubcollections.forEach((collectionData) => {
        const { collectionName, setFn } = collectionData;
        const unsubscribeCollection = onSnapshot(
          collection(db, "users", email, collectionName),
          (snapshot) => {
            const items: Task[] | Challenge[] | UserNotification[] = [];
            snapshot.forEach((doc) => {
              const itemData = doc.data() as Task | Challenge | UserNotification | any;
              items.push({
                id: doc.id,
                ...itemData,
              });
            });
            setFn(items as any);
          }
        );
        unsubscribeFunctions.push(unsubscribeCollection);
      });

      return () => {
        /**
         * call subscriptions
         */
        unsubscribeFunctions.forEach((fn) => {
          fn();
        });
      };
    } else {
      console.log("User with userID [", email, "] does not exist!!");
    }
  }, [db]);

  return {
    userData,
    tasks: userTasks,
    challenges: userChallenges,
    notifications: userNotifications,
  };
};

export default useUserData;
