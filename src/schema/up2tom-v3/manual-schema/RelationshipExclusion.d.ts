import { ExclusionType } from './Enums';
import Exclusion from './Exclusion';
import Relation from './Relation';

export default interface RelationshipExclusion extends Exclusion {
  type: ExclusionType.Relationship;
  relation: Relation;
}