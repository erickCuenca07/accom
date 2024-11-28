Esto es una practia realizada con el framework de laravel para el back y front con el framework de react js
Se uso una base de datos relacional y la libreria de MUI para el diseño de la interfaz de usuario

El objetivo de la practica fue crear un Crud de encuestas que cada campo select que se modifique, los otros se ven afectados para asegurar que la encuesta sea consistente y no se puedan crear encuestas con campos inconsistentes.

Use la libreria de spatie-permission para hacer un poco mas facil la creacion de roles y permisos para el sistema

Una vez clonado el proyecto instalamos las dependencias de laravel con el siguiente comando 

composer install 

Las dependencias para el front se instalan con el siguiente comando

npm install

Copiamos el archivo .env con el siguiente comando

cp .env.example .env

Y se nos debe quedar un archivo tal que asi,

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE= nombre de las bd
DB_USERNAME= nombre del usuario 
DB_PASSWORD= contraseña del usuario

Generamos la clave de la aplicacion de la

php artisan key:generate

Ejecutamos las migraciones y los seeders 

php artisan migrate --seed

Compilamos los archivos del front

npm run dev

Iniciamos el servidor 

php artisan serve

El proyecto estará disponible en http://localhost:8000.