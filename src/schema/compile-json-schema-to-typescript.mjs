import path from 'path';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import * as OGSchema from './up2tom-v3-json-schema-original.mjs';
import { compileFromFile } from 'json-schema-to-typescript';

function manuallyModifyOGJsonSchemas(jsonFileOutputDir) {
    OGSchema.Metadata.properties.attributes.items['$ref'] = OGSchema.Metadata.properties.attributes.items['$ref'].replace('#/definitions', '');
    OGSchema.Metadata.properties.prediction['$ref'] = OGSchema.Metadata.properties.prediction['$ref'].replace('#/definitions', '');

    OGSchema.Attribute.properties.type = { "enum": ["Continuous", "Nominal", "Ordinal"] };
    OGSchema.Attribute.properties.domain['$ref'] = OGSchema.Attribute.properties.domain['$ref'].replace('#/definitions', jsonFileOutputDir) + '.json';

    OGSchema.Domain = {
        
    }

    OGSchema.ContinuousDomain.properties.type = { "const": "DomainR" };

    OGSchema.CategoricalDomain.properties.type = { "const": "DomainC" };

    OGSchema.Relation.properties.type = { "enum": ["LTEQ", "GT", "EQ", "NEQ"] };

    OGSchema.Result.properties.type = { "const": "ClassRes" };

    OGSchema.ValueExclusion.properties.type = { "const": "ValueEx" };
    OGSchema.ValueExclusion.properties.antecedent.items['$ref'] = OGSchema.ValueExclusion.properties.antecedent.items['$ref'].replace('#/definitions', '');
    OGSchema.ValueExclusion.properties.consequent.items['$ref'] = OGSchema.ValueExclusion.properties.consequent.items['$ref'].replace('#/definitions', '');

    OGSchema.RelationshipExclusion.properties.type = { "const": "RelationshipEx" };
    OGSchema.RelationshipExclusion.properties.relation['$ref'] = OGSchema.RelationshipExclusion.properties.relation['$ref'].replace('#/definitions', '');

    OGSchema.BlatantExclusion.properties.type = { "const": "BlatantEx" };
    OGSchema.BlatantExclusion.properties.antecedent['$ref'] = OGSchema.BlatantExclusion.properties.antecedent['$ref'].replace('#/definitions', '');
    OGSchema.BlatantExclusion.properties.consequent['$ref'] = OGSchema.BlatantExclusion.properties.consequent['$ref'].replace('#/definitions', '');

    OGSchema.Job.properties.progress = { "type": "number", "minimum": 0.0, "maximum": 1.0 }

    return OGSchema;
}

async function generateJSONFiles(jsonSchemaList, outputDir) {

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const fileWritePromises = jsonSchemaList.map(schema => {
        const fileName = schema.title.replace(' ', '') + '.json';
        const filePath = path.join(outputDir, fileName);
        return writeFile(filePath, JSON.stringify(schema));
    });

    await Promise.all(fileWritePromises);
}

function generateTSDeclarationFiles(jsonFileOutputDir, tsDeclarationOutputDir) {
    if (!fs.existsSync(jsonFileOutputDir)) {
        console.error("Folder containing JSON schema files not found:", jsonFileOutputDir);
        return;
    }

    if (!fs.existsSync(tsDeclarationOutputDir)) fs.mkdirSync(tsDeclarationOutputDir);

    fs.readdirSync(jsonFileOutputDir)
        .filter(fn => fn.endsWith('.json'))
        .forEach(fn => {
            const jsonFilePath = path.join(jsonFileOutputDir, fn);
            const tsFileName = fn.replace('json', '') + 'd.ts';
            const tsFilePath = path.join(tsDeclarationOutputDir, tsFileName);

            compileFromFile(jsonFilePath)
                .then(ts => writeFile(tsFilePath, ts))
                .catch(err => {
                    console.error("Error while writing TypeScript Declaration to file: ", tsFilePath);
                    console.error(err);
                });
        });
}

async function main() {
    const JSONFileOutputDir = path.join(import.meta.dirname, 'up2tom-v3-json-schemas');
    const TSDeclarationOutputDir = path.join(import.meta.dirname, 'up2tom-v3-ts-declarations');
    const jsonSchemas = manuallyModifyOGJsonSchemas(JSONFileOutputDir);
    console.log(jsonSchemas.Attribute.properties.domain);
    // await generateJSONFiles(Object.values(jsonSchemas), JSONFileOutputDir);
    // generateTSDeclarationFiles(JSONFileOutputDir, TSDeclarationOutputDir);
}

main()
