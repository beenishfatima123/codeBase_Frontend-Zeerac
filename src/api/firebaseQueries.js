import {
  collection,
  query,
  onSnapshot,
  addDoc,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import {
  setAllConversations,
  setConversationMessages,
} from "../redux/slices/chatSlice";
import { db } from "../utils/firebase";

export const getAllFirebaseUsers = (setData, existingUsers) => {
  const firebaseQuery = query(collection(db, "users"));
  const unsubscribe = onSnapshot(firebaseQuery, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      if (!existingUsers?.includes(doc?.id))
        data.push({ ...doc.data(), id: doc?.id });
    });

    setData(data);
  });
  return unsubscribe;
};
export const startConversation = async (data) => {
  await addDoc(collection(db, "conversations"), {
    users: [
      {
        name: data?.receiver?.name,
        photo: data?.receiver?.photo || "",
        email: data?.receiver?.email,
        id: data?.receiver?.id,
      },
      {
        name: `${data?.user?.first_name} ${data?.user?.last_name}`,
        photo: data?.user?.photo || "",
        email: data?.user?.email,
        id: data?.user?.firebaseDocId,
      },
    ],
    userIds: [data?.receiver?.id, data?.user?.firebaseDocId],
    lastMessage: data?.lm || "",
    lastMessageRead: false,
    lastMessageTime: new Date(),
  });
};
export const getAllConversations = (dispatch, user, setLoading) => {
  try {
    const firebaseQuery = query(
      collection(db, "conversations"),
      where("userIds", "array-contains", user)
    );
    const unsubscribe = onSnapshot(firebaseQuery, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc?.id });
      });
      data?.sort(
        (a, b) =>
          new Date(b?.lastMessageTime?.toDate()) -
          new Date(a?.lastMessageTime?.toDate())
      );
      dispatch(setAllConversations(data));
      setLoading(false);
    });
    return unsubscribe;
  } catch (error) {
    console.log("error at getAllConversations", { error });
    setLoading(false);
    return () => {};
  }
};
export const checkIfConversationExists = async (sender, receiver) => {
  const firebaseQuery = query(
    collection(db, "conversations"),
    where("userIds", "in", [[sender, receiver]])
  );
  const querySnapshot = await getDocs(firebaseQuery);
  const docData = [];
  querySnapshot.forEach((doc) => {
    docData?.push({ id: doc?.id, ...doc?.data() });
  });
  if (docData?.length > 0) return docData[0];
  else return false;
};
export const getAllConversationMessages = (
  dispatch,
  conversationId,
  setLoading
) => {
  try {
    const firebaseQuery = query(
      collection(db, "messages"),
      where("conversation", "==", conversationId),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
      firebaseQuery,
      (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc?.id });
        });
        dispatch(setConversationMessages(data));
        setLoading(false);
      },
      (error) => {
        return false;
      }
    );
    return unsubscribe;
  } catch (error) {
    setLoading(false);

    // console.log({ error });
  }
};
export const sendMessage = async (data) => {
  try {
    await addDoc(collection(db, "messages"), {
      sender: data?.sender,
      receiver: data?.receiver,
      message: data?.text,
      createdAt: serverTimestamp(),
      read: false,
      conversation: data?.conversationId,
    });
    const conversationRef = doc(db, "conversations", data?.conversationId);
    await updateDoc(conversationRef, {
      lastMessage: data?.text,
      lastMessageTime: serverTimestamp(),
      lastMessageRead: false,
      lastMessageSender: data?.sender,
    });
  } catch (error) {
    return error;
  }
};
export const markAsRead = async (id) => {
  try {
    const conversationRef = doc(db, "conversations", id);
    await updateDoc(conversationRef, {
      lastMessageRead: true,
    });
  } catch (error) {
    return error;
  }
};
