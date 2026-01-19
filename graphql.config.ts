import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import type { IGraphQLConfig } from "graphql-config"

const config: IGraphQLConfig = {
  schema: [
    {
      "https://graphql.datocms.com": {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_DATOCMS_READONLY_API_TOKEN}`,
          "X-Exclude-Invalid": "true",
        },
      },
    },
  ],
  documents: ["./src/**/*.graphql"],
  extensions: {
    codegen: {
      generates: {
        "graphql/types/": {
          preset: "client",
          presetConfig: {
            fragmentMasking: { unmaskFunctionName: "getFragmentData" },
          },
          config: {
            // String documentMode (https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#when-to-use-a-string-documentmode) does not work with nested fragments
            // documentMode: "string",
            strictScalars: true,
            scalars: {
              BooleanType: "boolean",
              CustomData: "Record<string, unknown>",
              Date: "string",
              DateTime: "string",
              FloatType: "number",
              IntType: "number",
              ItemId: "string",
              JsonField: "unknown",
              MetaTagAttributes: "Record<string, string>",
              UploadId: "string",
            },
          },
        },
      },
    },
  },
}

export default config
