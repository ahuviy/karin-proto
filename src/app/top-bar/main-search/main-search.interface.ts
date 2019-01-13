import { BaseItem, CompositeItem, Distributor } from 'server/server.interface';

export interface ItemAutocompleteOption {
    type: string;
    item: BaseItem | CompositeItem | Distributor;
}
