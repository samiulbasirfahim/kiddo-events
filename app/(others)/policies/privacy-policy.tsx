import { HeaderLabel } from "@/components/common/header-label";
import { PrivacrySection } from "@/components/common/privacy-section";
import { RNLayout } from "@/components/layout/layout";
import { PRIVACY_POLICY_DATA } from "@/types";
import { Stack } from "expo-router";

export default function PrivacyPolicyScreen() {
    return (
        <RNLayout>
            <Stack.Screen options={{ title: "Privacy Policy" }} />

            <HeaderLabel
                title={PRIVACY_POLICY_DATA.title}
                description={`Last Updated: ${PRIVACY_POLICY_DATA.date}`}
            />

            {PRIVACY_POLICY_DATA.data.map((section, index) => (
                <PrivacrySection
                    key={index}
                    title={section.title}
                    subtitle={section.subtitle}
                />
            ))}
        </RNLayout>
    );
}
