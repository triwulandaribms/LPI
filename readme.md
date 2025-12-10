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
   
Catatan untuk login menggunakan :
```bash
email:"triwulandari3456@gmail.com"
password:"triwulandari3456"
```
  
Schema databasenya :

```bash
CREATE DATABASE test_project;
USE test_project;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    PASSWORD VARCHAR(255) NOT NULL,
    ROLE ENUM('admin', 'staff') NOT NULL DEFAULT 'admin',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME NULL
);


CREATE TABLE pegawai (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    POSITION VARCHAR(100) NOT NULL,
    photo VARCHAR(255) NOT NULL,

    created_by INT NOT NULL,

    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME NULL,

    CONSTRAINT fk_pegawai_user
        FOREIGN KEY(created_by) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

