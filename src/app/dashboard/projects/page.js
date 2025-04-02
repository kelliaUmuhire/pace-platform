'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProjectCard from '@/components/projects/ProjectCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { 
  Add01Icon, 
  FilterIcon, 
  Search01Icon, 
  Sorting01Icon 
} from 'hugeicons-react';

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'pending'
  });
  const [formError, setFormError] = useState('');
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        // In a real application, fetch from API
        // const response = await fetch('/api/projects');
        // const data = await response.json();
        
        // Mocked data - replace with API call
        setTimeout(() => {
          const mockProjects = [
            {
              id: '1',
              title: 'Educational Technology Research',
              description: 'Exploring the impact of technology on educational outcomes across Africa',
              startDate: '2024-01-15',
              members: [
                { id: '1', name: 'John Doe', avatar: '/placeholders/user1.jpg' },
                { id: '2', name: 'Jane Smith', avatar: '/placeholders/user2.jpg' }
              ],
              lastUpdated: '2024-03-25',
              status: 'active'
            },
            {
              id: '2',
              title: 'Cross-Cultural Learning Methods',
              description: 'Study of effective learning methods across different cultural contexts',
              startDate: '2024-02-10',
              members: [
                { id: '2', name: 'Jane Smith', avatar: '/placeholders/user2.jpg' },
                { id: '3', name: 'Michael Johnson', avatar: '/placeholders/user3.jpg' },
                { id: '4', name: 'Sarah Williams', avatar: '/placeholders/user4.jpg' }
              ],
              lastUpdated: '2024-03-20',
              status: 'pending'
            },
            {
              id: '3',
              title: 'Digital Literacy Curriculum',
              description: 'Developing a comprehensive digital literacy curriculum for schools',
              startDate: '2023-11-05',
              members: [
                { id: '1', name: 'John Doe', avatar: '/placeholders/user1.jpg' },
                { id: '3', name: 'Michael Johnson', avatar: '/placeholders/user3.jpg' },
                { id: '5', name: 'David Brown', avatar: '/placeholders/user5.jpg' },
                { id: '6', name: 'Emma Wilson', avatar: '/placeholders/user6.jpg' }
              ],
              lastUpdated: '2024-03-28',
              status: 'completed'
            }
          ];
          
          setProjects(mockProjects);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load projects');
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Filter projects based on search term and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = status === 'all' || project.status === status;
    return matchesSearch && matchesStatus;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.lastUpdated) - new Date(a.lastUpdated);
    } else if (sortBy === 'oldest') {
      return new Date(a.lastUpdated) - new Date(b.lastUpdated);
    } else if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const handleCreateProjectSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setCreateLoading(true);

    if (!newProject.title.trim()) {
      setFormError('Project title is required');
      setCreateLoading(false);
      return;
    }

    try {
      // In a real app, send POST request to API
      // const response = await fetch('/api/projects', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newProject)
      // });
      // const data = await response.json();
      
      // Simulate successful creation
      setTimeout(() => {
        // Add new project to the list with a generated ID
        const createdProject = {
          ...newProject,
          id: `${projects.length + 1}`,
          members: [],
          lastUpdated: new Date().toISOString()
        };
        
        setProjects([createdProject, ...projects]);
        setIsCreateModalOpen(false);
        setNewProject({
          title: '',
          description: '',
          startDate: new Date().toISOString().split('T')[0],
          endDate: '',
          status: 'pending'
        });
        setCreateLoading(false);
        
        // Redirect to the new project
        router.push(`/dashboard/projects/${createdProject.id}`);
      }, 1000);
    } catch (err) {
      setFormError('Failed to create project. Please try again.');
      setCreateLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage your collaborative projects and track their progress
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Add01Icon className="h-4 w-4 mr-2" />
            New Project
          </button>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search01Icon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search projects"
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FilterIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Sorting01Icon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="newest">Latest Updated</option>
                  <option value="oldest">Oldest Updated</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      ) : sortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white shadow rounded-lg">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No projects found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
          <div className="mt-6">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Add01Icon className="h-4 w-4 mr-2" />
              New Project
            </button>
          </div>
        </div>
      )}
      
      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Project</h3>
                    
                    {formError && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
                        {formError}
                      </div>
                    )}
                    
                    <form onSubmit={handleCreateProjectSubmit} className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          required
                          value={newProject.title}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows="3"
                          value={newProject.description}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                            Start Date
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            value={newProject.startDate}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                            End Date
                          </label>
                          <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            value={newProject.endDate}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          value={newProject.status}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>
                          <option value="completed">Completed</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleCreateProjectSubmit}
                  disabled={createLoading}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  {createLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                  {createLoading ? 'Creating...' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  disabled={createLoading}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}