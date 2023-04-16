create table IF NOT EXISTS hotels(
	id INT NOT NULL AUTO_INCREMENT,
	name varchar(100) NOT NULL,
	description VARCHAR(1000) NOT NULL,
	address VARCHAR(100) NOT NULL,
	city VARCHAR(30) NOT NULL,
	state VARCHAR(30) NOT NULL,
	pincode VARCHAR(10) NOT NULL,
	country VARCHAR(20) NOT NULL,
	owner VARCHAR(50) NOT NULL,
	contact_no VARCHAR(20) NOT NULL,	
	price FLOAT(10) NOT NULL,
	rooms INT NOT NULL,
	beds_per_room INT NOT NULL,
	guests_per_room INT NOT NULL,
	bathrooms INT NOT NULL,
	wifi BOOLEAN NOT NULL,
	television BOOLEAN NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS hotel_images (
	hotel_id INT NOT NULL,
	url_1 VARCHAR(255) NOT NULL,
	url_2 VARCHAR(255) NOT NULL,
	url_3 VARCHAR(255) NOT NULL,
	FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);

create table IF NOT EXISTS booking(
	id INT NOT NULL auto_increment,
	user_id INT NOT NULL,
	hotel_id INT NOT NULL,
	payment_id INT NOT NULL,
	guest_name varchar(50) NOT NULL,
	guest_email varchar(50) NOT NULL,
	guest_phone varchar(50) NOT NULL,
	checkin DATE NOT NULL,
	checkout DATE NOT NULL,
	total_guests INT NOT NULL,
	total_nights INT NOT NULL,
	primary key(id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

CREATE TABLE `payments` (
  `id` varchar(40) NOT NULL,
  `checkout_id` varchar(80) NOT NULL,
  `payment_method_id` varchar(40) NOT NULL,
  `charge_id` varchar(40) NOT NULL,
  `balance_transaction` varchar(40) NOT NULL,
  `amount` float NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `postal_code` varchar(15) NOT NULL,
  `card` varchar(4) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
