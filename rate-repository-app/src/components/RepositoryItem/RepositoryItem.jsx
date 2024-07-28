import { StyleSheet, View } from "react-native";
import theme from "../Text";
import Statistics from "./Statistics";
import Header from "./Header";
const styles = StyleSheet.create({
    flexContainer: theme.flexContainer,
});

const RepositoryItem = ({repository}) => {
    return (
        <View testID="repositoryItem" style={styles.flexContainer}>
            <Header {...{repository}} />
            <Statistics {...{repository}} />
        </View>
    );
};

export default RepositoryItem;