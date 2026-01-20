import React, { useState } from "react";
import { View } from "react-native";
import { OtpInput, OtpInputProps } from "react-native-otp-entry";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { COLORS } from "@/constant/colors";

type Props = {
    numberOfDigits: number;
    gap?: number;
    height?: number;
    onChange: (otp: string) => void;
    style?: ViewProps["style"];
} & OtpInputProps;

export const OTPFields = ({
    numberOfDigits = 4,
    onChange,
    style,
    gap = 10,
    height = 50,
    ...props
}: Props) => {
    const [containerWidth, setContainerWidth] = useState<number>(0);

    return (
        <View
            onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setContainerWidth(width);
            }}
            style={[
                {
                    width: "100%",
                    gap: 8,
                },
                style,
            ]}
        >
            <OtpInput
                numberOfDigits={numberOfDigits}
                onTextChange={onChange}
                theme={{
                    containerStyle: {
                        justifyContent: "center",
                        gap: gap,
                        flexDirection: "row",
                    },
                    pinCodeContainerStyle: {
                        borderRadius: 8,
                        borderWidth: 1,
                        backgroundColor: COLORS.background,
                        borderColor: COLORS.textSecondary,
                        width:
                            (containerWidth - (numberOfDigits - 1) * gap) / numberOfDigits,
                        height,
                    },
                    pinCodeTextStyle: {
                        color: COLORS.textPrimary,
                        fontSize: 18,
                    },
                    focusedPinCodeContainerStyle: {
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                    },
                    focusStickStyle: {
                        backgroundColor: COLORS.primary,
                        width: 1,
                    },
                }}
                {...props}
            />
        </View>
    );
};
