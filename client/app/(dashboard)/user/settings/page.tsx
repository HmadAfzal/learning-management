import SharedNotificationSettings from "@/components/dashboard/shared-notifications-settings";
import React from "react";

const UserSettings = () => {
  return (
    <div className="w-3/5">
      <SharedNotificationSettings
        title="User Settings"
        subtitle="Manage your user notification settings"
      />
    </div>
  );
};

export default UserSettings;