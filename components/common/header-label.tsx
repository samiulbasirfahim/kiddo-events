import { View } from "react-native";
import { RNText } from "../ui/text";

type Props = {
    title: string;
    description: string;
};

export function HeaderLabel({ title, description }: Props) {
    return (
        <View>
            <RNText variant="h3">{title}</RNText>
            <RNText variant="body" style={{ marginTop: 8 }}>
                {description}
            </RNText>
        </View>
    );
}
