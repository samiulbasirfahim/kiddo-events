import { RNText } from "@/components/ui/text";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Screen() {
    return (
        <View>
            <RNText>Welcome to the private screen!</RNText>
            <Link href={"/login"}>GO to Login Screen</Link>
        </View>
    );
}
