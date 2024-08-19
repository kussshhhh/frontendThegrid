import React, {useState, useEffect} from 'react';
import ComponentCard from './ComponentCard';
import { SimpleGreeting, Counter, Timer, Greeting, TodoList } from './DemoComponents';

const URL = "https://thegrid-production.up.railway.app" ;



function ComponentGrid({ title = "React Component Showcase" }) {

  const [components, setComponents] = useState([]) ;
  const [isLoading, setIsLoading] = useState(true) ;
  const [error, setError] = useState(null) ;

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${URL}/components`);
        if (response.ok) {
          const data = await response.json();
          // Validate and sanitize the data
          const validComponents = data.filter(component => 
            component && typeof component === 'object' && component.id
          ).map(component => ({
            ...component,
            name: component.name || 'Unnamed Component',
            description: component.description || 'No description',
            author: component.author || 'Unknown',
            rating: component.rating || 'N/A',
            price: component.price || '0.00',
            // Ensure component.component is a valid React component or a string
            component: typeof component.component === 'function' ? component.component : null
          }));
          setComponents(validComponents);
        } else {
          setError('Failed to fetch components');
        }
      } catch (error) {
        setError('Error fetching components: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComponents() ;

  }, []) ;

  

  if(isLoading) return <div> Loading components...</div>
  if(error) return <div>Error:{error}</div>

  return (
    <section className='component-grid'>
      <h2 className='section-title'>{title}</h2>
      <div className='grid'>
        {components.map(component => (
          <ComponentCard key={component.id} component={component} />
        ))}
      </div>
    </section>
  );
}

export default ComponentGrid;

