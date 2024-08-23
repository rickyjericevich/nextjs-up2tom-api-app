// This file holds the original (unmodified) json-schema for the UP2TOM API (v3), see here: https://docs.up2tom.com/#schema

export const Model = {
    "title": "Model",
    "type": "object",
    "properties": {
        "data": {
            "type": "object",
            "properties": {
                "type": "string",
                "id": "string",
                "attributes": {
                    "type": "object",
                    "properties": {
                        "name": { "type": "string" },
                        "description": { "type": "string" },
                        "publish-date": { "type": "string" },
                        "publisher": { "type": "string" },
                        "measurements": { "$ref": "/Measurements" },
                        "metadata": { "$ref": "/Metadata" },
                        "exclusions": { "$ref": "/Exclusions" }
                    },
                    "required": [
                        "name",
                        "description",
                        "publish-date",
                        "publisher",
                        "metadata",
                        "exclusions",
                        "measurements"
                    ]
                },
            },
            "required": ["type", "id", "attributes"]
        }
    },
    "required": ["data"]
}

export const Metadata = {
    "title": "Metadata",
    "type": "object",
    "properties": {
        "attributes": {
            "type": "array",
            "items": { "$ref": "#/definitions/Attribute" }
        },
        "prediction": { "$ref": "#/definitions/Attribute" }
    }
}

export const Attribute = {
    "title": "Attribute",
    "type": "object",
    "properties": {
        "type": "string",
        "name": "string",
        "question": "string",
        "domain": { "$ref": "#/definitions/Domain" }
    }
}

export const ContinuousDomain = {
    "title": "Continuous Domain",
    "type": "object",
    "properties": {
        "type": "string",
        "lower": "number",
        "upper": "number",
        "interval": "number",
        "discrete": "boolean"
    }
}

export const CategoricalDomain = {
    "title": "Categorical Domain",
    "type": "object",
    "properties": {
        "type": "string",
        "values": {
            "type": "array",
            "items": { "type": "string" }
        }
    }
}

export const Relation = {
    "title": "Relation",
    "type": "object",
    "properties": {
        "type": "string",
        "index": "integer",
        "threshold": "number"
    }
}

export const Result = {
    "title": "Class Result",
    "type": "object",
    "properties": {
        "type": "string",
        "value": "string"
    }
}

export const ValueExclusion = {
    "title": "Value Exclusion",
    "type": "object",
    "properties": {
        "type": "string",
        "antecedent": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/Relation"
            }
        },
        "consequent": {
            "type": "array",
            "items": { "$ref": "#/definitions/Relation" }
        }
    }
}

export const RelationshipExclusion = {
    "title": "Relationship Exclusion",
    "type": "object",
    "properties": {
        "type": "string",
        "relation": { "$ref": "#/definitions/Relation" }
    }
}

export const BlatantExclusion = {
    "title": "Blatant Exclusion",
    "type": "object",
    "properties": {
        "type": "string",
        "antecedent": { "$ref": "#/definitions/Relation" },
        "consequent": { "$ref": "#/definitions/Result" }
    }
}

export const Measurements = {
    "title": "Measurements",
    "type": "object",
    "properties": {
        "levers": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "index": "integer",
                    "drop": "number"
                }
            }
        }
    }
}

export const Job = {
    "title": "Job",
    "type": "object",
    "properties": {
        "filename": "string",
        "uploaded": "date",
        "size": "number",
        "progress": "number"
    }
}

export const BatchFile = {
    "title": "Batch File",
    "type": "object",
    "properties": {
        "id": "string",
        "filename": "string",
        "size": "number",
        "timestamp": "date",
        "errors": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "message": "string",
                    "value": "string"
                }
            }
        }
    }
}
