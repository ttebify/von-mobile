import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "../types";

export const someArrayIncludes = (arr: any[], target: any[]) =>
  target.some((v) => arr.includes(v));

export const saveAnonymousCommenter = (obj: User) => {
  const user = JSON.stringify(obj);
  return AsyncStorage.setItem("anonymousUser", user);
};

export const getAnonymousCommenter = () => {
  return AsyncStorage.getItem("anonymousUser").then((user) => {
    if (user) {
      return JSON.parse(user) as User;
    } else {
      return null;
    }
  });
};

export const clearAnonymousCommenter = () => {
  return AsyncStorage.removeItem("anonymousUser");
};

export function arrayUnique(array: any[]) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }
  return a;
}
