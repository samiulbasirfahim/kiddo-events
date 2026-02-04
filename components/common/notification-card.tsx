import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { Bell, ChevronRight } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

type Props = {
    title: string;
    message: string;
    date: Date;
};

export function NotificationCard({ title, message, date }: Props) {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <View
            style={[
                sts.container,
                {
                    backgroundColor: COLORS.background + "88",
                    borderColor: COLORS.border,
                },
            ]}
        >
            <View style={sts.topRow}>
                <View style={sts.leftContent}>
                    <View
                        style={[
                            sts.iconContainer,
                            {
                                borderColor: COLORS.textSecondary,
                            },
                        ]}
                    >
                        <Bell size={24} color={COLORS.primary} />
                    </View>
                    <View style={sts.textContent}>
                        <RNText variant="bodyBold" style={sts.title}>
                            {title}
                        </RNText>
                        <RNText variant="body" style={sts.message}>
                            {message}
                        </RNText>

                        <RNText variant="caption" style={sts.time}>
                            {formatTime(date)}
                        </RNText>
                    </View>
                </View>

                <View style={sts.chevronContainer}>
                    <View style={{ flex: 1, justifyContent: "center", paddingLeft: 8 }}>
                        <ChevronRight
                            size={20}
                            color={COLORS.textSecondary}
                            strokeWidth={2}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        width: "100%",
        marginBottom: 12,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    leftContent: {
        flexDirection: "row",
        alignItems: "flex-start",
        flex: 1,
        gap: 12,
    },
    iconContainer: {
        borderWidth: 1,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    textContent: {
        flex: 1,
        gap: 4,
    },
    title: {
        fontSize: 16,
    },
    message: {
        fontSize: 14,
        opacity: 0.8,
    },
    time: {
        fontSize: 12,
        color: COLORS.primary,
    },
    chevronContainer: {
        height: "100%",
    },
});
