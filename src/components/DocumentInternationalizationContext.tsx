import {useContext} from 'react'
import {createContext} from 'react'
import {LayoutProps, useClient} from 'sanity'
import {suspend} from 'suspend-react'

import {DEFAULT_CONFIG} from '../constants'
import {PluginConfig, PluginConfigContext} from '../types'

const DocumentInternationalizationContext =
  createContext<PluginConfigContext>(DEFAULT_CONFIG)

export function useDocumentInternationalizationContext() {
  return useContext(DocumentInternationalizationContext)
}

type DocumentInternationalizationProviderProps = LayoutProps & {
  pluginConfig: Required<PluginConfig>
}

/**
 * This Provider wraps the Studio and provides the DocumentInternationalization context to document actions and components.
 */
export function DocumentInternationalizationProvider(
  props: DocumentInternationalizationProviderProps
) {
  const {pluginConfig} = props

  const client = useClient({apiVersion: pluginConfig.apiVersion})
  const supportedLanguages = Array.isArray(pluginConfig.supportedLanguages)
    ? pluginConfig.supportedLanguages
    : // eslint-disable-next-line require-await
      suspend(async () => {
        if (typeof pluginConfig.supportedLanguages === 'function') {
          return pluginConfig.supportedLanguages(client)
        }
        return pluginConfig.supportedLanguages
      }, [])

  return (
    <DocumentInternationalizationContext.Provider
      value={{...pluginConfig, supportedLanguages}}
    >
      {props.renderDefault(props)}
    </DocumentInternationalizationContext.Provider>
  )
}
