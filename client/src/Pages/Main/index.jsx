import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";

import { MachineBarChart, DateFilter } from "../../Components";
import { FilterStore, MachinesStore, StoreProvider } from "../../Stores";

import "./Main.scss";

const Main = observer(() => {
  const filterStore = useMemo(() => new FilterStore(), []);
  const machinesStore = useMemo(
    () => new MachinesStore(filterStore),
    [filterStore]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      machinesStore.fetchMachines();
    }, 20000);

    return () => clearInterval(interval);
  }, [machinesStore]);

  const { machines } = machinesStore;

  return (
    <StoreProvider stores={{ filterStore, machinesStore }}>
      <div className="mainPage">
        <div className="datePicker">
          <DateFilter />
        </div>
        <div className="machines">
          {machines.map((machine) => (
            <MachineBarChart key={machine.name} machine={machine} />
          ))}
        </div>
      </div>
    </StoreProvider>
  );
});

export default Main;
