import { ImageBackground } from "expo-image";

export default function OnboardingFirstScreen() {
    return (
        <ImageBackground
            source={require("@/assets/images/onboarding-images/onboarding-2.png")}
            contentFit="cover"
            style={{ flex: 1 }}
        />
    );
}
