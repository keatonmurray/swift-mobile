import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  get: async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error("Storage set error:", e);
    }
  },
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("Storage remove error:", e);
    }
  },
};

export default storage;
