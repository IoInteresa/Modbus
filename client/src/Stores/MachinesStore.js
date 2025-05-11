import { action, makeObservable, observable, reaction } from "mobx";

import { getMachines } from "../Api/machinesApi";
import { formatSecondsToTime } from "../Utils";
import { TIME_UNITS } from "../Consts";

class MachinesStore {
  FilterStore;

  machines = [];

  constructor(FilterStore) {
    makeObservable(this, {
      machines: observable,

      setMachines: action,
      fetchMachines: action,
    });

    this.FilterStore = FilterStore;

    reaction(
      () => this.FilterStore.dateRange,
      () => this.fetchMachines()
    );

    this.fetchMachines();
  }

  setMachines = (machines) => {
    this.machines = machines;
  };

  fetchMachines = async () => {
    try {
      const { dateRange } = this.FilterStore;

      const machines = await getMachines(dateRange);

      this.setMachines(this.formatMachines(machines));
    } catch (error) {
      console.error("Error fetching machines:", error);
      alert("Произошла ошибка при загрузке данных");
    }
  };

  formatMachines = (machines) => {
    const unitKeys = Object.keys(TIME_UNITS);

    return machines.map((machine) => {
      const maxRawValue = Math.max(
        machine.running,
        machine.idle,
        machine.fault
      );

      const timeUnitLabel =
        unitKeys.find((key) => maxRawValue < TIME_UNITS[key] * 60) || "Дни";

      return {
        ...machine,
        timeUnitLabel,
        running: {
          raw: machine.running / TIME_UNITS[timeUnitLabel],
          formatted: formatSecondsToTime(machine.running),
        },
        idle: {
          raw: machine.idle / TIME_UNITS[timeUnitLabel],
          formatted: formatSecondsToTime(machine.idle),
        },
        fault: {
          raw: machine.fault / TIME_UNITS[timeUnitLabel],
          formatted: formatSecondsToTime(machine.fault),
        },
      };
    });
  };
}

export default MachinesStore;
