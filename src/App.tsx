import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/theme'
import { GlobalStyle } from './styles/themes/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <h1>Hello World</h1>
    </ThemeProvider>
  )
}
