import { useMutation } from '@tanstack/react-query'
import { DatabaseIcon, Loader2Icon, ServerIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { fetchDbHealth } from '@/lib/api/dbHealth'
import { fetchHealth } from '@/lib/api/health'

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border bg-background p-6 shadow-sm">
        <h1 className="text-lg font-semibold">Connexions backend</h1>

        <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <ServerIcon className="size-5 text-muted-foreground" />
            <span className="text-sm">Serveur</span>
          </div>
          <Button size="sm" onClick={() => serverCheck.mutate()} disabled={serverCheck.isPending}>
            {serverCheck.isPending && <Loader2Icon className="animate-spin" />}
            Vérifier
          </Button>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
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
