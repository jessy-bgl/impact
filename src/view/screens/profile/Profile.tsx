import { View, StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

export const Profile = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card} onPress={() => {}}>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
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
});
