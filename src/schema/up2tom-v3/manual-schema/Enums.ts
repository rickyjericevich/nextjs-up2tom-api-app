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

export const enum StatusCode {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    UnprocessableContent = 422,
    InternalServerError = 500,
    ServiceUnavailable = 503,
}

export const enum V3_API_Pathnames {
    Models = "v3/models",
    Decision = "v3/decision",
    Batch = "v3/batch",
}