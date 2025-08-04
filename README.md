Descripción del proyecto

Este proyecto consiste en una API REST desarrollada con Express y MySQL para gestionar frases icónicas de los personajes de la serie Los Simpson. Permite realizar operaciones CRUD completas sobre frases, además de consultar capítulos y personajes relacionados. La aplicación está preparada para conectarse a una base de datos MySQL, y devuelve las frases enriquecidas con el título del capítulo y los personajes involucrados.

Para que el servidor funcione correctamente, es necesario que el usuario configure sus propios datos de acceso a la base de datos en un archivo .env, siguiendo el formato:

env
DB_HOST=localhost
DB_USER=TU_USUARIO
DB_PASSWORD=TU_CONTRASEÑA
DB_NAME=simpsons
DB_PORT=3306