import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/theme'
import { GlobalStyle } from './styles/themes/global'
import { Router } from './routes/Router'
import { CyclesProvider } from './contexts/cycles'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <CyclesProvider>
          <Router />
        </CyclesProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
