import React from 'react';

const Card = ({ 
  children, 
  className = "", 
  title, 
  subtitle,
  icon,
  rightElement,
  dateRange,
  location
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {/* Card Header - Only rendered if title exists */}
      {(title || rightElement) && (
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            {/* Icon/Image Container */}
            {icon && (
              <div className="w-12 h-12 rounded-lg bg-pink-500 flex items-center justify-center">
                {icon}
              </div>
            )}
            
            {/* Title Section */}
            <div>
              {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>

          {/* Right Element (e.g., date, buttons) */}
          {rightElement && (
            <div className="text-right">
              {dateRange && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="9"/>
                  </svg>
                  {dateRange}
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {location}
                </div>
              )}
              {rightElement}
            </div>
          )}
        </div>
      )}

      {/* Card Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

// Usage Examples
const ExampleUsage = () => {
  return (
    <div className="space-y-6">
      {/* Basic Card */}
      <Card>
        <p>Simple card with just content</p>
      </Card>

      {/* Job Experience Card */}
      <Card
        title="Graphic Designer"
        subtitle="Dribbble Inc"
        icon={<div className="w-6 h-6 bg-white rounded-full" />}
        dateRange="Feb 2016 - Dec 2017"
        location="New York, USA"
      >
        <p className="text-gray-600">
          There are many variations of passages of Lorem Ipsum available...
        </p>
      </Card>

      {/* Profile Info Card */}
      <Card
        title="About"
        rightElement={
          <button className="flex items-center gap-2 text-blue-500">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Edit
          </button>
        }
      >
        <p className="text-gray-600">
          Profile content goes here...
        </p>
      </Card>
    </div>
  );
};

export default Card;