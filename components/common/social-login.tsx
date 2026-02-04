import APPLE from "@/assets/svgs/apple-icon.svg";
import GOOGLE from "@/assets/svgs/google-icon.svg";
import { COLORS } from "@/constant/colors";
import { StyleSheet, View } from "react-native";
import { RNText } from "../ui/text";

export function SocialLogin() {
    return (
        <View
            style={{
                gap: 16,
            }}
        >
            <View style={sts.buttonContainer}>
                <APPLE width={32} height={32} />
                <RNText
                    style={{
                        color: COLORS.textPrimary,
                    }}
                    variant="body"
                >
                    Continue With Apple
                </RNText>
            </View>

            <View style={sts.buttonContainer}>
                <GOOGLE width={32} height={32} />
                <RNText
                    style={{
                        color: COLORS.textPrimary,
                    }}
                    variant="body"
                >
                    Continue With Google
                </RNText>
            </View>
        </View>
    );
}

const sts = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.background + "55",
    },
});
