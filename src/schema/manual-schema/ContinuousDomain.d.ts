import Domain from './Domain';
import { DomainType } from './Enums';

export default interface ContinuousDomain extends Domain {
    type: DomainType.Continuous;
    lower: number;
    upper: number;
    interval: number;
    discrete: boolean;
}