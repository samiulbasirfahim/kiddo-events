import { Divider } from "@/components/common/divider";
import { SocialLogin } from "@/components/common/social-login";
import { RNLayout } from "@/components/layout/layout";
import { AppLogo } from "@/components/ui/app-logo";
import { RNButton } from "@/components/ui/button";
import { RNCheckbox } from "@/components/ui/checkbox";
import { RNInput } from "@/components/ui/input";
import { RNText } from "@/components/ui/text";
import { useAuthStore } from "@/stores/auth.store";
import { router } from "expo-router";
import { Lock, Mail, User } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

export default function RegisterScreen() {
    const logIn = useAuthStore((x) => x.logIn);

    const [checkedbox, setChekboxed] = useState(false);

    const [field, setField] = useState({
        name: "",
        email: "",
        password: "",
    });

    return (
        <RNLayout centered>
            <View style={{ height: 40 }} />
            <AppLogo />

            <View style={{ width: "100%", marginTop: 40, gap: 16 }}>
                <RNInput
                    placeholder="Enter your Name"
                    leftIcon={User}
                    label="Name"
                    autoCapitalize="words"
                    onChangeText={(x) => setField((prev) => ({ ...prev, name: x }))}
                    value={field.name}
                />

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

                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <RNCheckbox
                        value={checkedbox}
                        onChange={() => setChekboxed((x) => !x)}
                    />
                    <RNText
                        variant="body"
                        style={{
                            flexShrink: 1,
                        }}
                    >
                        I agree to the{" "}
                        <RNText
                            style={{ textDecorationLine: "underline" }}
                            onPress={() => {
                                router.push("/(others)/policies/terms-condition");
                            }}
                        >
                            Terms & Conditions
                        </RNText>{" "}
                        and{" "}
                        <RNText
                            style={{ textDecorationLine: "underline" }}
                            onPress={() => {
                                // router.push("/(others)/privacy-policy");
                            }}
                        >
                            Privacy Policy
                        </RNText>
                    </RNText>
                </View>

                <RNButton fullWidth onPress={logIn}>
                    Sign Up
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
                    Already have an account?{" "}
                    <RNText
                        variant="primary"
                        style={{ fontWeight: "600" }}
                        onPress={() => {
                            router.canGoBack()
                                ? router.back()
                                : router.push("/(public)/login");
                        }}
                    >
                        Log In
                    </RNText>
                </RNText>
            </View>
        </RNLayout>
    );
}
