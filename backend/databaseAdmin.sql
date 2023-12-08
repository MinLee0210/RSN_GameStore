SELECT * FROM rsn_admin /*GET ALL ADMINS*/

ALTER SEQUENCE rsn_admin_adid_seq RESTART WITH 1 --RESET AUTO_INCREMENT

SELECT * FROM rsn_admin WHERE email = 'bachvo01@gmail.com'     --SELECT admin with desired email
                        AND EXISTS (SELECT 1 FROM rsn_admin 
                        WHERE email = 'bachvo01@gmail.com')

SELECT * FROM rsn_product

CREATE TABLE rsn_product(
	productID SERIAL PRIMARY KEY,
	title varchar(256),
	genre varchar(256),
	price DECIMAL(10,2),
	developer varchar(256),
	publisher varchar(256),
	date varchar(256),
	descriptions VARCHAR,
	file_ID,
	created_At timestamp default current_timestamp,
	CONSTRAINT fk_fileid
	FOREIGN KEY(fileID) REFERENCES rsn_prodct_file(file_id)
)
CREATE TABLE rsn_product(
	productID SERIAL PRIMARY KEY,
	title varchar(256),
	genre varchar(256),
	price DECIMAL(10,2),
	developer varchar(256),
	publisher varchar(256),
	date varchar(256),
	descriptions VARCHAR,
	fileCover1 varchar(256),
	fileCover2 varchar(256),
	fileBanner varchar(256),
	fileImg1 varchar(256),
	fileImg2 varchar(256),
	fileImg3 varchar(256),
	fileImg4 varchar(256)
	created_At timestamp default current_timestamp,
)

CREATE TABLE rsn_wishlist(
	productID INT,
	userID INT,
	status BOOLEAN,
	wished_At timestamp default current_timestamp,
	CONSTRAINT fk_productid
	FOREIGN KEY(productID) REFERENCES rsn_product(productID),
	CONSTRAINT fk_userid
	FOREIGN KEY(userID) REFERENCES rsn_user(userID)
)


CREATE TABLE rsn_product_file(
	file_id INT PRIMARY KEY,
	fileCover1 varchar(256),
	fileCover2 varchar(256),
	fileBanner varchar(256),
	fileImg1 varchar(256),
	fileImg2 varchar(256),
	fileImg3 varchar(256),
	fileImg4 varchar(256)
)

CREATE TABLE rsn_user(
	userID SERIAL PRIMARY KEY,
	firstname varchar(50) NOT NULL,
	middlename varchar(50),
	lastname varchar(50) NOT NULL,
	email CITEXT,
	age INT NOT NULL,
	password varchar(256) NOT NULL,
	refreshTK varchar(256),
	role_ID INT,
	registered_At timestamp default current_timestamp,
	CONSTRAINT fk_roleid
	FOREIGN KEY(role_ID) REFERENCES rsn_role(role_id)
)

CREATE TABLE rsn_role{
	role_id INT PRIMARY KEY,
	role_name VARCHAR(50)
}

CREATE TABLE rsn_wallet{
	walletid SERIAL PRIMARY KEY,
	amount DECIMAL(10,2),
	status boolean
}

CREATE TABLE rsn_credit(
	creditNumber VARCHAR(256) PRIMARY KEY,
	creditName VARCHAR(256),
	creditDate VARCHAR(50),
	creditCVC VARCHAR(10),
	amount DECIMAL(10,2)
)

CREATE TABLE rsn_admin(
	adID SERIAL PRIMARY KEY,
	firstname varchar(50) NOT NULL,
	middlename varchar(50),
	lastname varchar(50) NOT NULL,
	email CITEXT,
	age INT NOT NULL,
	password varchar(256) NOT NULL,
	role_ID INT,
	CONSTRAINT fk_roleid
	FOREIGN KEY(role_ID) REFERENCES rsn_role(role_id)
)


CREATE TABLE rsn_cart(
	cartID SERIAL PRIMARY KEY,
	totalCart DECIMAL(10,2),
	quantity INT,
	userid INT,
	CONSTRAINT fk_userid
	FOREIGN KEY(userid) REFERENCES rsn_user(userid)
)

CREATE TABLE rsn_order_items(
	itemid SERIAL PRIMARY KEY,
	code VARCHAR(256),
	productid INT,
	orderid INT,
	CONSTRAINT fk_orderid
	FOREIGN KEY(orderid) REFERENCES rsn_order(orderid),
	CONSTRAINT fk_productid
	FOREIGN KEY(productid) REFERENCES rsn_product(productid)
)

CREATE TABLE rsn_order(
	orderid SERIAL PRIMARY KEY,
	userid INT,
	totalprice DECIMAL(10,2),
	quantity INT,
	ordered_At timestamp default current_timestamp,
	CONSTRAINT fk_userid
	FOREIGN KEY(userid) REFERENCES rsn_user(userid)
)

CREATE TABLE rsn_inventory(
	inventID SERIAL PRIMARY KEY,
	cartID INT,
	productID INT,
	CONSTRAINT fk_cartid
	FOREIGN KEY (cartID) REFERENCES rsn_cart(cartID),
	CONSTRAINT fk_productid
	FOREIGN KEY (productID) REFERENCES rsn_product(productid)
)


