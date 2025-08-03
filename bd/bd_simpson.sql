CREATE DATABASE simpsons;
USE simpsons;

CREATE TABLE capitulos (
  capitulos_id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(45) NOT NULL,
  numero_episodio INT NOT NULL,
  temporada INT NOT NULL,
  fecha_emision DATE,
  sinopsis VARCHAR(500),
  PRIMARY KEY (capitulos_id)
);

CREATE TABLE personajes (
  personajes_id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  apellido VARCHAR(45),
  ocupacion VARCHAR(45),
  descripcion VARCHAR(200),
  PRIMARY KEY (personajes_id)
);

CREATE TABLE frases (
  frases_id INT NOT NULL AUTO_INCREMENT,
  texto VARCHAR(200) NOT NULL,
  marca_tiempo TIME NULL,
  descripcion VARCHAR(200) NULL,
  capitulos_id INT NOT NULL,
  PRIMARY KEY (frases_id),
  CONSTRAINT fk_frases_capitulos
    FOREIGN KEY (capitulos_id) REFERENCES capitulos(capitulos_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE capitulos_has_personajes (
  capitulos_id INT NOT NULL,
  personajes_id INT NOT NULL,
  PRIMARY KEY (capitulos_id, personajes_id),
  CONSTRAINT fk_capitulos_personajes_capitulos
    FOREIGN KEY (capitulos_id) REFERENCES capitulos(capitulos_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_capitulos_personajes_personajes
    FOREIGN KEY (personajes_id) REFERENCES personajes(personajes_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO capitulos (titulo, numero_episodio, temporada, fecha_emision, sinopsis) VALUES
('Bart, el genio', 2, 1, '1990-01-14', 'Bart intercambia exámenes y es enviado a una escuela para niños superdotados'),
('La odisea de Homero', 3, 1, '1990-01-21', 'Homero pierde su trabajo y lucha por la seguridad del pueblo'),
('Lisa la vegetariana', 5, 7, '1995-10-15', 'Lisa decide hacerse vegetariana tras visitar un zoo'),
('Marge contra el monorraíl', 12, 4, '1993-01-14', 'Springfield construye un monorraíl que acaba siendo un desastre'),
('Última salida a Springfield', 17, 4, '1993-03-11', 'Homero lidera una huelga para recuperar beneficios dentales');

INSERT INTO personajes (nombre, apellido, ocupacion, descripcion) VALUES
('Homero', 'Simpson', 'Operario de planta nuclear', 'Padre de familia, amante de las rosquillas y la cerveza'),
('Marge', 'Simpson', 'Ama de casa', 'Madre de la familia, conocida por su pelo azul y su paciencia'),
('Bartolomé', 'Simpson', 'Estudiante', 'El hijo travieso y rebelde'),
('Lisa', 'Simpson', 'Estudiante', 'Hija inteligente y responsable'),
('Apu', 'Nahasapeemapetilon', 'Dueño de tienda Kwik-E-Mart', 'Dueño del supermercado local');

INSERT INTO frases (texto, marca_tiempo, descripcion, capitulos_id) VALUES
('¡Cállate, Homero!', '00:04:22', 'Frase habitual de Marge cuando Homer hace alguna tontería', 1),
('¡Qué cara de rata!', '00:07:50', 'Bart insultando de forma típica a un enemigo', 1),
('¡Comilona de donas!', NULL, 'Homer emocionado por las rosquillas', 2),
('¡D’oh!', '00:01:15', 'Exclamación clásica de Homer cuando comete un error', 2),
('¡Me aburrooo!', '00:12:30', 'Lisa cuando no encuentra algo interesante', 3);

INSERT INTO capitulos_has_personajes (capitulos_id, personajes_id) VALUES
(1, 3), -- Bart en capítulo 1
(1, 1), -- Homero en capítulo 1
(1, 2), -- Marge en capítulo 1
(2, 1), -- Homero en capítulo 2
(2, 5), -- Apu en capítulo 2
(3, 4), -- Lisa en capítulo 3
(4, 2), -- Marge en capítulo 4
(5, 1); -- Homero en capítulo 5




