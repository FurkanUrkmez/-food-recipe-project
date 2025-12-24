# Food Recipe Project 🍽️

Bu proje, kullanıcıların yemek tariflerini görüntüleyebildiği ve yönetebildiği
bir **frontend + backend** web uygulamasıdır.

Frontend ve backend tarafları **TypeScript** ile geliştirilmiştir.

---

## 🚀 Kullanılan Teknolojiler

### Frontend
- React
- TypeScript
- HTML (JSX / TSX)
- CSS

### Backend
- Node.js
- TypeScript
- NestJS

> Projede bazı `.js` dosyaları yapılandırma veya yardımcı amaçlıdır.
Ana uygulama kodu TypeScript ile yazılmıştır.

---

## 📁 Proje Yapısı
# Food Recipe Project 🍽️

Bu proje, kullanıcıların yemek tariflerini görüntüleyebildiği ve yönetebildiği
bir **frontend + backend** web uygulamasıdır.

Frontend ve backend tarafları **TypeScript** ile geliştirilmiştir.

---

## 🚀 Kullanılan Teknolojiler

### Frontend
- React
- TypeScript
- HTML (JSX / TSX)
- CSS

### Backend
- Node.js
- TypeScript
- NestJS

> Projede bazı `.js` dosyaları yapılandırma veya yardımcı amaçlıdır.
Ana uygulama kodu TypeScript ile yazılmıştır.

---

## 📁 Proje Yapısıyemek-tarifi-projesi/
│
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── roles.decorator.ts
│   │   │   └── roles.guard.ts
│   │   │
│   │   ├── categories/
│   │   │   ├── categories.controller.ts
│   │   │   ├── categories.module.ts
│   │   │   └── categories.service.ts
│   │   │
│   │   ├── entities/
│   │   │   ├── category.entity.ts
│   │   │   ├── ingredient.entity.ts
│   │   │   ├── recipe.entity.ts
│   │   │   └── user.entity.ts
│   │   │
│   │   ├── ingredients/
│   │   │   ├── ingredients.controller.ts
│   │   │   ├── ingredients.module.ts
│   │   │   └── ingredients.service.ts
│   │   │
│   │   ├── recipes/
│   │   │   ├── recipes.controller.ts
│   │   │   ├── recipes.module.ts
│   │   │   └── recipes.service.ts
│   │   │
│   │   ├── users/
│   │   │   └── (boş - gerek yok)
│   │   │
│   │   ├── app.controller.spec.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── main.ts
│   │   └── seed.ts
│   │
│   ├── test/
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── .prettierrc
│   ├── database.sqlite (otomatik oluşur)
│   ├── nest-cli.json
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.build.json
│   └── tsconfig.json
│
└── frontend/
    ├── node_modules/
    ├── public/
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    │
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js
    │   │
    │   ├── pages/
    │   │   ├── AddRecipe.js
    │   │   ├── AdminPanel.js
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── MyRecipes.js
    │   │   ├── RecipeDetail.js
    │   │   └── Register.js
    │   │
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── index.css
    │   ├── index.js
    │   ├── logo.svg
    │   ├── reportWebVitals.js
    │   └── setupTests.js
    │
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── README.md

---

## ⚙️ Kurulum ve Çalıştırma

### 🔹 Projeyi Klonla
```bash
git clone https://github.com/FurkanUrkmez/food-recipe-project.git
cd food-recipe-project
cd frontend
npm install
npm start
cd backend
npm install
npm run start
npm run start:dev

👤 Geliştirici

Furkan Ürkmez


