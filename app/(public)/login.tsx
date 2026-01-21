import { RNLayout } from "@/components/layout/layout";
import { AppLogo } from "@/components/ui/app-logo";
import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { RNText } from "@/components/ui/text";
import { useAuthStore } from "@/stores/auth.store";
import { Link, router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

export default function LoginScreen() {
    const logIn = useAuthStore((x) => x.logIn);

    const [field, setField] = useState({
        email: "",
        password: "",
    });

    return (
        <RNLayout centered>
            <View style={{ height: 40 }} />
            <AppLogo />

            <View style={{ width: "100%", marginTop: 40, gap: 16 }}>
                <RNInput
                    placeholder="Enter your Email"
                    leftIcon={Mail}
                    label="Email"
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

                <RNButton style={{ marginTop: 24 }} fullWidth onPress={logIn}>
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

                <Link href={"/(others)/request-location-permission"}>
                    Request Location Screen
                </Link>
            </View>
        </RNLayout>
    );
}
