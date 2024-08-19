import React from 'react';

function ComponentCard({ component }) {
  if (!component) {
    return null; // or return a placeholder component
  }

  const ComponentToRender = component.component;

  return (
    <div className='component-card'>
      <div className='component-preview'>
        {component.websiteUrl ? (
          < embed
            src={component.websiteUrl}
            title={component.name || 'Component Preview'}
            width="100%"
            height="200"
            
          />
        ) : (
          ComponentToRender && typeof ComponentToRender === 'function' ? (
            <ComponentToRender />
          ) : (
            <div>No preview available</div>
          )
        )}
      </div>
      <h3 className='component-name'>{component.name || 'Unnamed Component'}</h3>
      <p className='component-description'>{component.description || 'No description available'}</p>
      <div className='component-meta'>
        <span className='component-author'>{component.author || 'Unknown'}</span>
        <span className='component-rating'>{component.rating || 'N/A'}</span>
      </div>
      <div className='component-price'>${component.price || '0.00'}</div>
    </div>
  );
}

export default ComponentCard;