import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchMyRecipes();
    fetchCategories();
    fetchIngredients();
  }, []);

  const fetchMyRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/recipes/user/${user.id}`);
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

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const handleEdit = (recipe) => {
    setEditingRecipe({
      id: recipe.id,
      title: recipe.title,
      instructions: recipe.instructions,
      imageUrl: recipe.imageUrl || '',
      prepTime: recipe.prepTime,
      categoryId: recipe.categoryId,
      ingredientIds: recipe.ingredients.map(ing => ing.id)
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3000/recipes/${editingRecipe.id}`,
        editingRecipe,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      alert('Tarif güncellendi!');
      setEditingRecipe(null);
      fetchMyRecipes();
    } catch (error) {
      alert('Tarif güncellenemedi!');
    }
  };

  const handleIngredientToggle = (ingredientId) => {
    const newIds = editingRecipe.ingredientIds.includes(ingredientId)
      ? editingRecipe.ingredientIds.filter(id => id !== ingredientId)
      : [...editingRecipe.ingredientIds, ingredientId];
    
    setEditingRecipe({ ...editingRecipe, ingredientIds: newIds });
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

      {editingRecipe && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Tarif Düzenle</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Tarif Adı"
                value={editingRecipe.title}
                onChange={(e) => setEditingRecipe({ ...editingRecipe, title: e.target.value })}
                style={styles.input}
                required
              />

              <select
                value={editingRecipe.categoryId}
                onChange={(e) => setEditingRecipe({ ...editingRecipe, categoryId: parseInt(e.target.value) })}
                style={styles.input}
                required
              >
                <option value="">Kategori Seçin</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Hazırlama Süresi (dakika)"
                value={editingRecipe.prepTime}
                onChange={(e) => setEditingRecipe({ ...editingRecipe, prepTime: parseInt(e.target.value) })}
                style={styles.input}
                required
              />

              <input
                type="text"
                placeholder="Görsel URL"
                value={editingRecipe.imageUrl}
                onChange={(e) => setEditingRecipe({ ...editingRecipe, imageUrl: e.target.value })}
                style={styles.input}
              />

              <textarea
                placeholder="Tarif"
                value={editingRecipe.instructions}
                onChange={(e) => setEditingRecipe({ ...editingRecipe, instructions: e.target.value })}
                style={styles.textarea}
                rows="6"
                required
              />

              <div style={styles.ingredientsSection}>
                <h4>Malzemeler:</h4>
                <div style={styles.checkboxGrid}>
                  {ingredients.map(ing => (
                    <label key={ing.id} style={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={editingRecipe.ingredientIds.includes(ing.id)}
                        onChange={() => handleIngredientToggle(ing.id)}
                      />
                      {ing.name}
                    </label>
                  ))}
                </div>
              </div>

              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.saveButton}>Kaydet</button>
                <button 
                  type="button" 
                  onClick={() => setEditingRecipe(null)}
                  style={styles.cancelButton}
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                <div style={styles.buttonGroupCard}>
                  <button 
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    style={styles.viewButton}
                  >
                    Görüntüle
                  </button>
                  <button 
                    onClick={() => handleEdit(recipe)}
                    style={styles.editButton}
                  >
                    Düzenle
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
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    overflow: 'auto',
    padding: '2rem'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto'
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
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  ingredientsSection: {
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '0.5rem',
    marginTop: '0.5rem',
    maxHeight: '200px',
    overflowY: 'auto'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer'
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem'
  },
  buttonGroupCard: {
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
  editButton: {
    flex: 1,
    backgroundColor: '#f39c12',
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
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default MyRecipes;