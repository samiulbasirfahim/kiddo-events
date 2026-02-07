export type Message = {
    id: string;
    type: "text" | "image" | "voice";
    content: string;
    file: string | null;
    created_at: Date;
    room: string;
    sender: string;
    reply: {
        id: string;
        content: string;
        type: "text" | "image" | "voice";
        file: string | null;
        sender: string;
    } | null;
};
