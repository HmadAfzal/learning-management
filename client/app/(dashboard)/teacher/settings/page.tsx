import SharedNotificationSettings from "@/components/dashboard/shared-notifications-settings";
import React from "react";

const TeachesSettings = () => {
  return (
    <div className="w-3/5">
      <SharedNotificationSettings
        title="Teacher Settings"
        subtitle="Manage your teacher notification settings"
      />
    </div>
  );
};

export default TeachesSettings;