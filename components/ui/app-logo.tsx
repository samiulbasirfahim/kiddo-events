import { View } from "react-native";
import { RNText } from "./text";
import CALENDAR from "@/assets/svgs/calendar.svg";

export function AppLogo() {
    return (
        <View>
            <View style={{ alignItems: "center", marginBottom: 8 }}>
                <CALENDAR />
            </View>
            <RNText variant="logo">KiddoEvents</RNText>
        </View>
    );
}
