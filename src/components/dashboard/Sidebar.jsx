'use client';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Analytics01Icon, Configuration01Icon, Home01Icon, Message01Icon, ResourcesAddIcon, Setting06Icon, UserGroupIcon, WorkHistoryIcon } from 'hugeicons-react';

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const role = session?.user?.role || 'student';

  const navigation = [
    { name: 'Home', href: '/dashboard', icon: Home01Icon },
    { name: 'Projects', href: '/dashboard/projects', icon: WorkHistoryIcon },
    { name: 'Resources', href: '/dashboard/resources', icon: ResourcesAddIcon },
    { name: 'Communities', href: '/dashboard/communities', icon: UserGroupIcon },
    { name: 'Messages', href: '/dashboard/messages', icon: Message01Icon },
  ];

  // Additional navigation items based on role
  if (role === 'educator' || role === 'admin' || role === 'facilitator') {
    navigation.push(
      { name: 'Analytics', href: '/dashboard/analytics', icon: Analytics01Icon }
    );
  }

  if (role === 'admin') {
    navigation.push(
      { name: 'Administration', href: '/dashboard/admin', icon: Configuration01Icon }
    );
  }

  return (
    <div className="h-full flex flex-col border-r border-gray-200 bg-white w-64">
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center">
          <span className="text-xl font-bold text-blue-600">PACE</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 flex-shrink-0 h-6 w-6`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <Link 
          href="/dashboard/settings" 
          className={`${
            pathname === '/dashboard/settings'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
        >
          <Setting06Icon
            className={`${
              pathname === '/dashboard/settings' ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
            } mr-3 flex-shrink-0 h-6 w-6`}
            aria-hidden="true"
          />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;