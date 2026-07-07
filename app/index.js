
import { RealmProvider } from "../src/db/realm";
import App from "../App";
import { DatabaseProvider } from "../DatabaseContext";
import { AssistantProvider } from "../StyleAssistant";

export default function Page() {
  return (
    <RealmProvider>
      <DatabaseProvider>
        <AssistantProvider>
          <App />
        </AssistantProvider>
      </DatabaseProvider>
    </RealmProvider>
  );
}


