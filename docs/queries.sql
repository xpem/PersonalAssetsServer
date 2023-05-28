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
icon_name varchar(100) not null,
system_default tinyint(1) not NULL DEFAULT 0,
category_id int not null,
uid varchar(250),
created_at datetime(3) NOT NULL DEFAULT current_timestamp(3),
updated_at datetime(3),
CONSTRAINT `FK_sub_category_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
)

INSERT INTO sub_category(name,icon_name,system_default,category_id) VALUES ('Móveis','Car','1','1')--'Car'
INSERT INTO sub_category(name,icon_name,system_default,category_id) VALUES ('Eletrodomésticos','Tv','1','1')--'Tv'
INSERT INTO sub_category(name,icon_name,system_default,category_id) VALUES ('Computadores','Computer','1','1')--'Computer'

INSERT INTO sub_category(name,icon_name,system_default,category_id) VALUES ('Eletrônicos','Mobile','1','2')--'Mobile'
INSERT INTO sub_category(name,icon_name,system_default,category_id) VALUES ('Calçados','ShoePrints','1','2')--'ShoePrints'
INSERT INTO sub_category(name,icon_name,system_default,category_id) VALUES ('Roupas','Tshirt','1','2')--'Tshirt'

INSERT INTO sub_category(name,icon_name,system_default,category_id) VALUES ('Utensílios','AirFreshener','1','3')--'AirFreshener'
INSERT INTO sub_category(name,icon_name,system_default,category_id) VALUES ('Peças internas','Wrench','1','3')--'Wrench'
INSERT INTO sub_category(name,icon_name,system_default,category_id) VALUES ('Peças externas','Car','1','3')--'Car'

create table item_situation(
id int primary key not null AUTO_INCREMENT,
name varchar(50) not null,
sequence int unique not NULL,
system_default tinyint(1) not NULL DEFAULT 0,
uid varchar(250),
created_at datetime(3) NOT NULL DEFAULT current_timestamp(3),
updated_at datetime(3)
);

insert into item_situation(name,sequence,system_default) values ('Em uso',1,1);
insert into item_situation(name,sequence,system_default) values ('Guardado',2,1);
insert into item_situation(name,sequence,system_default) values ('Dispensado',5,1);
insert into item_situation(name,sequence,system_default) values ('Defeito',3,1);
insert into item_situation(name,sequence,system_default) values ('Revendido',4,1);
insert into item_situation(name,sequence,system_default) values ('Emprestado',6,1);
insert into item_situation(name,sequence,system_default) values ('Doado',7,1);

create table acquisition_type(
id int primary key not null AUTO_INCREMENT,
name varchar(50) not null,
sequence int unique not NULL,
system_default tinyint(1) not NULL DEFAULT 0,
uid varchar(250),
created_at datetime(3) NOT NULL DEFAULT current_timestamp(3),
updated_at datetime(3)
);

insert into acquisition_type(name,sequence,system_default) values ('Compra',1,1);
insert into acquisition_type(name,sequence,system_default) values ('Emprestimo',2,1);
insert into acquisition_type(name,sequence,system_default) values ('Doação',3,1);
insert into acquisition_type(name,sequence,system_default) values ('Presente',4,1);

CREATE TABLE
  `item` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `uid` varchar(250) NOT NULL,
    `name` varchar(200) NOT NULL,
    `technical_description` varchar(350) DEFAULT NULL,
    `acquisition_date` datetime NOT NULL,
    `purchase_value` decimal(10, 2) NOT NULL,
    `purchase_store` varchar(200) DEFAULT NULL,
    `resale_value` decimal(10, 2) DEFAULT NULL,
    `situation_id` int(11) NOT NULL,
    `comment` varchar(350) DEFAULT NULL,
    `Image_1` varchar(500) DEFAULT NULL,
    `Image_2` varchar(500) DEFAULT NULL,
    `Image_3` varchar(500) DEFAULT NULL,
    `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `acquisition_type_id` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `FK_items_item_situation` FOREIGN KEY (`situation_id`) REFERENCES `item_situation` (`id`),
    CONSTRAINT `FK_items_acquisition_type` FOREIGN KEY (`acquisition_type_id`) REFERENCES `acquisition_type` (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1





