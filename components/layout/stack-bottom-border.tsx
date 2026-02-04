import { COLORS } from "@/constant/colors";
import { HEADER_HEIGHT } from "@/constant/header-height";
import { Stack } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RNText } from "../ui/text";

function AppHeaderComponent(props: any) {
    const { top: safeAreaTop } = useSafeAreaInsets();

    return (
        <View
            style={{
                paddingTop: safeAreaTop,
                height: safeAreaTop + HEADER_HEIGHT,
                justifyContent: "flex-start",
                flexDirection: "row",
                backgroundColor: "transparent",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: COLORS.border,
            }}
        >
            <Pressable
                style={{
                    paddingHorizontal: 14,
                    height: HEADER_HEIGHT,
                    justifyContent: "center",
                }}
                onPress={() => {
                    props.navigation.goBack();
                }}
            >
                <ArrowLeft size={24} color={COLORS.textPrimary} />
            </Pressable>

            <RNText variant="h3">{props.options.title ?? ""}</RNText>
        </View>
    );
}

export function StackBottomBorder() {
    return (
        <Stack
            screenOptions={{
                animation: "ios_from_right",
                headerTransparent: true,
                header: AppHeaderComponent,
            }}
        />
    );
}
