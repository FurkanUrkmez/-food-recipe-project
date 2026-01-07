import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/recipes/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  if (!recipe) return <div style={styles.container}>Yükleniyor...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.detail}>
        {recipe.imageUrl && (
          <img src={recipe.imageUrl} alt={recipe.title} style={styles.image} />
        )}
        <h1>{recipe.title}</h1>
        <div style={styles.info}>
          <p><strong>Kategori:</strong> {recipe.category?.name}</p>
          <p><strong>Hazırlama Süresi:</strong> {recipe.prepTime} dakika</p>
          <p><strong>Ekleyen:</strong> {recipe.user?.name}</p>
        </div>
        
        <div style={styles.section}>
          <h3>Malzemeler:</h3>
          <ul>
            {recipe.ingredients?.map(ing => (
              <li key={ing.id}>{ing.name}</li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h3>Tarif:</h3>
          <p style={styles.instructions}>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  detail: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  image: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem'
  },
  info: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1.5rem'
  },
  section: {
    marginBottom: '1.5rem'
  },
  instructions: {
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap'
  }
};

export default RecipeDetail;