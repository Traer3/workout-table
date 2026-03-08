
import App from "../App";
import { AssistantProvider } from "../StyleAssistant";

export default function Page() {
  return (
    <AssistantProvider>
        <App/>
    </AssistantProvider>
  );
}


