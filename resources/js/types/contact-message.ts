export interface ContactMessage {
    uuid: string;
    no?: number;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    created_at?: string;
}
