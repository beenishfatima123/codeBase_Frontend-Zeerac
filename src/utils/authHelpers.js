import { signInWithPopup } from "firebase/auth";
import {
  linkAccountsWithDb,
  loginUserWithDb,
  registerUserWithDb,
} from "../api/authApi";
import { checkUniqueEmailExists } from "../api/dataApi";
import { setCurrentUser } from "../redux/slices/authSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getUserPreferences } from "../redux/slices/preferenceSlice";

/**
 * signInWithGoogle: Signs in the user with Google authentication provider.
 * @param {Object} auth - Firebase auth object.
 * @param {Object} provider - Google authentication provider object.
 * @param {function} navigate - Function to navigate to a different page.
 * @param {function} dispatch - Redux dispatch function.
 * @param {function} setLoading - Function to set loading state.
 */
export const signInWithGoogle = async (
  auth,
  provider,
  navigate,
  dispatch,
  setLoading
) => {
  setLoading(true);
  signInWithPopup(auth, provider)
    .then(async (result) => {
      await checkFirestoreDoc(result?.user);
      await chequeUniqueEmail(
        result?.user,
        result?.providerId,
        navigate,
        dispatch
      );
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    });
};

/**
  checkFirestoreDoc: Checks if a Firestore document exists for the user's email address and creates one if it doesn't exist.
  @param {Object} user - User object containing user details.
  */
export const checkFirestoreDoc = async (user) => {
  try {
    const docRef = doc(db, "users", user?.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return;
    } else {
      await setDoc(doc(db, "users", user?.email), {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        isOnline: true,
        conversations: [],
      });
      return;
    }
  } catch (error) {
    return;
  }
};

/** 
  chequeUniqueEmail: Checks if the user's email is unique and either registers or logs in the user based on the result.
  @param {Object} user - User object containing user details.
  @param {string} provider - Provider ID of the authentication provider.
  @param {function} navigate - Function to navigate to a different page.
  @param {function} dispatch - Redux dispatch function.
  */
const chequeUniqueEmail = async (user, provider, navigate, dispatch) => {
  const uniqueResponse = await checkUniqueEmailExists(user?.email);
  if (uniqueResponse.status) {
    // email not exist -> first register then login
    await registerUser(user, provider, navigate, dispatch);
  } else {
    // email already exist -> just login
    await loginUser(user?.email, user?.uid, provider, navigate, dispatch);
  }
};

/** 
  loginUser: Logs in the user and dispatches the current user state after successful login.
  @param {string} email - User's email address.
  @param {string} uid - User's unique ID.
  @param {string} provider - Provider ID of the authentication provider.
  @param {function} navigate - Function to navigate to a different page.
  @param {function} dispatch - Redux dispatch function.
  */
const loginUser = async (email, uid, provider, navigate, dispatch) => {
  let formData = new FormData();
  formData.append("email", email);
  formData.append("password", uid);

  const loginToDbResponse = await loginUserWithDb(formData);
  if (loginToDbResponse.success) {
    dispatch(
      setCurrentUser({ ...loginToDbResponse?.result, firebaseDocId: email })
    );
    navigate();
  } else {
    connectAccounts(email, uid, provider, navigate, dispatch);
  }
};

/* 
  registerUser: Registers the user and logs them in after successful registration.
  @param {Object} user - User object containing user details.
  @param {string} provider - Provider ID of the authentication provider.
  @param {function} navigate - Function to navigate to a different page.
  @param {function} dispatch - Redux dispatch function.
  */
const registerUser = async (user, provider, navigate, dispatch) => {
  let formData = new FormData();
  formData.append("username", user?.email);
  formData.append("email", user?.email);
  formData.append("password", user?.uid);
  formData.append("phone", user?.phoneNumber);
  formData.append("first_name", user?.displayName?.split(" ")[0]);
  formData.append("last_name", user?.displayName?.split(" ")[1]);
  formData.append("provider", provider);
  formData.append("is_company", false);

  const registerResponse = await registerUserWithDb(formData);
  if (registerResponse.status === true) {
    await loginUser(user?.email, user?.uid, provider, navigate, dispatch);
  }
};

/** 
  connectAccounts: Connects the user accounts if they are already registered with a different provider.
  @param {string} email - User's email address.
  @param {string} uid - User's unique ID.
  @param {string} provider - Provider ID of the authentication provider.
  @param {function} navigate - Function to navigate to a different page.
  @param {function} dispatch - Redux dispatch function.
  */
const connectAccounts = async (email, uid, provider, navigate, dispatch) => {
  let loginFormData = new FormData();
  loginFormData.append("email", email);
  loginFormData.append("provider", provider);
  loginFormData.append("u_uid", uid);

  const connectResponse = await linkAccountsWithDb(loginFormData);

  if (connectResponse) {
    dispatch(
      setCurrentUser({ ...connectResponse?.result, firebaseDocId: email })
    );
    dispatch(getUserPreferences({ token: connectResponse?.result?.token }));
    navigate();
  }
};
