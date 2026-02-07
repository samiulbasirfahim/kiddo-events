import { formatTimeAMPM } from "@/chat/utils/time";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { memo } from "react";

type TextBubbleProps = {
    content: string;
    timestamp: Date;
    isOwnMessage: boolean;
};

export const TextBubble = memo(function TextBubble({ 
    content, 
    timestamp, 
    isOwnMessage 
}: TextBubbleProps) {
    return (
        <>
            <RNText
                style={{
                    color: isOwnMessage ? COLORS.background : COLORS.textPrimary,
                }}
            >
                {content}
            </RNText>

            <RNText
                style={{
                    color: isOwnMessage
                        ? COLORS.background + "CC"
                        : COLORS.textPrimary + "CC",
                    marginTop: 4,
                    alignSelf: isOwnMessage ? "flex-start" : "flex-end",
                }}
                variant="caption"
            >
                {formatTimeAMPM(timestamp)}
            </RNText>
        </>
    );
});
