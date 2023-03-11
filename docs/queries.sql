--1 category

create table category(
id int primary key not null AUTO_INCREMENT,
name varchar(50) not null,
color varchar(8) not null,
system_default tinyint(1) not NULL DEFAULT 0,
uid varchar(250),
created_at datetime(3) NOT NULL DEFAULT current_timestamp(3),
updated_at datetime(3),
);

insert into category(name,color, system_default) values ('Casa','#bfc9ca',1)
insert into category(name,color, system_default) values ('Vestimenta','#f5cba7 ',1)
insert into category(name,color, system_default) values ('Carro','#f5b7b1',1)

insert into category(name,color, system_default,uid) values ('Casa','#bfc9ca',0,'')

--2 subcategory


create table sub_category(
id int primary key not null AUTO_INCREMENT,
name varchar(50) not null,
icon varchar(20) not null,
system_default tinyint(1) not NULL DEFAULT 0,
category_id int not null,
uid varchar(250),
created_at datetime(3) NOT NULL DEFAULT current_timestamp(3),
updated_at datetime(3),
CONSTRAINT `FK_sub_category_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
)


INSERT INTO sub_category(name,icon,system_default,category_id) VALUES ('Móveis','\uf4b8','1','1')
INSERT INTO sub_category(name,icon,system_default,category_id) VALUES ('Eletrodomésticos','\uf26c','1','1')
INSERT INTO sub_category(name,icon,system_default,category_id) VALUES ('Computadores','\ue4e5','1','1')

INSERT INTO sub_category(name,icon,system_default,category_id) VALUES ('Eletrônicos','\uf10b','1','2')
INSERT INTO sub_category(name,icon,system_default,category_id) VALUES ('Calçados','\uf54b','1','2')
INSERT INTO sub_category(name,icon,system_default,category_id) VALUES ('Roupas','\uf553','1','2')

INSERT INTO sub_category(name,icon,system_default,category_id) VALUES ('Utensílios','\uf553','1','3')
INSERT INTO sub_category(name,icon,system_default,category_id) VALUES ('Peças internas','\uf0ad','1','3')
INSERT INTO sub_category(name,icon,system_default,category_id) VALUES ('Peças externas','\uf1b9','1','3')

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





