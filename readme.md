## Lyrid Prima Indonesia

 Cara menjalankan projek :
 
  A. Projek ini terdiri dari dua file utama yaitu 
    - backend
    - frontend
  
 1. git clone repository terlebih dahulu :
    - https://github.com/triwulandaribms/TriWulandari_tes_online_PTSMS
  
 2. masuk ke folder backend
    ```bash
    cd backend
    ```
 3. install depedencies
    ```bash
      npm install
    ```
 4. buat file .env :
   ```bash
    PORT=
    DB_HOST=
    DB_USER=
    DB_PASS=
    DB_NAME=
    JWT_SECRET=
   ```
 5. lalu jalankan server :
   ```bash
    npm run dev
   ```
 6. masuk ke folder frontend
   ```bash
   cd frontend
   ```
 7. install depedencies
   ```bash
   npm install
   ```
 8. atur file .env
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```
 9.  lalu jalankan server :
   ```bash
   npm run dev
   ```
  
