import { Redirect } from "expo-router";

export default function PublicScreen() {
    return <Redirect href="/(public)/(onboarding-screens)" />;
    // return <Redirect href="/(others)/policies/help-support" />;
}
