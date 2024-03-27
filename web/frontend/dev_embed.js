/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-unresolved, import/extensions, import/no-absolute-path
import RefreshRuntime from "/@react-refresh"

RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
