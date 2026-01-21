import { COLORS } from "@/constant/colors";
import { ReactNode } from "react";
import { ScrollViewProps } from "react-native";
import {
    KeyboardAwareScrollView,
    KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";
import {
    SafeAreaView,
    SafeAreaViewProps,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

type Props = {
    children: ReactNode[] | ReactNode;
    centered?: boolean;
    centeredVertically?: boolean;
    shouldntHaveTopInsets?: boolean;
} & KeyboardAwareScrollViewProps;

export function RNLayout({
    children,
    centered,
    centeredVertically,
    ...props
}: Props) {
    const { bottom, top } = useSafeAreaInsets();
    return (
        <KeyboardAwareScrollView
            {...props}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{
                backgroundColor: COLORS.background,
            }}
            contentContainerStyle={[
                {
                    backgroundColor: COLORS.background,
                    flexGrow: 1,
                    paddingHorizontal: 16,
                    paddingTop: props.shouldntHaveTopInsets ? 16 : top + 16,
                    paddingBottom: bottom,
                    alignItems: centered ? "center" : "flex-start",
                    justifyContent: centeredVertically ? "center" : "flex-start",
                },
                props?.contentContainerStyle,
            ]}
        >
            {children}
        </KeyboardAwareScrollView>
    );
}
