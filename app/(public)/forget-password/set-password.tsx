import { RNLayout } from "@/components/layout/layout";
import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { RNText } from "@/components/ui/text";
import { Link, Stack } from "expo-router";
import { Lock } from "lucide-react-native";
import { useMemo, useState } from "react";

export default function SetPasswordScreen() {
    const [field, setField] = useState({
        password: "",
        confirmPassword: "",
    });

    const formError = useMemo(() => {
        const errors: { password?: string; confirmPassword?: string } = {};

        if (field.password.length < 8) {
            errors.password = "Password must be at least 8 characters long.";
        } else if (!/[A-Z]/.test(field.password)) {
            errors.password = "Password must contain at least one uppercase letter.";
        }

        if (field.confirmPassword !== field.password) {
            errors.confirmPassword = "Passwords do not match.";
        }

        return errors;
    }, [field]);

    return (
        <RNLayout shouldntHaveTopInsets>
            <Stack.Screen
                options={{
                    title: "Set New Password",
                }}
            />
            <RNText variant="h2">Set New Password</RNText>
            <RNText variant="bodySecondary" style={{ marginTop: 8 }}>
                Your new password must be different from previously used passwords.
            </RNText>

            <RNInput
                label="Password"
                secureTextEntry
                placeholder="Enter your Password"
                errorMessage={
                    field.password.length > 0 ? formError.password : undefined
                }
                marginTop={24}
                leftIcon={Lock}
                onChangeText={(text) =>
                    setField((prev) => ({ ...prev, password: text }))
                }
                value={field.password}
                autoCapitalize="none"
            />

            <RNInput
                onChangeText={(text) =>
                    setField((prev) => ({ ...prev, confirmPassword: text }))
                }
                value={field.confirmPassword}
                label="Confirm Password"
                secureTextEntry
                autoCapitalize="none"
                errorMessage={
                    field.confirmPassword.length > 0
                        ? formError.confirmPassword
                        : undefined
                }
                placeholder="Enter your Password"
                marginTop={24}
                leftIcon={Lock}
            />

            <RNButton
                style={{ marginTop: 32 }}
                fullWidth
                disabled={
                    Object.keys(formError).length > 0 ||
                    field.password === "" ||
                    field.confirmPassword === ""
                }
            >
                Reset Password
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
