import { HeaderLabel } from "@/components/common/header-label";
import { PrivacrySection } from "@/components/common/privacy-section";
import { RNLayout } from "@/components/layout/layout";
import { TERMS_CONDITION_DATA } from "@/types";
import { Stack } from "expo-router";

export default function TermsAndConditions() {
    return (
        <RNLayout includeHeaderHeight>
            <Stack.Screen
                options={{
                    title: "Terms and Conditions",
                }}
            />

            <HeaderLabel
                title={TERMS_CONDITION_DATA.title}
                description={`Effective Date: ${TERMS_CONDITION_DATA.date}`}
            />

            {TERMS_CONDITION_DATA.data.map((section, index) => (
                <PrivacrySection
                    key={index}
                    title={section.title}
                    subtitle={section.subtitle}
                />
            ))}
        </RNLayout>
    );
}
