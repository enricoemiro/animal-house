import { Outlet } from 'react-router-dom';

import { SettingsHeader } from './SettingsHeader';
import { SettingsNavigation } from './SettingsNavigation';

function SettingsBase() {
  return (
    <div>
      <SettingsHeader title="Settings" />

      <div className="relative -mt-32">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <SettingsNavigation />
              </aside>

              <div className="divide-y divide-gray-200 lg:col-span-9">
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SettingsBase };
