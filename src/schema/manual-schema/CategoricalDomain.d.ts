import Domain from './Domain';
import { DomainType } from './Enums';

export default interface CategoricalDomain extends Domain {
    type: DomainType.Categorical;
    values: string[];
}