package Widgets.GameWidget;

import android.app.job.JobInfo;
import android.app.job.JobScheduler;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.PersistableBundle;
import android.util.Log;

public class GameWidget extends AppWidgetProvider {



    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
      Log.d("WIDGET_DEBUG", "onUpdate ejecutado — widgets: " + appWidgetIds.length);

      for (int appWidgetId : appWidgetIds) {
        Log.d("WIDGET_DEBUG", "Scheduling job para widgetId: " + appWidgetId);
            scheduleWidgetJob(context, appWidgetId);
        }
    }

    @Override
    public void onDeleted(Context context, int[] appWidgetIds){
      if (appWidgetIds.length > 0) {
        context.stopService(new Intent(context, WidgetUpdateService.class));
      }
    }

    @Override
    public void onEnabled(Context context) {
    }

    @Override
    public void onDisabled(Context context) {
      context.stopService(new Intent(context, WidgetUpdateService.class));
    }

  private void scheduleWidgetJob(Context context, int appWidgetId) {
    JobScheduler jobScheduler =
      (JobScheduler) context.getSystemService(Context.JOB_SCHEDULER_SERVICE);
    if (jobScheduler == null) {
      Log.e("WIDGET_DEBUG", "JobScheduler es NULL");
      return;
    }

    PersistableBundle extras = new PersistableBundle();
    extras.putInt(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);

    JobInfo job = new JobInfo.Builder(
      appWidgetId,
      new ComponentName(context, WidgetUpdateService.class) // ✅ directo al service
    )
      .setExtras(extras)
      .setOverrideDeadline(0)    // ejecutar inmediatamente
      .setPersisted(false)
      .build();

    int result = jobScheduler.schedule(job);
    Log.d("WIDGET_DEBUG", "jobScheduler.schedule resultado: " +
      (result == JobScheduler.RESULT_SUCCESS ? "SUCCESS" : "FAILURE"));
  }
}
