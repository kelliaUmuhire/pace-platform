import Link from 'next/link';
import { Calendar01Icon, UserGroupIcon, Clock01Icon } from 'hugeicons-react';

const ProjectCard = ({ project }) => {
  const { id, title, description, startDate, members, lastUpdated, status } = project;

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    archived: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 truncate">
            <Link href={`/dashboard/projects/${id}`} className="hover:text-indigo-600">
              {title}
            </Link>
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-col space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar01Icon className="h-4 w-4 mr-2" />
            <span>Started {new Date(startDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center">
            <UserGroupIcon className="h-4 w-4 mr-2" />
            <span>{members.length} members</span>
          </div>
          
          <div className="flex items-center">
            <Clock01Icon className="h-4 w-4 mr-2" />
            <span>Updated {new Date(lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {members.slice(0, 3).map((member) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                className="h-8 w-8 rounded-full border-2 border-white"
                title={member.name}
              />
            ))}
            {members.length > 3 && (
              <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-500">+{members.length - 3}</span>
              </div>
            )}
          </div>
          
          <Link
            href={`/dashboard/projects/${id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;