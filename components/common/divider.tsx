import { COLORS } from "@/constant/colors";
import { ReactNode } from "react";
import { View, ViewProps } from "react-native";

type Props = {
    children?: ReactNode;
    height?: number;
} & ViewProps;

export function Divider({ children, height = 1, ...props }: Props) {
    return (
        <View
            {...props}
            style={[
                {
                    width: "100%",
                    gap: 6,
                    flexDirection: "row",
                    alignItems: "center",
                },
                props.style,
            ]}
        >
            <View
                style={{
                    flex: 1,
                    height,
                    backgroundColor: COLORS.border,
                }}
            />
            {children ? (
                <>
                    {children}
                    <View
                        style={{
                            flex: 1,
                            height,
                            backgroundColor: COLORS.border,
                        }}
                    />
                </>
            ) : null}
        </View>
    );
}
