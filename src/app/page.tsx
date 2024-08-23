import ModelForm from "./components/ModelForm";
import { getTomModels } from "@/app/actions";

export default async function Home() {
  const tomModels= await getTomModels();
  console.log(tomModels);

  return (
    <main>
      <div>
        <ModelForm tomModels={tomModels.data} />
      </div>
    </main>
  );
}
