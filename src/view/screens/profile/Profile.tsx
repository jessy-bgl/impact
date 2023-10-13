import { View, StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";

import transportImage from "../../../../assets/images/transport.svg";

export const Profile = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card} onPress={() => {}}>
        <Card.Title
          title="Transports"
          subtitle="3 tCO2e/an"
          left={(props: any) => <Avatar.Icon {...props} icon="car" />}
        />
        <Card.Cover
          resizeMode="contain"
          source={{ uri: transportImage }}
          style={styles.image}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  card: {
    width: "100%",
  },
  image: {
    height: 150,
  },
});
