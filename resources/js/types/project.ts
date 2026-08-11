export interface Project {
    id?: BigInteger;
    uuid?: string;
    title: string;
    description?: string;
    thumbnail?: string;
    url?: string;
    is_featured: boolean;
    urutan: number;
}