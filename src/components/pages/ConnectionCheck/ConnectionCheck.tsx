import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { fetchDbHealth } from '@/lib/api/dbHealth'
import { fetchHealth } from '@/lib/api/health'

function ConnectionCheck() {
  const serverCheck = useMutation({ mutationFn: fetchHealth })
  const dbCheck = useMutation({ mutationFn: fetchDbHealth })

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center gap-4">
        <Button onClick={() => serverCheck.mutate()} disabled={serverCheck.isPending}>
          Vérifier la connexion au serveur
        </Button>
        <span>
          {serverCheck.isPending && 'Vérification…'}
          {serverCheck.isError && 'Serveur injoignable'}
          {serverCheck.isSuccess && `Serveur OK (uptime ${Math.round(serverCheck.data.uptime)}s)`}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={() => dbCheck.mutate()} disabled={dbCheck.isPending}>
          Vérifier la connexion à la base de données
        </Button>
        <span>
          {dbCheck.isPending && 'Vérification…'}
          {dbCheck.isError && 'Base de données injoignable'}
          {dbCheck.isSuccess && dbCheck.data.status === 'ok' &&
            `Base de données OK (latence ${Math.round(dbCheck.data.latency)}ms)`}
          {dbCheck.isSuccess && dbCheck.data.status === 'down' && 'Base de données injoignable'}
        </span>
      </div>
    </div>
  )
}

export default ConnectionCheck
