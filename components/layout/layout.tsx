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
    shouldntHaveTopInsets?: boolean;
} & KeyboardAwareScrollViewProps;

export function RNLayout({ children, centered, ...props }: Props) {
    const { bottom, top } = useSafeAreaInsets();
    return (
        <KeyboardAwareScrollView
            {...props}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
                {
                    backgroundColor: COLORS.background,
                    flexGrow: 1,
                    paddingHorizontal: 16,
                    paddingTop: props.shouldntHaveTopInsets ? 16 : top + 16,
                    paddingBottom: bottom,
                    alignItems: centered ? "center" : "flex-start",
                },
                props?.contentContainerStyle,
            ]}
        >
            {children}
        </KeyboardAwareScrollView>
    );
}
