import { View } from "react-native";
import { RNText } from "../ui/text";

type Props = {
    title: string;
    subtitle: string;
};

export function PrivacrySection({ title, subtitle }: Props) {
    return (
        <View
            style={{
                width: "100%",
                marginTop: 12,
            }}
        >
            <RNText variant="h3">{title}</RNText>
            <RNText variant="body" style={{ marginTop: 8 }}>
                {subtitle}
            </RNText>
        </View>
    );
}
