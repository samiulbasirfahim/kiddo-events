import { Pressable, StyleSheet, View } from "react-native";
import { RNText } from "../ui/text";
import { LucideIcon } from "lucide-react-native";
import { COLORS } from "@/constant/colors";

type Props = {
    title: string;
    onPress: () => void;
    icon: LucideIcon;
    iconSize?: number;
    color: string;
};

export function RNHelpButton({
    title,
    onPress,
    icon: Icon,
    color,
    iconSize = 22,
}: Props) {
    return (
        <Pressable onPress={onPress} style={sts.container}>
            <View
                style={[
                    sts.iconContainer,
                    {
                        backgroundColor: color + "20",
                    },
                ]}
            >
                <Icon size={iconSize} color={color} />
            </View>
            <RNText
                variant="bodySecondary"
                style={{
                    fontWeight: "600",
                }}
            >
                {title}
            </RNText>
        </Pressable>
    );
}

const sts = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        borderRadius: 12,
        justifyContent: "center",
        flex: 1,
        borderWidth: 1,
        aspectRatio: 1,
        borderColor: COLORS.border,
    },
    iconContainer: {
        padding: 12,
        borderRadius: 12,
    },
});
