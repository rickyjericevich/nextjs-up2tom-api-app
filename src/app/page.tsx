import DecisionForm from "./components/DecisionForm";
import { getTomModels } from "@/app/actions";

export default async function Home() {
  const tomModels= await getTomModels();

  return <main>
      <div>
        <DecisionForm tomModels={tomModels.data} />
      </div>
    </main>
}
