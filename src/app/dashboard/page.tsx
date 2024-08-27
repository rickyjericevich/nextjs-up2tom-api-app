import { getTomModels } from '@/lib/up2tom-api';
import DecisionOrBatchChooser from '@/app/components/DecisionOrBatchChooser';
import { Up2TomResponseType } from '@/schema/other/Enums';

export default async function Home() {
  const tomModelsResponse = await getTomModels();

  return (
    <main className="bg-gradient-to-b from-transparent to-background-end-rgb">
      {tomModelsResponse.type === Up2TomResponseType.Success ? (
        <DecisionOrBatchChooser tomModels={tomModelsResponse.data} />
      ) : (
        // TODO: Finish error handling properly
        <div>Error: Could not get UP2TOM models. Please reload the page</div>
      )}

    </main>
  )
}
