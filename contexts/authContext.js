import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useContext, useEffect } from "react";
import { registerForPushNotificationsAsync } from "../service/Notification";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const loginUser = async (data) => {
    setUser(data);
    await AsyncStorage.setItem("user", JSON.stringify(data));
    await registerForPushNotificationsAsync();
    return true;
  };

  const getUser = async () => {
    const user = await JSON.parse(await AsyncStorage.getItem("user"));
    setUser(user);
    return user;
  };

  useEffect(() => {
    getUser();
  }, []);

  const logoutUser = async () => {
    setUser(null);
    AsyncStorage.clear();
  };
  const isLoggedIn = () => {
    return user?.id ? true : false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        isLoggedIn,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
