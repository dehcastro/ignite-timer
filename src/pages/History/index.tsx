import { formatDistanceToNow } from 'date-fns'
import prBR from 'date-fns/locale/pt-BR'
import { useCycles } from '../../contexts/cycles'
import { HistoryContainer, HistotyList, Status } from './styles'

export function History() {
  const { cycles } = useCycles()

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
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: prBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}

                    {cycle.stopDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}

                    {!cycle.finishDate && !cycle.stopDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistotyList>
    </HistoryContainer>
  )
}
