## Init project
```sh
$ npx create-expo-app --template   
$ npm install @react-navigation/native
$ npx expo install react-native-screens react-native-safe-area-context
$ npm install @react-navigation/native-stack
$ npm install @react-navigation/bottom-tabs

$ npm install axios
$ npx expo install @react-native-async-storage/async-storage
```
### Firebase Realtime Database rule
```json
{
  "rules": {
    ".read": "auth.uid !== null",
    ".write": "now < 1705100400000",  // 2024-1-13
  }
}
```
