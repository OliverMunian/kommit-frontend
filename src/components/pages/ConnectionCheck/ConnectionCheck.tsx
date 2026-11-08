import { useMutation } from '@tanstack/react-query'
import { DatabaseIcon, Loader2Icon, ServerIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { fetchDbHealth } from '@/lib/api/dbHealth'
import { fetchHealth } from '@/lib/api/health'
import { cn } from '@/lib/utils'

function ConnectionCheck() {
  const serverCheck = useMutation({
    mutationFn: fetchHealth,
    onSuccess: (data) => {
      toast.success('Serveur joignable', {
        description: `uptime ${Math.round(data.uptime)}s · ${data.timestamp}`,
      })
    },
    onError: () => {
      toast.error('Serveur injoignable')
    },
  })

  const dbCheck = useMutation({
    mutationFn: fetchDbHealth,
    onSuccess: (data) => {
      if (data.status === 'down') {
        toast.error('Base de données injoignable')
        return
      }
      toast.success('Base de données joignable', {
        description: `latence ${Math.round(data.latency)}ms`,
      })
    },
    onError: () => {
      toast.error('Base de données injoignable')
    },
  })

  const isServerReachable = serverCheck.isSuccess
  const isServerUnreachable = serverCheck.isError

  const isDbReachable = dbCheck.isSuccess && dbCheck.data.status === 'ok'
  const isDbUnreachable = dbCheck.isError || (dbCheck.isSuccess && dbCheck.data.status === 'down')

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border bg-background p-6 shadow-sm">
        <h1 className="text-lg font-semibold">Connexions backend</h1>

        <div
          className={cn(
            'flex items-center justify-between gap-4 rounded-lg border p-4',
            isServerReachable && 'bg-green-500/50',
            isServerUnreachable && 'bg-red-500/50'
          )}
        >
          <div className="flex items-center gap-3">
            <ServerIcon className="size-5 text-muted-foreground" />
            <span className="text-sm">Serveur</span>
          </div>
          <Button size="sm" onClick={() => serverCheck.mutate()} disabled={serverCheck.isPending}>
            {serverCheck.isPending && <Loader2Icon className="animate-spin" />}
            Vérifier
          </Button>
        </div>

        <div
          className={cn(
            'flex items-center justify-between gap-4 rounded-lg border p-4',
            isDbReachable && 'bg-green-500/50',
            isDbUnreachable && 'bg-red-500/50'
          )}
        >
          <div className="flex items-center gap-3">
            <DatabaseIcon className="size-5 text-muted-foreground" />
            <span className="text-sm">Base de données</span>
          </div>
          <Button size="sm" onClick={() => dbCheck.mutate()} disabled={dbCheck.isPending}>
            {dbCheck.isPending && <Loader2Icon className="animate-spin" />}
            Vérifier
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConnectionCheck
