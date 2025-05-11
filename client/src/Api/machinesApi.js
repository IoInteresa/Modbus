import { format } from "date-fns";

import API from "./API";

const getMachines = async (dateRange) => {
  try {
    const formattedDateRange = {
      startDate: format(dateRange.startDate, "yyyy-MM-dd"),
      endDate: format(dateRange.endDate, "yyyy-MM-dd"),
    };

    const response = await API.post("/machinesStats", formattedDateRange);

    return response.data;
  } catch (error) {
    console.error("Error getting machines stats:", error)
    return [];
  }
};

export { getMachines };
