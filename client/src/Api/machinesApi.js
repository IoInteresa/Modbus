import { format } from "date-fns";

import API from "./API";

const getMachines = async (body) => {
  try {
    const { dateRange, workingType } = body;

    const requestBody = {
      dateRange: {
        startDate: format(dateRange.startDate, "yyyy-MM-dd"),
        endDate: format(dateRange.endDate, "yyyy-MM-dd"),
      },
      workingType,
    };

    const response = await API.post("/machinesStats", requestBody);

    return response.data;
  } catch (error) {
    console.error("Error getting machines stats:", error)
    return [];
  }
};

export { getMachines };
