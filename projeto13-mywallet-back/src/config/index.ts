import { config as dotenvConfig } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Joi from 'joi';

dotenvConfig({
    path: join(
        dirname(fileURLToPath(import.meta.url)),
        '../../.env',
    ),
});

const envVarsSchema = (
    Joi
        .object()
        .keys({
            NODE_ENV: (
                Joi
                    .string()
                    .valid('production', 'development', 'test')
                    .default('development')
            ),
            PORT: (
                Joi
                    .number()
                    .default(3333)
            ),
            MONGODB_URL: (
                Joi
                    .string()
                    .required()
                    .description('Mongo DB url')
            ),
        }).unknown()
);

const { value: envVars, error } = (
    envVarsSchema
        .prefs({ errors: { label: 'key' } })
        .validate(process.env)
);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongodb_url: envVars.MONGODB_URL,
};
