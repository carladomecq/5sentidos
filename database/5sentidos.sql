
USE 5sentidos;

--consulta_paciente table
CREATE TABLE consulta_paciente(   
idpaciente int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
nombre_paciente varchar(40) NOT NULL,
apellido_paciente varchar(40) NOT NULL,
telefono_paciente int NOT NULL,
email_paciente varchar(40) NOT NULL,
diagnostico_paciente varchar(50) NOT NULL,
consulta_paciente varchar(200) NOT NULL,
PRIMARY KEY (idpaciente),
); ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci