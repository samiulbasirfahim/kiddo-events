import { Divider } from "@/components/common/divider";
import { SocialLogin } from "@/components/common/social-login";
import { RNLayout } from "@/components/layout/layout";
import { AppLogo } from "@/components/ui/app-logo";
import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { RNText } from "@/components/ui/text";
import { useAuthStore } from "@/stores/auth.store";
import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

export default function LoginScreen() {
    const logIn = useAuthStore((state) => state.logIn);

    const [field, setField] = useState({
        email: "",
        password: "",
    });

    return (
        <RNLayout centered includeTopInsets>
            <View style={{ height: 40 }} />
            <AppLogo />

            <View style={{ width: "100%", marginTop: 40, gap: 16 }}>
                <RNInput
                    placeholder="Enter your Email"
                    leftIcon={Mail}
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(x) => setField((prev) => ({ ...prev, email: x }))}
                    value={field.email}
                />
                <RNInput
                    leftIcon={Lock}
                    placeholder="Enter your Password"
                    secureTextEntry
                    label="Password"
                    value={field.password}
                    onChangeText={(x) => setField((prev) => ({ ...prev, password: x }))}
                />

                <RNText
                    variant="body"
                    style={{
                        alignSelf: "flex-end",
                        marginTop: 8,
                    }}
                    onPress={() => {
                        router.push("/(public)/forget-password");
                    }}
                >
                    Forgot Password?
                </RNText>

                <RNButton fullWidth onPress={logIn}>
                    Login
                </RNButton>

                <Divider style={{ marginTop: 8 }}>
                    <RNText>or continue with</RNText>
                </Divider>

                <SocialLogin />

                <RNText
                    variant="body"
                    style={{
                        textAlign: "center",
                    }}
                >
                    Don't have an account?{" "}
                    <RNText
                        variant="primary"
                        style={{ fontWeight: "600" }}
                        onPress={() => {
                            router.push("/(public)/(auth)/register");
                        }}
                    >
                        Sign Up
                    </RNText>
                </RNText>
            </View>
        </RNLayout>
    );
}
