import { usersApi } from './apis/users.api';
import { settingsApi } from './apis/settings.api';
import { distributorsApi } from './apis/distributors.api';
import { itemCategoriesApi } from './apis/item-categories.api';
import { baseItemsApi } from './apis/base-items.api';
import { compositeItemsApi } from './apis/composite-items.api';

export const db = {
    users: usersApi,
    distributors: distributorsApi,
    settings: settingsApi,
    baseItems: baseItemsApi,
    compositeItems: compositeItemsApi,
    itemCategories: itemCategoriesApi,
};
