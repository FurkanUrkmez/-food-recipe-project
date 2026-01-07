import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/recipes/user/${user.id}`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu tarifi silmek istediğinize emin misiniz?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/recipes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Tarif silindi!');
        fetchMyRecipes();
      } catch (error) {
        alert('Tarif silinemedi!');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1>Tariflerim</h1>
      {recipes.length === 0 ? (
        <p>Henüz tarif eklemediniz.</p>
      ) : (
        <div style={styles.grid}>
          {recipes.map(recipe => (
            <div key={recipe.id} style={styles.card}>
              {recipe.imageUrl && (
                <img src={recipe.imageUrl} alt={recipe.title} style={styles.image} />
              )}
              <div style={styles.cardContent}>
                <h3>{recipe.title}</h3>
                <p>Kategori: {recipe.category?.name}</p>
                <p>Hazırlama: {recipe.prepTime} dakika</p>
                <div style={styles.buttonGroup}>
                  <button 
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    style={styles.viewButton}
                  >
                    Görüntüle
                  </button>
                  <button 
                    onClick={() => handleDelete(recipe.id)}
                    style={styles.deleteButton}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
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
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem'
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default MyRecipes;