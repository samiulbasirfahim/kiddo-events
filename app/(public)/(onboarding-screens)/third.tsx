import { ImageBackground } from "expo-image";

export default function OnboardingFirstScreen() {
    return (
        <ImageBackground
            source={require("@/assets/images/onboarding-images/onboarding-3.png")}
            contentFit="cover"
            style={{ flex: 1 }}
        />
    );
}
