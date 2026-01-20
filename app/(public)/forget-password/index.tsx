import { RNLayout } from "@/components/layout/layout";
import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { RNText } from "@/components/ui/text";
import { Link, router, Stack } from "expo-router";
import { Mail } from "lucide-react-native";
import { useMemo, useState } from "react";

export default function Screen() {
    const [email, setEmail] = useState<string>("");

    const disableSendOtp = useMemo(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(email);
    }, [email]);

    return (
        <RNLayout shouldntHaveTopInsets>
            <Stack.Screen options={{ title: "Forgot Password" }} />
            <RNText variant="h2">Forgot Password?</RNText>
            <RNText variant="bodySecondary" style={{ marginTop: 8 }}>
                Don't worry! It happens. Please enter the email address associated with
                your account.
            </RNText>

            <RNInput
                label="Email"
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your Email"
                marginTop={24}
                leftIcon={Mail}
                value={email}
            />

            <RNButton
                style={{ marginTop: 32 }}
                fullWidth
                disabled={disableSendOtp}
                onPress={() => {
                    router.push({
                        pathname: "/(public)/forget-password/otp-entry",
                        params: {
                            email,
                        },
                    });
                }}
            >
                Send OTP
            </RNButton>

            <RNText
                centered
                style={{
                    marginTop: 16,
                }}
            >
                Remebered your Password?
                <Link href={".."}>
                    <RNText style={{ paddingLeft: 4 }} variant="primary">
                        {" "}
                        Login
                    </RNText>
                </Link>
            </RNText>
        </RNLayout>
    );
}
