import { COLORS } from "@/constant/colors";
import { LucideIcon, LucideProps } from "lucide-react-native";
import { View } from "react-native";

type IconContainerProps = {
    icon: LucideIcon;
    backgroundColor?: string;
    size?: number;
    radius?: number | null;
} & LucideProps;

export function IconContainer({
    icon: Icon,
    backgroundColor = COLORS.backgroundSecondary,
    size = 48,
    radius = null,
    ...props
}: IconContainerProps) {
    return (
        <View
            style={{
                width: size,
                height: size,
                borderRadius: radius !== null ? radius : size / 2,
                backgroundColor: backgroundColor,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Icon size={size * 0.6} color={COLORS.textPrimary} {...props} />
        </View>
    );
}
