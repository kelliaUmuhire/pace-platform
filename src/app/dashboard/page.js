// app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import ProjectCard from '@/components/projects/ProjectCard';
import ResourceCard from '@/components/resources/ResourceCard';
// import AnalyticsCard from '@/components/dashboard/AnalyticsCard';

export default function Dashboard() {
  const { data: session } = useSession();
  const { t } = useTranslation('dashboard');
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentResources, setRecentResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be separate API calls
        // For demo, using dummy data
        setRecentProjects([
            {
                id: '1',
                title: 'Research Project',
                description: 'Collaborative research on educational technology',
                startDate: '2024-01-15',
                members: [
                  { id: '1', name: 'John Doe', avatar: '/avatars/john.jpg' },
                  { id: '2', name: 'Jane Smith', avatar: '/avatars/jane.jpg' }
                ],
                lastUpdated: '2024-04-01',
                status: 'active'
              }
        ]);

        setRecentResources([
            {
                id: '1',
                title: 'Introduction to Educational Technology',
                type: 'document',
                description: 'A comprehensive guide to modern educational technology and its applications',
                uploadDate: '2024-03-15',
                author: {
                  name: 'Jane Smith',
                  avatar: '/avatars/jane.jpg',
                  role: 'Educator'
                },
                downloads: 124,
                fileSize: 2500000, // 2.5 MB
                fileType: 'pdf'
              },
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Stats for the dashboard
  const stats = [
    { name: 'Active Projects', value: '12', icon: '📊' },
    { name: 'Communities', value: '8', icon: '👥' },
    { name: 'Resources', value: '48', icon: '📚' },
    { name: 'Collaborations', value: '5', icon: '🤝' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900">
           Welcome to PACE!
          </h2>
          <p className="mt-1 text-sm text-gray-500 max-w-xl">
            Explore your personalized dashboard to stay updated on your projects, resources, and collaborations. Dive into the latest activities and make the most of your learning journey!
          </p>
        </div>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md p-3 bg-blue-500">
                  {/* Icon would go here */}
                  <div className="h-6 w-6 text-white">{stat.icon}</div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent projects section */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Projects</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Recent Projects Description</p>
          </div>
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            View All Projects
          </Link>
        </div>
        <div className="border-t border-gray-200">
          {loading ? (
            <div className="p-4 flex justify-center">
              <p>Loading...</p>
            </div>
          ) : recentProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-4">
              {recentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <p>New Project</p>
              <Link
                href="/dashboard/projects/new"
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create Project
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Resources section */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Resources</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Recent Resources Description</p>
          </div>
          <Link
            href="/dashboard/resources"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            View All Resources
          </Link>
        </div>
        <div className="border-t border-gray-200">
          {loading ? (
            <div className="p-4 flex justify-center">
              <p>Loading</p>
            </div>
          ) : recentResources.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-4">
              {recentResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <p>No resources</p>
              <Link
                href="/dashboard/resources/new"
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Uplaod resources
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}