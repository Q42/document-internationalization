import type {
  FieldDefinition,
  KeyedObject,
  ObjectSchemaType,
  Reference,
  SanityClient,
  SanityDocument,
} from 'sanity'

export type Language = {
  id: Intl.UnicodeBCP47LocaleIdentifier
  title: string
}

export type SupportedLanguages =
  | Language[]
  | ((client: SanityClient) => Promise<Language[]>)

export type PluginConfig = {
  supportedLanguages: SupportedLanguages
  schemaTypes: string[]
  languageField?: string
  weakReferences?: boolean
  bulkPublish?: boolean
  metadataFields?: FieldDefinition[]
  apiVersion?: string
  onDuplicate?: ({
    document,
    language,
  }: {
    document: SanityDocument
    language: Language
    client: SanityClient
  }) => Promise<SanityDocument> | SanityDocument
}

// Context version of config
// should have processed the
// supportedLanguages function
export type PluginConfigContext = Required<PluginConfig> & {
  supportedLanguages: Language[]
}

export type TranslationReference = KeyedObject & {
  _type: 'internationalizedArrayReferenceValue'
  value: Reference
}

export type Metadata = {
  _id: string
  _createdAt: string
  translations: TranslationReference[]
}

export type DocumentInternationalizationMenuProps = {
  schemaType: ObjectSchemaType
  documentId: string
}
