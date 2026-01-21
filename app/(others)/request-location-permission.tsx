import { RNLayout } from "@/components/layout/layout";
import LOCATION from "@/assets/svgs/location-icon.svg";
import { RNText } from "@/components/ui/text";
import { RNButton } from "@/components/ui/button";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "@/constant/colors";

export default function Screen() {
    return (
        <RNLayout centered centeredVertically>
            <View style={sts.iconContainer}>
                <LOCATION width={60} height={60} />
            </View>
            <RNText variant="h2" centered>
                Nearby Events
            </RNText>
            <RNText
                variant="bodySecondary"
                centered
                style={{
                    marginTop: 10,
                }}
            >
                See amazing kid’s events happening right in your neighborhood
            </RNText>
            <RNButton
                fullWidth
                style={{
                    marginTop: 30,
                    marginBottom: 10,
                }}
            >
                Allow Location
            </RNButton>
            <RNButton variant="outline" fullWidth>
                Skip
            </RNButton>
        </RNLayout>
    );
}

const sts = StyleSheet.create({
    iconContainer: {
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 20,
    },
});
