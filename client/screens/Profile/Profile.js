import React, { useEffect, useState, useCallback } from "react";
import { API } from "../../env";
import axios from "axios";
import { Button } from "react-native-elements";
import BaseIcon from "./Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile({ navigation, setToken }) {
  const [refreshing, setRefreshing] = useState(false);
  const [saldo, setSaldo] = useState({});

  const Logout = async () => {
    try {
      await AsyncStorage.setItem("@localUser", "");
      setToken("");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };
  const getSaldo = () => {
    axios.get(`${API}/api/accounts/saldoarg?nombre=true`).then(({ data }) => {
      setSaldo(data);
      console.log(data);
    });
  };
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getSaldo();
    wait(1300).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getSaldo();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient
        // Button Linear Gradient
        colors={["#00f27c", "#384b99"]}
        start={[1, 0]}
        end={[0, 1]}
        style={styles.background}
        containerStyle={styles.scroll}
      >
        <View style={styles.container}>
          <View style={styles.saldoContainer}>
            <Text style={styles.name}>¡Hola {saldo.name?.split(" ")[0]}!</Text>
            <Text style={styles.saldo}>Saldo: ${saldo.balance}</Text>
          </View>
          <View style={styles.buttons}>
            <Button
              titleStyle={styles.listItem}
              type="clear"
              title="Estadisticas"
              onPress={() => navigation.navigate("Statistics")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{
                    backgroundColor: "#29333d",
                    marginLeft: 15,
                  }}
                  icon={{
                    type: "font-awesome",
                    name: "line-chart",
                  }}
                />
              }
            />

            <Button
              titleStyle={styles.listItem}
              title="Transacciones"
              type="clear"
              onPress={() => navigation.navigate("transacciones")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{ backgroundColor: "#29333d" }}
                  icon={{
                    type: "font-awesome",
                    name: "bank",
                  }}
                />
              }
            />
            <Button
              titleStyle={styles.listItem}
              title="Mis contactos"
              type="clear"
              onPress={() => navigation.navigate("contactsList")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{ backgroundColor: "#29333d" }}
                  icon={{
                    type: "font-awesome",
                    name: "handshake-o",
                  }}
                />
              }
            />
            <Button
              titleStyle={styles.listItem}
              title="Mis datos"
              type="clear"
              onPress={() => navigation.navigate("UserData")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{ backgroundColor: "#29333d" }}
                  icon={{
                    type: "font-awesome",
                    name: "user-circle",
                  }}
                />
              }
            />
            <Button
              titleStyle={styles.listItem}
              title="Recarga"
              type="clear"
              onPress={() => navigation.navigate("RechargeMoney")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{ backgroundColor: "#29333d" }}
                  icon={{
                    type: "font-awesome",
                    name: "google-wallet",
                  }}
                />
              }
            />
            <Button
              titleStyle={styles.listItem}
              type="clear"
              title="Enviar dinero"
              onPress={() => navigation.navigate("SelectContact")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{ backgroundColor: "#29333d" }}
                  icon={{
                    type: "font-awesome",
                    name: "money",
                  }}
                />
              }
            />
            <Button
              titleStyle={styles.listItem}
              type="clear"
              title="Sign out"
              onPress={Logout}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{ backgroundColor: "#29333d" }}
                  icon={{
                    type: "font-awesome",
                    name: "sign-out",
                  }}
                />
              }
            />
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

// export default Contact;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderWidth: 0,
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 60,
    marginTop: 70
  },
  scroll: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  saldoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    padding: 5,
    marginTop: 50,
  },
  saldo: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 30,
  },
  name: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
  },
  buttons: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 50,
  },
  listItem: {
    marginVertical: 10,
  },
  logout: {
    flexDirection: "row-reverse",
  },
  background: {
    paddingBottom: 260,
    alignItems: "center",
    flex: 1,
  },
});
