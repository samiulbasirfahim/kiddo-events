import { RNLayout } from "@/components/layout/layout";
import { RNButton } from "@/components/ui/button";
import { OTPFields } from "@/components/ui/otp";
import { RNText } from "@/components/ui/text";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function OtpEntry() {
    const { email } = useLocalSearchParams<{
        email: string;
    }>();

    const [otp, setOTP] = useState("");

    return (
        <RNLayout shouldntHaveTopInsets>
            <Stack.Screen options={{ title: "Verify Code" }} />

            <RNText variant="h2">Check Your Email</RNText>
            <RNText variant="bodySecondary" style={{ marginTop: 8 }}>
                We sent a verification code to{" "}
                <RNText variant="bodyBold">{email}</RNText>. Enter the code below.
            </RNText>

            <View
                style={{
                    width: "80%",
                    alignSelf: "center",
                }}
            >
                <OTPFields
                    numberOfDigits={4}
                    style={{
                        marginTop: 24,
                    }}
                    onChange={(otp) => {
                        setOTP(otp);
                    }}
                />
            </View>
            <RNButton
                style={{ marginTop: 32 }}
                fullWidth
                disabled={otp.length < 4}
                onPress={() => {
                    router.push("/(public)/forget-password/set-password");
                }}
            >
                Verify Code
            </RNButton>

            <RNText
                centered
                style={{
                    marginTop: 16,
                }}
            >
                Didn't receive the email?
                <Link href={".."}>
                    <RNText style={{ paddingLeft: 4 }} variant="primary">
                        {" "}
                        Click to resend
                    </RNText>
                </Link>
            </RNText>
        </RNLayout>
    );
}
