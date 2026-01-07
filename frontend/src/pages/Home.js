import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const filteredRecipes = selectedCategory === 'all' 
    ? recipes 
    : recipes.filter(r => r.categoryId === parseInt(selectedCategory));

  return (
    <div style={styles.container}>
      <h1>Tüm Tarifler</h1>
      
      <div style={styles.filterContainer}>
        <label>Kategori: </label>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          <option value="all">Tümü</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div style={styles.grid}>
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} style={styles.card}>
            {recipe.imageUrl && (
              <img src={recipe.imageUrl} alt={recipe.title} style={styles.image} />
            )}
            <div style={styles.cardContent}>
              <h3>{recipe.title}</h3>
              <p>Kategori: {recipe.category?.name}</p>
              <p>Hazırlama: {recipe.prepTime} dakika</p>
              <p>Ekleyen: {recipe.user?.name}</p>
              <Link to={`/recipe/${recipe.id}`}>
                <button style={styles.button}>Detayları Gör</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  filterContainer: {
    marginBottom: '2rem'
  },
  select: {
    padding: '0.5rem',
    marginLeft: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  cardContent: {
    padding: '1rem'
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '0.5rem'
  }
};

export default Home;