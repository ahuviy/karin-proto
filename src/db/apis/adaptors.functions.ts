import { getDb } from './db-internal.api';
import { baseItemsApi } from './base-items.api';
import { compositeItemsApi } from './composite-items.api';
import * as Db from 'db/db.model';
import * as server from 'server/server.interface';

export function adaptBaseItem(bi: Db.BaseItem): server.BaseItem {
    if (!bi) return null;
    return {
        id: bi.id,
        name: bi.name,
        weight: bi.weight,
        weightUnit: bi.weightUnit,
        price: bi.price,
        distributor: adaptDistributor(getDb().distributors.find(d => d.id === bi.distributorId)),
        hasCompositeItems: (bi.compositeItemIds.length > 0),
    };
}

export function adaptDistributor(d: Db.Distributor): server.Distributor {
    if (!d) return null;
    return {
        id: d.id,
        name: d.name,
    };
}

export function adaptSettings(s: Db.Settings): server.Settings {
    if (!s) return null;
    return {
        id: s.id,
        percentVat: s.percentVat,
        workCostPerHour: s.workCostPerHour,
        currency: s.currency,
    };
}

export function adaptCompositeItem(ci: Db.CompositeItem): server.CompositeItem {
    if (!ci) return null;
    return {
        id: ci.id,
        hoursOfWork: ci.hoursOfWork,
        baseItems: ci.baseItems,
    };
}

export function adaptItemCategory(ic: Db.ItemCategory): server.ItemCategory {
    if (!ic) return null;
    return {
        id: ic.id,
        name: ic.name,
        baseItems: ic.baseItemIds.map(id => baseItemsApi.getById(id)),
        compositeItems: ic.compositeItemIds.map(id => compositeItemsApi.getById(id)),
    };
}
