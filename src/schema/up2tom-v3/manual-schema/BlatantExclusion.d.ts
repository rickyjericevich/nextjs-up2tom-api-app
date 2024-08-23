import { ExclusionType } from './Enums';
import Exclusion from './Exclusion';
import Relation from './Relation';
import Result from './Result';

export default interface BlatantExclusion extends Exclusion {
  type: ExclusionType.Blatant;
  antecedent: Relation;
  consequent: Result;
}