import { getTomModels } from '@/app/actions';
import DecisionOrBatchChooser from '@/app/components/DecisionOrBatchChooser';

export default async function Home() {
  const tomModels = await getTomModels();

  return (
    <main className="bg-gradient-to-b from-transparent to-background-end-rgb">
      <DecisionOrBatchChooser tomModels={tomModels.data} />
    </main>
  )
}
