export type Message = {
    id: string;
    type: "text" | "image" | "voice";
    content: string;
    file: string | null;
    created_at: Date;
    room: string;
    sender: string;
};
