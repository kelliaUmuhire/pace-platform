import Link from 'next/link';
import { 
  DocumentAttachmentIcon, 
  Calendar01Icon, 
  UserIcon, 
  ArrowDown01Icon 
} from 'hugeicons-react';

const ResourceCard = ({ resource }) => {
  const { id, title, type, description, uploadDate, author, downloads, fileSize, fileType } = resource;

  // Map file types to appropriate icons and colors
  const typeConfig = {
    document: { color: 'bg-blue-100 text-blue-800', icon: <DocumentAttachmentIcon className="h-5 w-5" /> },
    presentation: { color: 'bg-orange-100 text-orange-800', icon: <DocumentAttachmentIcon className="h-5 w-5" /> },
    video: { color: 'bg-red-100 text-red-800', icon: <DocumentAttachmentIcon className="h-5 w-5" /> },
    audio: { color: 'bg-purple-100 text-purple-800', icon: <DocumentAttachmentIcon className="h-5 w-5" /> },
    data: { color: 'bg-green-100 text-green-800', icon: <DocumentAttachmentIcon className="h-5 w-5" /> },
    other: { color: 'bg-gray-100 text-gray-800', icon: <DocumentAttachmentIcon className="h-5 w-5" /> }
  };

  const config = typeConfig[type] || typeConfig.other;

  // Function to format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`p-2 rounded-md ${config.color} mr-3`}>
              {config.icon}
            </div>
            <h3 className="text-lg font-medium text-gray-900 truncate">
              <Link href={`/dashboard/resources/${id}`} className="hover:text-indigo-600">
                {title}
              </Link>
            </h3>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
            {fileType ? fileType.toUpperCase() : type}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-col space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar01Icon className="h-4 w-4 mr-2" />
            <span>Uploaded {new Date(uploadDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2" />
            <span>By {author.name}</span>
          </div>
          
          <div className="flex items-center">
            <ArrowDown01Icon className="h-4 w-4 mr-2" />
            <span>{downloads} downloads • {formatFileSize(fileSize)}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={author.avatar}
              alt={author.name}
              className="h-8 w-8 rounded-full"
              title={author.name}
            />
            <span className="ml-2 text-sm text-gray-500">{author.role}</span>
          </div>
          
          <div className="flex space-x-2">
            <a
              href={`/api/resources/${id}/download`}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-500 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              <ArrowDown01Icon className="h-4 w-4 mr-1" />
              Download
            </a>
            <Link
              href={`/dashboard/resources/${id}`}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 px-3 py-1.5"
            >
              View details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;