import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

type GeofenceTaskData = {
  eventType: Location.GeofencingEventType;
  region: {
    identifier: string;
    latitude: number;
    longitude: number;
    radius: number;
  };
};

const GEOFENCING_TASK = "GEOFENCING_TASK";

TaskManager.defineTask("GEOFENCE_TASK", async ({ data   , error }) => {
  if (error) {
    console.error("Error en geofencing:", error);
    return;
  }

  const { eventType, region } = data as GeofenceTaskData;

  if (eventType === Location.GeofencingEventType.Enter) {
    console.log("Entraste al área:", region.identifier);
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("Saliste del área:", region.identifier);
  }
});

export { GEOFENCING_TASK };