import { StyleSheet } from "react-native";
import { Colors } from "react-native-paper";


export default StyleSheet.create({
    loginContainer: {
      alignItems: 'center',
      marginTop: 100,
      marginHorizontal: 20,
    },
    icon: {
      width: 150,
      height: 150,
    },
    textHeader: {
      fontSize: 25,
      fontWeight: '700',
      marginTop: 10,
      marginBottom: 20,
    },
    btnLogin: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      marginVertical: 10,
    },
    navContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text2: {
      fontSize: 16,
      marginVertical: 5,
    },
    signupText: {
      textDecorationLine: 'underline',
      color: Colors.green700,
      paddingLeft: 5,
    },
  });