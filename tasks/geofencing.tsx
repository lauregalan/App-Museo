import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

const GEOFENCE_TASK = "GEOFENCE_TASK";

TaskManager.defineTask(GEOFENCE_TASK, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }

  if (data) {
    const { eventType, region } = data as any;

    if (eventType === Location.GeofencingEventType.Enter) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "¡Bienvenido al Museo!",
          body: "Disfrutá la experiencia interactiva 😊",
        },
        trigger: null, // dispara de inmediato
      });
    }
  }
});

export const geofencingTaskName = "GEOFENCE_TASK";