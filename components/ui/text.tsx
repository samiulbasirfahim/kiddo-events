import { Text } from "react-native";

type Props = {
    children: string;
};

export function RNText({ children }: Props) {
    return <Text>{children}</Text>;
}
