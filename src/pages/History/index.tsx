import { HistoryContainer, HistotyList } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistotyList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefe</td>
              <td>20 minutos</td>
              <td>2 meses</td>
              <td>Concluído</td>
            </tr>

            <tr>
              <td>Tarefe</td>
              <td>20 minutos</td>
              <td>2 meses</td>
              <td>Concluído</td>
            </tr>

            <tr>
              <td>Tarefe</td>
              <td>20 minutos</td>
              <td>2 meses</td>
              <td>Concluído</td>
            </tr>

            <tr>
              <td>Tarefe</td>
              <td>20 minutos</td>
              <td>2 meses</td>
              <td>Concluído</td>
            </tr>

            <tr>
              <td>Tarefe</td>
              <td>20 minutos</td>
              <td>2 meses</td>
              <td>Concluído</td>
            </tr>
          </tbody>
        </table>
      </HistotyList>
    </HistoryContainer>
  )
}
