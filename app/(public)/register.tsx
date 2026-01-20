import { RNLayout } from "@/components/layout/layout";
import { AppLogo } from "@/components/ui/app-logo";
import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { RNText } from "@/components/ui/text";
import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { View } from "react-native";

export default function LoginScreen() {
    return (
        <RNLayout centered>
            <View style={{ height: 40 }} />
            <AppLogo />

            <View style={{ width: "100%", marginTop: 40, gap: 16 }}>
                <RNInput placeholder="Enter your Email" leftIcon={Mail} label="Email" />
                <RNInput
                    leftIcon={Lock}
                    placeholder="Enter your Password"
                    secureTextEntry
                    label="Password"
                />

                <RNButton
                    size="md"
                    style={{
                        paddingHorizontal: 0,
                        alignSelf: "flex-end",
                    }}
                    variant="link"
                    onPress={() => {
                        router.push("/(public)/forget-password");
                    }}
                >
                    Forgot Password?
                </RNButton>

                <RNButton style={{ marginTop: 24 }} fullWidth>
                    Login
                </RNButton>

                <RNText
                    variant="bodySecondary"
                    style={{
                        textAlign: "center",
                    }}
                >
                    or continue with
                </RNText>
            </View>
        </RNLayout>
    );
}
