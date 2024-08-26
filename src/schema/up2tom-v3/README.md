# UP2TOM API v3 Schema Files

This folder stores the schema files for the UP2TOM API v3.

In `up2tom-v3-json-schema-original.mjs`, I have stored all the JSON schema definitions as seen on the [UP2TOM website](https://docs.up2tom.com/?python#schema).

My initial intention was to use this schema to generate TypeScript types for the API responses. However, I found that the schema was not complete and had some errors, so I attempted to fix these issues using some JS code before the TS schema generation step (see `compile-json-schema-to-typescript.mjs`). This quickly became more complicated than necessary, so I ultimately decided to manually hardcode the TS definitions myself (see the `manual-schema` folder).