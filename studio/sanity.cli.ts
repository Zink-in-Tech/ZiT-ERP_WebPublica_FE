import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'rw0dsjio',
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {appId: 'ohfuy81ll93rrvuer7yvogd3', autoUpdates: true},
  studioHost: 'zinkerp',
})
