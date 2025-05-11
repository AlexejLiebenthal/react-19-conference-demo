import { ApiDemo } from "./api/api-demo";
import { GettingStarted } from "./getting-started";
import { Todos } from "./todos";

export function App() {
  return (
    <div className="h-dvh snap-y snap-proximity overflow-scroll">
      <div className="snap-start">
        <GettingStarted />
      </div>
      <div className="snap-start">
        <ApiDemo />
      </div>
      <div className="snap-start">
        <div className="grid grid-cols-2">
          <Todos />
          <Todos />
        </div>
      </div>
    </div>
  );
}
