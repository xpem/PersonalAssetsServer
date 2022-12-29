create table item_status(
id int primary key not null AUTO_INCREMENT, name varchar(50) not null);



insert into item_status(name) values ('Guardado');
insert into item_status(name) values ('Em uso');
insert into item_status(name) values ('Emprestado');
insert into item_status(name) values ('Defeito');
insert into item_status(name) values ('Revendido');
insert into item_status(name) values ('Doado');
insert into item_status(name) values ('Dispensado');

create table acquisition_type(
id int primary key not null AUTO_INCREMENT, name varchar(50) not null);

insert into acquisition_type(name) values ('Compra');
insert into acquisition_type(name) values ('Emprestimo');
insert into acquisition_type(name) values ('Doação');
insert into acquisition_type(name) values ('Presente');

CREATE TABLE
  `itens` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `uid` varchar(250) NOT NULL,
    `name` varchar(200) NOT NULL,
    `technical_description` varchar(350) DEFAULT NULL,
    `acquisition_date` datetime NOT NULL,
    `purchase_value` decimal(10, 2) NOT NULL,
    `purchase_store` varchar(200) DEFAULT NULL,
    `resale_value` decimal(10, 2) DEFAULT NULL,
    `status_id` int(11) NOT NULL,
    `comment` varchar(350) DEFAULT NULL,
    `Image_1` varchar(500) DEFAULT NULL,
    `Image_2` varchar(500) DEFAULT NULL,
    `Image_3` varchar(500) DEFAULT NULL,
    `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `acquisition_type_id` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `FK_itens_item_status` FOREIGN KEY (`status_id`) REFERENCES `item_status` (`id`),
    CONSTRAINT `FK_itens_acquisition_type` FOREIGN KEY (`acquisition_type_id`) REFERENCES `acquisition_type` (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1





