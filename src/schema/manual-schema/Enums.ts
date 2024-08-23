export const enum AttributeType {
    Continuous = "Continuous",
    Nominal = "Nominal",
    Ordinal = "Ordinal",
}

export const enum DomainType {
    Continuous = "DomainR",
    Categorical = "DomainC",
}

export const enum ExclusionType {
    Value = 'ValueEx',
    Relationship = 'RelationshipEx',
    Blatant = 'BlatantEx',
}

export const enum RelationType {
    LTEQ = "LTEQ",
    GT = "GT",
    EQ = "EQ",
    NEQ = "NEQ",
}
