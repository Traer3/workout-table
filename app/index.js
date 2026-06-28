
import App from "../App";
import { DatabaseProvider } from "../DatabaseContext";
import { AssistantProvider } from "../StyleAssistant";

export default function Page() {
  return (
    <DatabaseProvider>
      <AssistantProvider>
        <App />
      </AssistantProvider>
    </DatabaseProvider>
  );
}


