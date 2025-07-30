CREATE DATABASE simpsons;

USE simpsons;

CREATE TABLE `simpsons`.`frases` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `texto` VARCHAR(200) NOT NULL,
  `marca_tiempo` TIME NULL,
  `descripcion` VARCHAR(200) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `simpsons`.`personajes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45),
  `ocupacion` VARCHAR(45),
  `descripcion` VARCHAR(200) NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE `simpsons`.`personajes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45),
  `ocupacion` VARCHAR(45),
  `descripcion` VARCHAR(200) NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE `simpsons`.`capitulos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NOT NULL,
  `numero_episodio` INT NOT NULL ,
  `temporada` INT NOT NULL,
  `fecha_emision` DATE,
  PRIMARY KEY (`id`));
  
  INSERT INTO frases (texto, marca_tiempo, descripcion) VALUES
('¡Cállate, Homero!', '00:04:22', 'Frase habitual de Marge cuando Homer hace alguna tontería'),
('¡Qué cara de rata!', '00:07:50', 'Bart insultando de forma típica a un enemigo'),
('¡Comilona de donas!', NULL, 'Homer emocionado por las rosquillas'),
('¡D’oh!', '00:01:15', 'Exclamación clásica de Homer cuando comete un error'),
('¡Me aburrooo!', '00:12:30', 'Lisa cuando no encuentra algo interesante');

INSERT INTO personajes (nombre, apellido, ocupacion, descripcion) VALUES
('Homero', 'Simpson', 'Operario de planta nuclear', 'Padre de familia, amante de las rosquillas y la cerveza'),
('Marge', 'Simpson', 'Ama de casa', 'Madre de la familia, conocida por su pelo azul y su paciencia'),
('Bartolomé', 'Simpson', 'Estudiante', 'El hijo travieso y rebelde'),
('Lisa', 'Simpson', 'Estudiante', 'Hija inteligente y responsable'),
('Apu', 'Nahasapeemapetilon', 'Dueño de tienda Kwik-E-Mart', 'Dueño del supermercado local');

INSERT INTO capitulos (titulo, numero_episodio, temporada, fecha_emision, sinopsis) VALUES
('Bart, el genio', 2, 1, '1990-01-14', 'Bart intercambia exámenes y es enviado a una escuela para niños superdotados'),
('La odisea de Homero', 3, 1, '1990-01-21', 'Homero pierde su trabajo y lucha por la seguridad del pueblo'),
('Lisa la vegetariana', 5, 7, '1995-10-15', 'Lisa decide hacerse vegetariana tras visitar un zoo'),
('Marge contra el monorraíl', 12, 4, '1993-01-14', 'Springfield construye un monorraíl que acaba siendo un desastre'),
('Última salida a Springfield', 17, 4, '1993-03-11', 'Homero lidera una huelga para recuperar beneficios dentales');



