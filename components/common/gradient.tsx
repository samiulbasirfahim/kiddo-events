import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

type Props = {
    children: ReactNode[] | ReactNode;
};
export function GradientBackground({ children }: Props) {
    return (
        <View style={sts.container}>
            <LinearGradient
                style={sts.gradient}
                colors={["#615FFF", "#4F39F6"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 0 }}
            />

            {children}
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        gap: 8,
        padding: 16,
    },
    gradient: {
        inset: 0,
        position: "absolute",
        zIndex: -1,
    },
});
