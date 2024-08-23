import ScenarioAttributes from './ScenarioAttributes';

// TODO: generalize this and the Model schema

export default interface Scenario {
    type: 'scenario';
    attributes: ScenarioAttributes;
}