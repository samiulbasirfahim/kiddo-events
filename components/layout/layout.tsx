import { ReactNode } from "react";
import {
    KeyboardAwareScrollView,
    KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";
import {
    SafeAreaViewProps,
    SafeAreaView,
} from "react-native-safe-area-context";

type Props = {
    children: ReactNode[] | ReactNode;
    keyboardAwareScrollViewProps?: KeyboardAwareScrollViewProps;
    safeAreaProps?: SafeAreaViewProps;
};

export function RNLayout({
    children,
    keyboardAwareScrollViewProps,
    safeAreaProps,
}: Props) {
    return (
        <SafeAreaView
            {...safeAreaProps}
            style={[
                {
                    flex: 1,
                },
                safeAreaProps?.style,
            ]}
        >
            <KeyboardAwareScrollView
                {...keyboardAwareScrollViewProps}
                style={[{ flex: 1 }, keyboardAwareScrollViewProps?.style]}
                contentContainerStyle={[
                    { flexGrow: 1 },
                    keyboardAwareScrollViewProps?.contentContainerStyle,
                ]}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                {children}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
