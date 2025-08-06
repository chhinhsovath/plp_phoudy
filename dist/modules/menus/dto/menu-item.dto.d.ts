export declare class MenuItemDto {
    id: number;
    name: string;
    url: string;
    icon?: string;
    parentId?: number;
    orderIndex?: number;
    role: string[];
    menuType: string;
    websiteId: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    children?: MenuItemDto[];
}
