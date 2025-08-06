export declare class MenuItemResponseDto {
    id: number;
    name: string;
    url: string;
    icon?: string;
    parentId?: number;
    orderIndex?: number;
    menuType: string;
    websiteId: number;
    isActive: boolean;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
    children?: MenuItemResponseDto[];
}
