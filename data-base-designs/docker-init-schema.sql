CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;

CREATE TABLE IF NOT EXISTS user_parent (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    user_type TINYINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS phone (
    user_id INT NOT NULL,
    phone VARCHAR(15),
    FOREIGN KEY (user_id) REFERENCES user_parent(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_detail (
    user_id INT,
    street1 VARCHAR(255) NOT NULL,
    street2 VARCHAR(255),
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    zipcode VARCHAR(20) NOT NULL,
    is_default TINYINT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES user_parent(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS seller (
    user_id INT PRIMARY KEY,
    description TEXT,
    average_rating FLOAT DEFAULT 2.5,
    rating_count INT DEFAULT 0,
    url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_parent(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS buyer (
    user_id INT PRIMARY KEY,
    is_prime TINYINT DEFAULT 0,
    prime_expiry_date DATE,
    FOREIGN KEY (user_id) REFERENCES user_parent(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admin (
    user_id INT PRIMARY KEY,
    role VARCHAR(50) DEFAULT 'superadmin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_parent(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    description TEXT,
    available_units INT,
    in_stock TINYINT DEFAULT 1,
    average_rating FLOAT DEFAULT 0,
    rating_count INT DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES seller(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS product_image (
    product_id INT,
    image_url VARCHAR(255) NOT NULL,
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shopping_cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user_parent(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS product_shoppingcart (
    cart_id INT,
    product_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY (cart_id, product_id),
    FOREIGN KEY (cart_id) REFERENCES shopping_cart(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(10, 2) NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES user_parent(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_product (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS review (
    product_id INT,
    user_id INT,
    rating FLOAT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    PRIMARY KEY (product_id, user_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user_parent(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS carriers (
    carrier_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(15),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shipment (
    shipment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    carrier_id INT,
    tracking_number VARCHAR(50),
    status VARCHAR(20) DEFAULT 'In Transit',
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (carrier_id) REFERENCES carriers(carrier_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS credit_card (
    card_id INT AUTO_INCREMENT PRIMARY KEY,
    card_number CHAR(16) NOT NULL UNIQUE,
    cardholder_name VARCHAR(100) NOT NULL,
    expiry_date DATE NOT NULL,
    cvv CHAR(3) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_parent(id) ON DELETE CASCADE
);