export declare class CreateMenuItemDto {
    name: string;
    url: string;
    icon?: string;
    parentId?: number;
    orderIndex?: number;
    menuType?: string;
    websiteId: number;
    isActive?: boolean;
    roleIds?: number[];
}
