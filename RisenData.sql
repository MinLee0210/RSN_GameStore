--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-04-25 17:24:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3521 (class 1262 OID 16398)
-- Name: Risen; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Risen" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE "Risen" OWNER TO postgres;

\connect "Risen"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16399)
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- TOC entry 3522 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16505)
-- Name: rsn_admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rsn_admin (
    adid integer NOT NULL,
    firstname character varying(255) NOT NULL,
    middlename character varying(255),
    lastname character varying(255) NOT NULL,
    email public.citext,
    age integer,
    password character varying(255),
    role_id integer
);


ALTER TABLE public.rsn_admin OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16504)
-- Name: rsn_admin_adid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rsn_admin_adid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rsn_admin_adid_seq OWNER TO postgres;

--
-- TOC entry 3523 (class 0 OID 0)
-- Dependencies: 215
-- Name: rsn_admin_adid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rsn_admin_adid_seq OWNED BY public.rsn_admin.adid;


--
-- TOC entry 223 (class 1259 OID 25013)
-- Name: rsn_cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rsn_cart (
    cartid integer NOT NULL,
    totalcart numeric(10,2),
    quantity integer,
    userid integer
);


ALTER TABLE public.rsn_cart OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 25012)
-- Name: rsn_cart_cartid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rsn_cart_cartid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rsn_cart_cartid_seq OWNER TO postgres;

--
-- TOC entry 3524 (class 0 OID 0)
-- Dependencies: 222
-- Name: rsn_cart_cartid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rsn_cart_cartid_seq OWNED BY public.rsn_cart.cartid;


--
-- TOC entry 228 (class 1259 OID 25105)
-- Name: rsn_credit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rsn_credit (
    creditnumber character varying(256) NOT NULL,
    creditname character varying(256),
    creditdate character varying(50),
    creditcvc character varying(10),
    amount numeric(10,2)
);


ALTER TABLE public.rsn_credit OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 25025)
-- Name: rsn_inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rsn_inventory (
    inventid integer NOT NULL,
    cartid integer,
    productid integer
);


ALTER TABLE public.rsn_inventory OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 25024)
-- Name: rsn_inventory_inventid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rsn_inventory_inventid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rsn_inventory_inventid_seq OWNER TO postgres;

--
-- TOC entry 3525 (class 0 OID 0)
-- Dependencies: 224
-- Name: rsn_inventory_inventid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rsn_inventory_inventid_seq OWNED BY public.rsn_inventory.inventid;


--
-- TOC entry 230 (class 1259 OID 25113)
-- Name: rsn_order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rsn_order (
    orderid integer NOT NULL,
    userid integer,
    totalprice numeric(10,2),
    quantity integer,
    ordered_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.rsn_order OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 25125)
-- Name: rsn_order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rsn_order_items (
    itemid integer NOT NULL,
    code character varying(256),
    productid integer,
    orderid integer
);


ALTER TABLE public.rsn_order_items OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 25124)
-- Name: rsn_order_items_itemid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rsn_order_items_itemid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rsn_order_items_itemid_seq OWNER TO postgres;

--
-- TOC entry 3526 (class 0 OID 0)
-- Dependencies: 231
-- Name: rsn_order_items_itemid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rsn_order_items_itemid_seq OWNED BY public.rsn_order_items.itemid;


--
-- TOC entry 229 (class 1259 OID 25112)
-- Name: rsn_order_orderid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rsn_order_orderid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rsn_order_orderid_seq OWNER TO postgres;

--
-- TOC entry 3527 (class 0 OID 0)
-- Dependencies: 229
-- Name: rsn_order_orderid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rsn_order_orderid_seq OWNED BY public.rsn_order.orderid;


--
-- TOC entry 221 (class 1259 OID 24755)
-- Name: rsn_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rsn_product (
    productid integer NOT NULL,
    title character varying(256),
    genre character varying(256),
    price numeric(10,2),
    developer character varying(256),
    publisher character varying(256),
    date character varying(256),
    descriptions character varying,
    filecover1 character varying(256),
    filecover2 character varying(256),
    filebanner character varying(256),
    fileimg1 character varying(256),
    fileimg2 character varying(256),
    fileimg3 character varying(256),
    fileimg4 character varying(256),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.rsn_product OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24754)
-- Name: rsn_product_productid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rsn_product_productid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rsn_product_productid_seq OWNER TO postgres;

--
-- TOC entry 3528 (class 0 OID 0)
-- Dependencies: 220
-- Name: rsn_product_productid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rsn_product_productid_seq OWNED BY public.rsn_product.productid;


--
-- TOC entry 219 (class 1259 OID 24719)
-- Name: rsn_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rsn_user (
    userid integer NOT NULL,
    firstname character varying(50) NOT NULL,
    middlename character varying(50),
    lastname character varying(50) NOT NULL,
    email public.citext,
    age integer NOT NULL,
    password character varying(256) NOT NULL,
    role_id integer,
    registered_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    walletid integer NOT NULL
);


ALTER TABLE public.rsn_user OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 25158)
-- Name: rsn_purchased; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.rsn_purchased AS
 SELECT rsn_order_items.productid
   FROM (((public.rsn_user
     JOIN public.rsn_order USING (userid))
     JOIN public.rsn_order_items USING (orderid))
     JOIN public.rsn_product USING (productid))
  WHERE (rsn_user.email OPERATOR(public.=) 'bachvo01@gmail.com'::public.citext)
  GROUP BY rsn_order_items.productid;


ALTER TABLE public.rsn_purchased OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16519)
-- Name: rsn_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rsn_role (
    role_id integer NOT NULL,
    role_name character varying(20)
);


ALTER TABLE public.rsn_role OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24718)
-- Name: rsn_user_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rsn_user_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rsn_user_userid_seq OWNER TO postgres;

--
-- TOC entry 3529 (class 0 OID 0)
-- Dependencies: 218
-- Name: rsn_user_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rsn_user_userid_seq OWNED BY public.rsn_user.userid;


--
-- TOC entry 227 (class 1259 OID 25074)
-- Name: rsn_user_walletid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rsn_user_walletid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rsn_user_walletid_seq OWNER TO postgres;

--
-- TOC entry 3530 (class 0 OID 0)
-- Dependencies: 227
-- Name: rsn_user_walletid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rsn_user_walletid_seq OWNED BY public.rsn_user.walletid;


--
-- TOC entry 226 (class 1259 OID 25060)
-- Name: rsn_wishlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rsn_wishlist (
    productid integer,
    userid integer,
    status boolean,
    wished_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.rsn_wishlist OWNER TO postgres;

--
-- TOC entry 3311 (class 2604 OID 16508)
-- Name: rsn_admin adid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_admin ALTER COLUMN adid SET DEFAULT nextval('public.rsn_admin_adid_seq'::regclass);


--
-- TOC entry 3317 (class 2604 OID 25016)
-- Name: rsn_cart cartid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_cart ALTER COLUMN cartid SET DEFAULT nextval('public.rsn_cart_cartid_seq'::regclass);


--
-- TOC entry 3318 (class 2604 OID 25028)
-- Name: rsn_inventory inventid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_inventory ALTER COLUMN inventid SET DEFAULT nextval('public.rsn_inventory_inventid_seq'::regclass);


--
-- TOC entry 3320 (class 2604 OID 25116)
-- Name: rsn_order orderid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_order ALTER COLUMN orderid SET DEFAULT nextval('public.rsn_order_orderid_seq'::regclass);


--
-- TOC entry 3322 (class 2604 OID 25128)
-- Name: rsn_order_items itemid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_order_items ALTER COLUMN itemid SET DEFAULT nextval('public.rsn_order_items_itemid_seq'::regclass);


--
-- TOC entry 3315 (class 2604 OID 24758)
-- Name: rsn_product productid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_product ALTER COLUMN productid SET DEFAULT nextval('public.rsn_product_productid_seq'::regclass);


--
-- TOC entry 3312 (class 2604 OID 24722)
-- Name: rsn_user userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_user ALTER COLUMN userid SET DEFAULT nextval('public.rsn_user_userid_seq'::regclass);


--
-- TOC entry 3314 (class 2604 OID 25075)
-- Name: rsn_user walletid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_user ALTER COLUMN walletid SET DEFAULT nextval('public.rsn_user_walletid_seq'::regclass);


--
-- TOC entry 3499 (class 0 OID 16505)
-- Dependencies: 216
-- Data for Name: rsn_admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rsn_admin (adid, firstname, middlename, lastname, email, age, password, role_id) VALUES (7, 'Vo', 'Nguyen Duy', 'Bach', 'bachvo01@gmail.com', 22, '$2a$12$SEi.cNGtm90Uk0T0iANjm.UDp3x1pMJKkSh4fnZRGxcSory6eNabS', 1);


--
-- TOC entry 3506 (class 0 OID 25013)
-- Dependencies: 223
-- Data for Name: rsn_cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rsn_cart (cartid, totalcart, quantity, userid) VALUES (78, 64.97, 3, 16);


--
-- TOC entry 3511 (class 0 OID 25105)
-- Dependencies: 228
-- Data for Name: rsn_credit; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rsn_credit (creditnumber, creditname, creditdate, creditcvc, amount) VALUES ('0000 0000 0000 0000', 'VO NGUYEN DUY BACH', '12/24', '123', 19080.27);


--
-- TOC entry 3508 (class 0 OID 25025)
-- Dependencies: 225
-- Data for Name: rsn_inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rsn_inventory (inventid, cartid, productid) VALUES (257, 78, 13);
INSERT INTO public.rsn_inventory (inventid, cartid, productid) VALUES (258, 78, 15);
INSERT INTO public.rsn_inventory (inventid, cartid, productid) VALUES (259, 78, 18);


--
-- TOC entry 3513 (class 0 OID 25113)
-- Dependencies: 230
-- Data for Name: rsn_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (35, 16, 59.99, 1, '2023-04-13 01:25:32.381076');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (36, 16, 59.99, 1, '2023-04-13 01:27:11.380479');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (37, 16, 29.98, 2, '2023-04-13 09:19:32.163205');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (38, 16, 34.99, 1, '2023-04-13 14:44:09.460044');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (39, 16, 39.99, 1, '2023-04-13 14:47:46.299913');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (40, 16, 59.99, 1, '2023-04-13 15:03:16.19605');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (41, 16, 34.99, 1, '2023-04-13 15:23:45.740655');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (42, 16, 9.99, 1, '2023-04-13 15:25:09.68288');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (43, 16, 39.99, 1, '2023-04-13 15:27:27.059225');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (44, 16, 109.98, 2, '2023-04-13 15:31:46.218197');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (45, 16, 59.99, 1, '2023-04-13 15:34:10.24201');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (46, 16, 79.98, 2, '2023-04-13 17:50:06.576567');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (47, 16, 99.96, 4, '2023-04-14 12:25:35.79167');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (48, 16, 149.97, 3, '2023-04-14 12:26:30.776892');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (49, 16, 39.98, 2, '2023-04-14 12:27:04.998112');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (50, 16, 49.99, 1, '2023-04-14 15:32:31.625916');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (51, 16, 24.99, 1, '2023-04-16 09:44:48.782417');
INSERT INTO public.rsn_order (orderid, userid, totalprice, quantity, ordered_at) VALUES (52, 16, 84.95, 3, '2023-04-16 10:27:33.556631');


--
-- TOC entry 3515 (class 0 OID 25125)
-- Dependencies: 232
-- Data for Name: rsn_order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (57, 'AWC4Z-2O410-BHRQC', 11, 35);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (58, '64QBS-W3CI3-OB33V', 11, 36);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (59, '3NBY5-WLJLH-4HN05', 15, 37);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (60, 'BD2AQ-27GQ2-NVM77', 18, 37);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (61, 'QYJOJ-F81TF-AZ2HP', 13, 38);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (62, '5SCAD-VNZ7W-4GR2D', 17, 39);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (63, '18W70-PN4MF-U78LR', 16, 40);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (64, 'BWH5V-V2QGO-43HKT', 19, 41);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (65, 'S38XS-QP1WW-F1FPS', 18, 42);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (66, 'HBGBZ-6Z039-8XZSC', 17, 43);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (67, 'GYSOO-BUY3O-G4WFT', 14, 44);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (68, 'AX7RM-10GS6-4QRFL', 16, 44);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (69, 'RUDS9-IJI0I-ZLX0G', 11, 45);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (70, 'H4HGN-QFR2A-6C9WY', 14, 46);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (71, '3YR92-I5WU4-0JZ4I', 21, 46);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (72, '7GLZZ-6UX0N-ZLEXP', 25, 47);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (73, 'RDPW3-FU5FU-CJFFY', 25, 47);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (75, 'PP5L5-LUG7T-4EQEL', 25, 47);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (74, 'TSSRK-6PVO2-QTNYT', 25, 47);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (76, 'GHWU7-ESZ7Y-7C1EY', 22, 48);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (78, '250UB-ESCSS-SJE05', 22, 48);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (77, '3W5FH-9IL98-OEX07', 22, 48);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (79, '0Q873-VE4N3-G5XW0', 23, 49);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (80, 'PA4SZ-Z141E-JQDLK', 23, 49);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (81, 'RKOCG-4UULF-QFHAH', 22, 50);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (82, 'XTSLY-HOZOH-SK42W', 25, 51);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (83, 'RQVO1-FZRQN-PGN5S', 17, 52);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (84, 'AC0CT-026AL-D9HDP', 18, 52);
INSERT INTO public.rsn_order_items (itemid, code, productid, orderid) VALUES (85, 'JTFBL-MUYNI-E5LAN', 20, 52);


--
-- TOC entry 3504 (class 0 OID 24755)
-- Dependencies: 221
-- Data for Name: rsn_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (11, 'Marvel''s Guardians of the Galaxy', 'Action', 59.99, 'Eidos Montreal', 'Square Enix', '2021-10-26', '<p>Marvel’s Guardians of the Galaxy for PC is a single player, narrative driven, episodic game with a fairly linear premise. It is strongly mission based, and the story is loosely based on the comic book series of the same name. There are movies in the franchise which use the same characters as are featured in the game and the original comics.<br><br><br><strong>About the Game</strong><br><br>The basic premise of this game is that the team of characters must find the Eternity Forge, an artefact of great power. The antagonist is Kree Hala the Accuser, who wants it herself. The player plays primarily as Star-Lord, but will occasionally play as the others in the many flashbacks that flesh out the team dynamic and provides characters’ backstories. The humour that made the movies so popular is here too, and carries across well.<br><br>Just as in the movie and the comics, music is important. All the backing tracks to the game are all belters from the 70s and 80s. This is a major connection between Peter (Star-Lord and his past, his childhood and the now mostly defunct Earth. On occasion, you get to choose the background track to inspire the team to a greater effort against the villains.<br><br>The five episodes that comprise the game (see more about this below) play out with plenty of cliff-hanger ups and downs, with a story arc to follow and important player choices to be made. Players can make good choices or bad one, depending on your preferences, and these actions will have sometimes unexpected future consequences.<br><br>The characters on the Milano are all likeable and distinctive: there is Star-Lord, who is cocky, brash, optimistic; Gamora, a world weary cynical warrior; Drax who typifies ‘all brawn and no brain’; Rocket is a sardonic modified raccoon with a dark backstory and Groot is a humanoid tree.<br><br>Nebula and Mantis are not Guardians, per se, but they show up along the way too to help out and hinder as the story demands.<br><br><br><strong>The Nitty Gritty</strong><br><br>The game is strongly team based, with all the characters needed for true success in any scenario. Your AI-controlled fellow Guardians are more than up to the task and ‘remember’ your previous choices and instructions extrapolating them forward, so it really feels as though they are working with you, rather than waiting to be told what to do.<br><br>Along with this, the characters still have their own unique personalities – for example, Drax takes on too many enemies at once, while Gamora is more cautious. Star-Lord loves to shoot, and this can be teamed with jumping, dodging, trying out new moves that you’ve just unlocked, and executing melee strikes. It is up to you to set the team members tasks that they will cope with well.<br><br>The enemies’ health bars can be seen at all times, letting you know if you need all your strength, or just one or two more shots to finish them off which can be useful when you are unsure of whether to press on or fall back to recuperate and regroup.<br><br>Fill your XP bar to unlock unique abilities. You can inspire your team to success by choosing the right inspirational speech or background track. This does more than just make them feel good, it actually gives them boosts and abilities they wouldn’t otherwise have. You can also do things like letting Drax throw Rocket over a ravine to make a bridge quickly – but Rocket might not be so willing to help next time!</p>', 'http://localhost:5000/images/TZv92uvHo9beG8EPaNjghLI5.jpg', 'http://localhost:5000/images/V-maTBVV2nuklp2nI1uyounP.jpg', 'http://localhost:5000/images/74Spe-_ulO4le5Ztg75rSjea.jpg', 'http://localhost:5000/images/aFPvPkzBVDIdya5XWhD0tEz5.jpg', 'http://localhost:5000/images/J1JVE2BedZxZb-nwx4QWY4o0.jpg', 'http://localhost:5000/images/ZzlrskVsW2Fjlf7di1ziqynk.jpg', 'http://localhost:5000/images/zQndgNLAZzJUOeV-6EP8Wux1.webp', '2023-03-29 16:42:53.049199');
INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (13, 'God of War', 'Single-player', 34.99, 'Santa Monica Studios', 'PlayStation PC LLC', '2017-04-14', '<p>God of War for PC was teased for months, from about halfway through 2021 until the developers finally put players out of their misery and confirmed the PC release in January 2022! It is the PC-friendly version of the 2018 Gods of War, which was initially only available on PlayStation. The game allows PC gamers to enjoy the intense Norse God action-adventure game.<br><br>The game is the eighth in the whole cross-platform series and takes place against a background that while not really being open world and more a series of linked locations, is still wide and explorable within those locations. You seldom feel constrained despite the linear game progression.<br><br>About the Game<br><br>The game’s plot plays out against the background of Norse gods in this iteration, rather than the Ancient Greece of the original games, and it is loosely set in Medieval Scandinavia in the realm of Midgard, which is the Norse equivalent of the lands inhabited by the earliest humans when the world was young.<br><br>There are two protagonists in the game, one of whom is playable. Kratos – a former Greek God of War and only playable character – is accompanied by his young son, Atreus, who looks to be anywhere between eight years old and twelve or so. The two of them are on an honour quest, to dispose of Faye’s (Atreus’s mother) ashes according to her deathbed wish, to have her remains scattered on the highest peak of the nine realms.<br><br>Of course, there would be no story if everything went smoothly, and so, their quest is disrupted by monsters and gods who have other ideas about who should be able to dispose of their earthly remains on the sacred peak. The monsters start off large and scary and steadily get larger and scarier, giving you plenty of scope to improve your skills and then try them out. The combat is wonderful: bloody, brutal and – thanks to the physics engine – satisfying!<br><br>Almost equally satisfying and rare in a game better known for skull-shattering crunches and broken bones, is the arc between Kratos and Atreus. When they set off, they are almost strangers to each other, both feeling that the other expects more of them than they give. This arc progresses along with the game, ending with a much closer, more respectful and loving relationship between the two. And all without impacting the joyous blood-shed!<br><br><br>The Nitty Gritty<br><br>Take a moment before you play, to customise your PC settings to suit your CPU to get the best possible results. You will think it well worth the time, when you see the beautiful scenery that makes even the quiet parts a wonderful experience. During the action sequences you will be too busy to notice your surroundings unless it offers a handy cave to hide in, or rock to shelter behind while you catch your breath!<br><br>Gameplay is equally fluid with either a PlayStation controller (PS4 or PS5 are recommended) or a gaming keyboard and mouse, depending on your set-up and preferences. To celebrate the PC release, Sony gave out some extra content, a number of new skins and even some free armour for you to try on for size.<br><br>Do enjoy the game: the original version won multiple (around 190!) Best Game awards, and for good reason. The action is ‘filmed’ in a continuous shot, the focus of which is always Kratos and his son, making it immediately immersive. The filming style isn’t kitschy or artsy though, it all flows seamlessly, leaving you breathless as you closely accompany your hero.<br><br>Atreus is AI at its best, interacting almost naturally, but also obediently following instructions and enabling you to double your strike rate and power if you time your actions with his – something that the pros make look easy to do!<br><br>Take your time exploring the worlds and learning about the mythology and hidden secrets of the world, or gallop through to finish quickly and then return to cover the bits you missed. There are at least 20 hours or so of content that is not directly related to the game, just waiting to be enjoyed when you explore the beautifully rendered world to its limits.</p>', 'http://localhost:5000/images/3E250cyrYtmUqftixAO4xrsW.png', 'http://localhost:5000/images/SIFRZd2FjgCdw0rQr6kqiWI0.jpg', 'http://localhost:5000/images/17jVLpSODt9cGzMfhDaKQC-9.jpg', 'http://localhost:5000/images/-_5oTFreh0z_2uYc21GKPIVn.jpg', 'http://localhost:5000/images/L8F6omVnUIRcTkjn8_NDJTDt.jpg', 'http://localhost:5000/images/wQ-H4vqYC1sd_MMWc5NXv2ow.jpg', 'http://localhost:5000/images/sgakm2qFJIemAmGBbd-wsO2Q.jpg', '2023-03-29 17:16:20.722569');
INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (17, 'Spider-man Miles Morales', '', 24.97, 'Insomniac Games', 'PlayStation PC LLC', '2021-10-31', '<p>Marvel’s Spider-Man: Miles Morales for PC is the 2020 console game remastered for PC. It is an action adventure game based on the decade-long graphic work which culminated in the 2018 animation film, Spiderman into the Spiderverse.<br><br>About the Game<br><br>The game picks up after the events of the movie, continuing Miles Morales adventures as he learns to juggle civilian life verse superheroing. It is not long before he discovers that his new home in Harlem is threatened by a battle between the tech giant, Roxxon Energy Co, and the latest villainous crew, the Underground, led by mysterious villain, The Tinkerer.<br>As Miles does his best, he keeps an eye on the city’s doings by using an app which tells him what crimes are ongoing as well as alerting him to news and side missions. Like Peter, Miles possesses a "spider-sense", which warns the player of incoming attacks and allows them to dodge and retaliate.<br>He also has, of course, web-shooters, which stream webs that can be used during both traversal and combat, in several different ways. Miles can also jump, stick to surfaces, and fast travel using the New York City subway system.<br>It’s not all web slinging and flying high over the city though. During certain sections of the game, players control Miles in his civilian persona and cannot use any of his abilities or gadgets. Miles does his best to help Spiderman, but his confidence is quite low after a couple of fairly high-level mistakes, so when Spidey lets him know that he, Spidey will be out of town for a bit, with MJ, Miles is convinced it’s all going to go wrong.<br><br>The Nitty Gritty<br><br>The third person perspective lends itself well to the main focus of the game and, as always with Spidey games, this translates to Miles’ movements and combat positions. Combat allows you to link attacks together, and use the environment and webs to take down villains while avoiding as much damage as you can.<br>Side-missions have been significantly altered, and are now accessed from an in-game phone app (mentioned above). Miles has several unlockable suits, some of which are based on existing versions of the character in media, as well as original suits created just for the game. Many of these enhance Miles'' abilities, such as allowing him to take less damage, stay invisible for a longer time, or regenerate Venom Power faster.<br>The game’s graphics are beautiful, with gorgeous sights to enjoy from the top of buildings or as Miles swings along to get where he’s going, so do remember to – occasionally – slow down and enjoy the view.<br>Throughout the game Miles can treat fictional Manhattan, NY as something of an open world sandbox, albeit a snowy one as the game is set during the holidays, interacting with other characters and gathering useful tools and gadgets, completing missions and side questions, and, of course, unlocking those new suits.</p>', 'http://localhost:5000/images/GG76r80mSYPuf2RrJYq1-aFn.jpg', 'http://localhost:5000/images/EdYvsTqBvFRn0RPyWbWivnxm.webp', 'http://localhost:5000/images/C9iv9ayeyd8JYsPbdCRQ3s2o.jpg', 'http://localhost:5000/images/DTA1P9ArjRCz1uY_FjiWD0ti.jpg', 'http://localhost:5000/images/A9Xm5CCWgYJDDR6y3TZNIgtQ.jpg', 'http://localhost:5000/images/bLukLasl3E2lGydzu8eTjj3R.jpg', 'http://localhost:5000/images/tjmNnvIygQo6zF0eE6S3c8Hl.jpg', '2023-03-31 00:59:43.552916');
INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (18, 'The Witcher 3: Wild Hunt', 'Role-play', 9.99, 'CD Projekt RED', 'CD Projekt', '2015-05-18', '<p>The Witcher 3: Wild Hunt is a 2015 action role-playing game developed and published by CD Projekt. It is the sequel to the 2011 game The Witcher 2: Assassins of Kings and the third game in The Witcher video game series, played in an open world with a third-person perspective.<br><br>The game takes place in a fictional fantasy world based on Slavic mythology. Players control Geralt of Rivia, a monster slayer for hire known as a Witcher, and search for his adopted daughter, who is on the run from the otherworldly Wild Hunt. Players battle the game''s many dangers with weapons and magic, interact with non-player characters, and complete quests to acquire experience points and gold, which are used to increase Geralt''s abilities and purchase equipment. The game''s story has three possible endings, determined by the player''s choices at key points in the narrative.<br><br>The game focuses on narrative and has a dialogue tree which allows players to choose how to respond to non-player characters. Geralt must make decisions which change the state of the world and lead to 36 possible endings, affecting the lives of in-game characters. He can have a romantic relationship with some of the game''s female characters by completing certain quests. In addition to the main quests, books offer more information on the game''s world. Players can begin side quests after visiting a town''s noticeboard. These side missions include Witcher Contracts (elaborate missions requiring players to hunt monsters) and Treasure Hunt quests, which reward players with top-tier weapons or armour. The game''s open world is divided into several regions. Geralt can explore each region on foot or by transportation, such as a boat. Roach, his horse, may be summoned at will. Players can kill enemies with their sword while riding Roach, but an enemy presence may frighten the horse and unseat Geralt. Points of interest may be found on the map, and players receive experience points after completing mini-missions in these regions. Players can discover Places of Power for additional ability points. Other activities include horse racing, boxing and card playing; the card-playing mechanic was later expanded into a standalone game, Gwent: The Witcher Card Game.</p>', 'http://localhost:5000/images/DX3FU8B4kPTfoZqG4FZB6ukK.jpg', 'http://localhost:5000/images/fjJoG-oA7nE3V_N_r_FHDGvF.jpeg', 'http://localhost:5000/images/HtIFLiSLtIU28otJInVcgAFT.jpeg', 'http://localhost:5000/images/ucmi8_BZEvlFSBtzf-Tv68D1.jpg', 'http://localhost:5000/images/yDVk6_9eCI4zZxYZ3YDc-X-e.jpg', 'http://localhost:5000/images/sHXgnuc5vHyu3LByVkKlKvKe.jpg', 'http://localhost:5000/images/pueya9X3Kf5a4NF7cXvPFxlR.jpg', '2023-03-31 01:13:49.302583');
INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (14, 'Gotham Knights', '', 49.99, 'WB Games Montréal', 'Warner Bros. Games', '2022-12-02', '<p>About This Game<br><br>Nothing special!</p>', 'http://localhost:5000/images/ZtdMMQhuD1q6Z9U6nVQAx-6U.jpg', 'http://localhost:5000/images/9zkmfcJVQsNuyAEv6DAJ4P3v.jpg', 'http://localhost:5000/images/c9W5pn2wOEQ7YAXqa3-D6zOc.jpg', 'http://localhost:5000/images/EAsKzr3mGrdUWxKTBezKErcD.webp', 'http://localhost:5000/images/pNDT_aJafNw7aIrfJDMvHOGZ.jpg', 'http://localhost:5000/images/r-u36b9aCVS3keRlhEn3kKBI.jpg', 'http://localhost:5000/images/XaAvnU1yavNzGZ9L88wq6wa6.webp', '2023-03-30 15:30:25.866841');
INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (16, 'Suicide Squad: Kill the Justice League', 'Action', 59.99, 'Rocksteady Studios', 'Warner Bros. Games', '2023-05-26', '<p><strong>About this Game</strong><br><br><i>Suicide Squad: Kill the Justice League</i> is a new genre-defying third-person action-adventure shooter videogame allowing players to take on the roles of Suicide Squad members Harley Quinn, Deadshot, Captain Boomerang and King Shark.<br><br><i>Suicide Squad: Kill the Justice League</i> is a new third-person action-adventure shooter featuring an original, narrative-driven experience that picks up the story five years after the events of Batman: Arkham Knight so players who are familiar with the Batman: Arkham series will see some related narrative elements pop up in the game.</p>', 'http://localhost:5000/images/doXagYwa3d479A01ZK7FuMZ3.jpg', 'http://localhost:5000/images/g1TwYy9ju94RrJku0w233WDm.png', 'http://localhost:5000/images/feyewQ3NMalhrDaN59aNPeek.jpg', 'http://localhost:5000/images/Hgw1hctMrA_PCJOk0hp1F0E4.jpg', 'http://localhost:5000/images/GdESMZNjMXNY03dz1HS_me0a.jpg', 'http://localhost:5000/images/_NVTZrGaLEntN34VabBwiyuK.jpg', 'http://localhost:5000/images/IF6Oqo5KhPMHZX_yo7_JMXcY.jpg', '2023-03-30 20:16:43.108688');
INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (15, 'Star Wars: Battlefront II', '', 19.99, 'DICE', 'Electronic Arts', '2017-03-07', '<p><strong>About This Game</strong></p><p>&nbsp;</p><p>Star Wars Battlefront II is an action shooter video game based on the Star Wars franchise. It is the fourth main installment of the Star Wars: Battlefront series, and a sequel to the 2015 reboot of the series. It was developed by DICE, in collaboration with Criterion Games and Motive Studios, and published by Electronic Arts. The game was released worldwide on November 17, 2017, for the PlayStation 4, Windows, and Xbox One. The game features both single-player and multiplayer modes, and overall includes more content than its predecessor. The single-player campaign of the game is set between the films Return of the Jedi and The Force Awakens, and follows an original character, Iden Versio, the commander of an Imperial special ops strike force dubbed Inferno Squad, who defects to the New Republic after becoming disillusioned with the Galactic Empire''s tactics. Most of the story takes place during the final year of the Galactic Civil War, before the Empire''s definitive defeat at the Battle of Jakku.</p>', 'http://localhost:5000/images/fDDt2SpevjLP5aG07adzx6B3.jpg', 'http://localhost:5000/images/tIDdZXI885-XwHZBYjKgwhE2.jpg', 'http://localhost:5000/images/7u3Jg8r4VFGHFazC7CXEKmau.jpg', 'http://localhost:5000/images/1eq1dS-tcJHtNa-ZT_Unx-2s.jpg', 'http://localhost:5000/images/DT0L1aUY3FQ4hbnpAQrGvxhl.webp', 'http://localhost:5000/images/2qh1M7dUUli_4Qn1TqGwZYQq.webp', 'http://localhost:5000/images/wGrpGhXOjsx8X4DrAOpItVO3.webp', '2023-03-30 20:05:51.247463');
INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (19, 'Cyberpunk 2077', 'Role-play', 34.99, 'CD Projekt RED', 'CD Projekt', '2020-12-10', '<p>Cyberpunk 2077 is a 2020 action role-playing video game developed by CD Projekt Red and published by CD Projekt.<br><br>Set in Night City, an open world set in the Cyberpunk universe, players assume the role of a customisable mercenary known as V, who can acquire skills in hacking and machinery with options for melee and ranged combat. The main story follows V''s struggle as they deal with a mysterious cybernetic implant that threatens to overwrite their body with the personality and memories of a deceased celebrity only perceived by V; the two must work together to be separated and save V''s life.</p>', 'http://localhost:5000/images/FexL6kUTB2YTqgEgwSqQ1UgW.png', 'http://localhost:5000/images/NRLsuoFNxwqAMjeY1xUikzU7.jpg', 'http://localhost:5000/images/CJJ3z6bat3s0VhT4IFjRf6py.jpg', 'http://localhost:5000/images/ZTkY9rdY4s7BahQgUABGjoHh.jpg', 'http://localhost:5000/images/U7qzHxj119nvSZBVmC9qUUYl.jpg', 'http://localhost:5000/images/mRGzeme28wnlNA1SreMSA_f5.jpg', 'http://localhost:5000/images/z8znEIvGyFdSbj6gNpeWG3FI.jpg', '2023-03-31 01:17:31.063386');
INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (20, 'Wild Hearts', 'Action', 49.99, 'Koei Tecmo', 'Electronic Arts', '2023-02-16', '<p><strong>About the Game</strong><br><br>Players assume the role of a nameless hunter, who must embark on quests to hunt down massive monsters known as Kemono in the world of Azuma. Azuma is not an open world, but instead, several large areas that players can freely explore. The game features eight different weapon types, including the likes of wagasa and katana. In addition to using weapons to defeat enemies, players can also build items to assist combat through the Karakuri mechanic. For instance, players can build crates which can be leapt off of to perform powerful attacks, or a torch which can be used to ignite enemies. These items can be combined to form larger machines, such as a bulwark that blocks an enemy''s path. Constructed items are permanent until they are destroyed by Kemono. Players can also build Karakuri to aid transversal. Building Karakuri consumes thread, which can be acquired through simply attacking enemies. As the player progresses in the game, they will unlock new weapons and armors, allowing players to hunt more challenging monsters. The team estimated that players can complete the game''s narrative campaign in about 30 hours. Players can team up with two other players as they progress in the game.</p>', 'http://localhost:5000/images/IQGqQLGMidH8LKVi7D2ZZTJb.jpg', 'http://localhost:5000/images/RHzdTNeenLwdw1r_3qK8TOvf.jpg', 'http://localhost:5000/images/QE6IH6OoGRbbHrPjniHIuZcA.jpg', 'http://localhost:5000/images/f5R29r0cGIBdUO6wYRrvmdpc.webp', 'http://localhost:5000/images/fMhhcdl91dDINGQF1hyvoNdC.jpg', 'http://localhost:5000/images/2FZiUbQ3lAjDeAm5yniY757Q.jpg', 'http://localhost:5000/images/G6whmAfZdCrWk7ft9C5NrMtP.jpg', '2023-03-31 01:23:14.852065');
INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (21, 'Assassin''s Creed Valhalla', 'Role-play', 29.99, 'Ubisoft Montreal', 'Ubisoft', '2020-11-10', '<p>Includes:<br><br>The Game<br>−<br>Become a legendary Viking raider on a quest for glory. Raid your enemies, grow your settlement, and build your political power.<br><br>Season Pass<br>−<br>Get access to epic new content, explore new lands and discover new gear. + Enjoy an immersive Story Mission, available at Launch.<br><br>Ultimate Pack<br>−<br>Strike fear into the hearts of your enemies, dominate raids and rivers with the set of items included in the Ultimate Pack*.</p>', 'http://localhost:5000/images/ZWKaZcqw1d7DVhSiM_74o9vM.jpg', 'http://localhost:5000/images/AelbEkqTB2PrtckjpG57wtRd.jpg', 'http://localhost:5000/images/09ai6SpJ70fTAATBX3sP3WIM.jpg', 'http://localhost:5000/images/1WgcyanzMK3yW4xzKBTWdYnq.jpg', 'http://localhost:5000/images/z7dgJkhyVMO4HgVbMAdyB3ah.jpg', 'http://localhost:5000/images/JTnN-OQcjgGR2yHzmkDtw2zM.jpg', 'http://localhost:5000/images/1gcldjXswt5yzfylC6drbr2a.jpg', '2023-04-13 16:02:24.61164');
INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (22, 'Hogwarts Legacy', 'Role-play', 49.99, 'Avalanche Software', 'Warner Bros. Games', '2023-02-10', '<p>Hogwarts Legacy is a 2023 action role-playing game developed by Avalanche Software and published by Warner Bros. Games under its Portkey Games label. The game, part of the Wizarding World franchise, takes place in the late 1800s, a century prior to the events chronicled in the Harry Potter novels. The player controls a student enrolled in the Hogwarts School of Witchcraft and Wizardry who learns to wield an array of magical abilities and objects. With the assistance of fellow students and professors, the protagonist embarks on a journey to unearth an ancient secret concealed within the wizarding world.<br><br>Hogwarts Legacy marks Avalanche''s first release since their acquisition by Warner Bros. in 2017. The game''s development commenced in 2018, while pre-release gameplay footage was leaked onto the internet in the same year. Following its official announcement in 2020, the game garnered significant anticipation. Prior to its release, it attracted controversy due to Harry Potter creator J. K. Rowling''s views on transgender people and accusations of including antisemitic tropes, leading to calls for a boycott. Following some delays, it was released on 10 February 2023 for PlayStation 5, Windows, and Xbox Series X/S. It is scheduled for release on PlayStation 4, Xbox One in May and Nintendo Switch in July 2023.<br><br>The early-access period of Hogwarts Legacy resulted in record-breaking viewership on streaming platform Twitch, making it the most-watched single-player game of all time on the platform. Within two weeks after its launch, the game sold more than 12 million copies and generated $850 million in global sales revenue. Hogwarts Legacy received generally favourable reviews from critics, with praise for its combat, world design, characters, and faithfulness to the source material, and criticism for its technical problems and lack of innovation as an open-world game.</p>', 'http://localhost:5000/images/tG591ZQ6UMP04wZrJA0bBHXT.png', 'http://localhost:5000/images/NzsU_s7rBK18-C2_XUjUV6eC.webp', 'http://localhost:5000/images/Dsm3mr4VxrQ2-RVT6-g4XzbT.jpg', 'http://localhost:5000/images/2XyBx7A3g3bJ1jzxz2WVy5yI.webp', 'http://localhost:5000/images/CdNSEo9i5VRYRbhmpOhBLdLY.jpg', 'http://localhost:5000/images/bxsOc7WygTlkBzbHdksEd2P9.jpg', 'http://localhost:5000/images/FwsG4DTTJjQ9GXt4mKGcvWbQ.png', '2023-04-14 11:39:34.336864');
INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (23, 'Red Dead Redemption 2', 'Adventure', 19.99, 'Rockstar Studios', 'Rockstar Games', '2019-12-05', '<p>Red Dead Redemption 2 for PC is an action adventure, open world game in which the player can roam freely with some elements playing out in third person, others in first person play modes. The player can commit crimes, but must then be prepared for law enforcement to hunt them down, ready to bring to bear the full weight of the law on the miscreant!<br><br><strong>About the Game</strong><br><br>RDR2, as the game is affectionately known, was released for other platforms before the PC release, and this saw the game gaining the title of best-selling game of all time, before the PC game figures were included. The reason for the game’s popularity is not hard to see.<br><br>Unlike games where mayhem and destruction are key, this game allows you to sink into the beauty of the Wild West scenery, and to form empathic and sympathetic bonds with other players and NPCs (non-playing characters) in the moments between the action driven sequences – of which there are also many.<br><br>You play as Arthur Morgan, a member of the Van der Linde Gang, and the linear storyline guides play through set story arcs, with Arthur completing missions and achieving objectives as he goes along, guided by the overall narrative.<br><br>Once each mission is complete, Arthur is free to wander the open world, exploring widely and uncovering new places and, occasionally, stumbling onto his next mission which he can play through before returning to his original point to continue from there.<br><br>Despite the tightly plotted story arcs, the game is strongly player driven, with your decisions deciding where the game will take you next. You can linger along each journey, catching villains committing crimes, helping people in distress and helping them with side missions, or you can pass them by, ignoring all the NPCs in your determination to get to your next destination.<br><br><br><strong>Great Graphics</strong><br><br>Given that the game sets a high consideration on the aesthetics of the game, it will come as no surprise that huge amounts of detail have been put into creating the best looking game play, backgrounds and movement shifts possible.<br><br>Shadows and reflections are more detailed and realistic than ever before with higher resolution and sharper definition. Trees, grass and snow all look and ‘feel’ more authentic as you play over them, with subtle alterations in sounds helping to give a realistic impression of the terrain over which you are playing.<br>Movement is more responsive too, with drawing weapons seeming fluid, and walking, riding and running authentic as far as the graphics and physics engines are concerned.</p>', 'http://localhost:5000/images/NvMkK5boWVhR8HmV8LRk5CLD.jpg', 'http://localhost:5000/images/h8KiWkblGz0HcthaPn8plhGk.webp', 'http://localhost:5000/images/jXn5Dr6XuyU1FAdnb32OQ-RG.jpg', 'http://localhost:5000/images/2JQMld5XCUkI-sy9qlJNe74k.jpg', 'http://localhost:5000/images/q_XNsIfp5RGR0KJc2bNzKG0-.jpg', 'http://localhost:5000/images/SYlQDkjY-fmdYL697PKA8XzA.jpg', 'http://localhost:5000/images/IZCqcMchxk4jLtHeiSOwUH1t.jpg', '2023-04-14 11:44:02.630441');
INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (24, 'Atomic Heart', 'First Person Shooter', 44.99, 'Mundfish', 'Focus Entertainment', '2023-02-18', '<p>Welcome to a utopian world of wonders and perfection, in which humans live in harmony with their loyal and fervent robots.<br><br>Well, that''s how it used to be. With the launch of the latest robot-control system mere days away, only a tragic accident or a global conspiracy could disrupt it…<br><br>The unstoppable course of technology along with secret experiments have brought rise to mutant creatures, terrifying machines and superpowered robots—all suddenly rebelling against their creators. Only you can stop them and find out what lies behind the idealized world.<br><br>Using the combat abilities granted by your experimental power glove, your arsenal of blades and cutting-edge weaponry, fight for your life in explosive and frenetic encounters. Adapt your fighting style to each unique opponent. Combine your skills and resources, use the environment and upgrade your equipment to overcome challenges and fight for good.</p>', 'http://localhost:5000/images/aUqlhQ6xVSehZXCQRXARX8YO.jpg', 'http://localhost:5000/images/eIwXveQTLkjAVb-mHnHz0IKU.webp', 'http://localhost:5000/images/N3UtJQvu9_6eRmElw88HRGnp.jpg', 'http://localhost:5000/images/3LVzuvaVDFoCsbs_kCb7bWjG.jpg', 'http://localhost:5000/images/YnNtUnB2SSwrcW2CYHSmaPK2.jpg', 'http://localhost:5000/images/sPw6eD3xy15guuAxmb0__43k.jpg', 'http://localhost:5000/images/5u58t6TK6FcNNYt-nMHxZTvJ.jpg', '2023-04-14 11:47:19.84272');
INSERT INTO public.rsn_product (productid, title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4, created_at) VALUES (25, 'Marvel''s Spider-Man Remastered', 'Action', 24.99, 'Insomniac Games', 'PlayStation PC LLC', '2023-08-12', '<p>Marvel''s Spider-Man Remastered for PC is a refreshed version of the action adventure game from 2018. Featuring third person play, you take on the character of web-lord, Spider-Man, dealing with Peter Parker’s personal life as well as battling super-human villain Mister Negative – a villain’s name if there ever was one! – in his bid to take over New York’s underworld.<br><br><br><strong>About the Game</strong><br><br>Mister Negative plans to achieve his aims by unleashing a deadly virus on the city – a chilling forecast of Covid-19, perhaps. Spider-Man must jump, run, swing and use his webs to navigate the Manhattan borough in the fictionalised NYC, aiming webs precisely to achieve your goals. When Spidey is in too much of a hurry to swing, you can use fast travel by hopping on the subway.<br><br>The physics engine is great, allowing you to jump, swing, run and generally navigate around with a realistic, if somewhat superhuman – jumping higher, landing lighter etc – environment to play through. Popular already, the new game is still a solid play now improved and with four levels of difficulty to try out: Friendly, Amazing, Spectacular and the latterly introduced Ultimate corresponding to easy, medium, hard and challenging, respectively.<br><br>There is also a new mode: ‘New Game Plus,’ mode which allows you to start the game from scratch, but with all the suits and gadgets already unlocked so you can play more freely using all the gadgets and gizmos that you shouldn’t really have access to in the early stages.<br><br><br><strong>The Nitty Gritty</strong><br><br>The game has a lovely open world feel, with Spider-Man able to freely explore the city. He can also accept side quests, interact with NPCs, complete missions and earn tokens, which are the in-game currency which allows you to buy goodies, and unlock new suits and useful gadgets (such as electric webbing, impact webbing which pushes enemies away and makes them stick to whatever they bump into, concussive blast).<br><br>As you play along and progress through the game’s story arc, there are also collectibles to snatch up and additional content to unlock. As might be expected from a Spider-Man game, combat mainly involves web-slinging, using the environment to your best advantage and chaining attacks together to befuddle enemies rather than take them down in face-to-face combat.</p>', 'http://localhost:5000/images/LedO1iwwJ5c7Rh_yzYYm7Vql.jpg', 'http://localhost:5000/images/Or_RKg1tAC6NcYFyQMVUlwho.jpg', 'http://localhost:5000/images/AFn5FbZ18o3OnbbT0K5e41TH.jpg', 'http://localhost:5000/images/ysQtqnZ3w0n2aljEi1R6BmNh.jpg', 'http://localhost:5000/images/Mcu_g5i6cHNZPOwhlNSu2NJA.jpg', 'http://localhost:5000/images/ln_a-mfZzMg6ty6NT-0d1tC6.jpg', 'http://localhost:5000/images/D-6LJterIaScNO-23bZXP4Ln.jpg', '2023-04-14 12:05:46.958533');


--
-- TOC entry 3500 (class 0 OID 16519)
-- Dependencies: 217
-- Data for Name: rsn_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rsn_role (role_id, role_name) VALUES (1, 'admin');
INSERT INTO public.rsn_role (role_id, role_name) VALUES (2, 'user');


--
-- TOC entry 3502 (class 0 OID 24719)
-- Dependencies: 219
-- Data for Name: rsn_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rsn_user (userid, firstname, middlename, lastname, email, age, password, role_id, registered_at, walletid) VALUES (16, 'Bach', 'Nguyen Duy', 'Vo', 'bachvo01@gmail.com', 22, '$2a$12$hbeg3qHLp09SFjwKbluSx.T.0vlGlIeffADkeVAnsH0VuZdQRIywG', 2, '2023-04-09 11:25:17.911409', 16);
INSERT INTO public.rsn_user (userid, firstname, middlename, lastname, email, age, password, role_id, registered_at, walletid) VALUES (17, 'Andrew', 'Hy', 'Vo', 'andrewvnh97@gmal.com', 25, '$2a$12$qR3pmaXmOXekdlrBTw3giOkZWMSJhle1UW.Wbq17cCZidcMHIsUxq', 2, '2023-04-12 14:12:58.742275', 17);
INSERT INTO public.rsn_user (userid, firstname, middlename, lastname, email, age, password, role_id, registered_at, walletid) VALUES (18, 'John', '', 'Doe', 'johndoe@gmail.com', 34, '$2a$12$qR3pmaXmOXekdlrBTw3giOkZWMSJhle1UW.Wbq17cCZidcMHIsUxq', 2, '2023-04-12 14:14:19.287755', 18);
INSERT INTO public.rsn_user (userid, firstname, middlename, lastname, email, age, password, role_id, registered_at, walletid) VALUES (19, 'Bao', 'Gia', 'Nguyen', 'gbao123@gmail.com', 22, '$2a$12$xuy3LglOPmsVo0M1ICcHee0upak4gxBpcQqLIpra.1Pbn2lcY8vyC', 2, '2023-04-12 20:44:04.881684', 19);


--
-- TOC entry 3509 (class 0 OID 25060)
-- Dependencies: 226
-- Data for Name: rsn_wishlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rsn_wishlist (productid, userid, status, wished_at) VALUES (17, 16, true, '2023-04-12 14:12:08.423459');
INSERT INTO public.rsn_wishlist (productid, userid, status, wished_at) VALUES (14, 16, true, '2023-04-12 14:12:16.148971');
INSERT INTO public.rsn_wishlist (productid, userid, status, wished_at) VALUES (11, 17, true, '2023-04-12 14:13:11.915166');
INSERT INTO public.rsn_wishlist (productid, userid, status, wished_at) VALUES (16, 17, true, '2023-04-12 14:13:26.030684');
INSERT INTO public.rsn_wishlist (productid, userid, status, wished_at) VALUES (11, 18, true, '2023-04-12 14:14:31.646517');
INSERT INTO public.rsn_wishlist (productid, userid, status, wished_at) VALUES (17, 18, true, '2023-04-12 14:14:39.221912');
INSERT INTO public.rsn_wishlist (productid, userid, status, wished_at) VALUES (13, 16, true, '2023-04-13 01:08:26.177574');
INSERT INTO public.rsn_wishlist (productid, userid, status, wished_at) VALUES (21, 16, true, '2023-04-13 17:32:43.455751');
INSERT INTO public.rsn_wishlist (productid, userid, status, wished_at) VALUES (24, 16, true, '2023-04-14 12:24:42.824191');
INSERT INTO public.rsn_wishlist (productid, userid, status, wished_at) VALUES (16, 16, true, '2023-04-14 16:00:23.327419');
INSERT INTO public.rsn_wishlist (productid, userid, status, wished_at) VALUES (18, 16, true, '2023-04-14 16:04:49.832958');
INSERT INTO public.rsn_wishlist (productid, userid, status, wished_at) VALUES (25, 16, true, '2023-04-14 16:22:58.785336');


--
-- TOC entry 3531 (class 0 OID 0)
-- Dependencies: 215
-- Name: rsn_admin_adid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rsn_admin_adid_seq', 7, true);


--
-- TOC entry 3532 (class 0 OID 0)
-- Dependencies: 222
-- Name: rsn_cart_cartid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rsn_cart_cartid_seq', 78, true);


--
-- TOC entry 3533 (class 0 OID 0)
-- Dependencies: 224
-- Name: rsn_inventory_inventid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rsn_inventory_inventid_seq', 259, true);


--
-- TOC entry 3534 (class 0 OID 0)
-- Dependencies: 231
-- Name: rsn_order_items_itemid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rsn_order_items_itemid_seq', 85, true);


--
-- TOC entry 3535 (class 0 OID 0)
-- Dependencies: 229
-- Name: rsn_order_orderid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rsn_order_orderid_seq', 52, true);


--
-- TOC entry 3536 (class 0 OID 0)
-- Dependencies: 220
-- Name: rsn_product_productid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rsn_product_productid_seq', 25, true);


--
-- TOC entry 3537 (class 0 OID 0)
-- Dependencies: 218
-- Name: rsn_user_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rsn_user_userid_seq', 19, true);


--
-- TOC entry 3538 (class 0 OID 0)
-- Dependencies: 227
-- Name: rsn_user_walletid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rsn_user_walletid_seq', 19, true);


--
-- TOC entry 3324 (class 2606 OID 16514)
-- Name: rsn_admin rsn_admin_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_admin
    ADD CONSTRAINT rsn_admin_email_key UNIQUE (email);


--
-- TOC entry 3326 (class 2606 OID 16518)
-- Name: rsn_admin rsn_admin_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_admin
    ADD CONSTRAINT rsn_admin_email_unique UNIQUE (email);


--
-- TOC entry 3328 (class 2606 OID 16512)
-- Name: rsn_admin rsn_admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_admin
    ADD CONSTRAINT rsn_admin_pkey PRIMARY KEY (adid);


--
-- TOC entry 3336 (class 2606 OID 25018)
-- Name: rsn_cart rsn_cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_cart
    ADD CONSTRAINT rsn_cart_pkey PRIMARY KEY (cartid);


--
-- TOC entry 3340 (class 2606 OID 25111)
-- Name: rsn_credit rsn_credit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_credit
    ADD CONSTRAINT rsn_credit_pkey PRIMARY KEY (creditnumber);


--
-- TOC entry 3338 (class 2606 OID 25030)
-- Name: rsn_inventory rsn_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_inventory
    ADD CONSTRAINT rsn_inventory_pkey PRIMARY KEY (inventid);


--
-- TOC entry 3344 (class 2606 OID 25130)
-- Name: rsn_order_items rsn_order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_order_items
    ADD CONSTRAINT rsn_order_items_pkey PRIMARY KEY (itemid);


--
-- TOC entry 3342 (class 2606 OID 25118)
-- Name: rsn_order rsn_order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_order
    ADD CONSTRAINT rsn_order_pkey PRIMARY KEY (orderid);


--
-- TOC entry 3334 (class 2606 OID 24763)
-- Name: rsn_product rsn_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_product
    ADD CONSTRAINT rsn_product_pkey PRIMARY KEY (productid);


--
-- TOC entry 3330 (class 2606 OID 16523)
-- Name: rsn_role rsn_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_role
    ADD CONSTRAINT rsn_role_pkey PRIMARY KEY (role_id);


--
-- TOC entry 3332 (class 2606 OID 24727)
-- Name: rsn_user rsn_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_user
    ADD CONSTRAINT rsn_user_pkey PRIMARY KEY (userid);


--
-- TOC entry 3348 (class 2606 OID 25031)
-- Name: rsn_inventory fk_cartid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_inventory
    ADD CONSTRAINT fk_cartid FOREIGN KEY (cartid) REFERENCES public.rsn_cart(cartid);


--
-- TOC entry 3353 (class 2606 OID 25131)
-- Name: rsn_order_items fk_orderid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_order_items
    ADD CONSTRAINT fk_orderid FOREIGN KEY (orderid) REFERENCES public.rsn_order(orderid);


--
-- TOC entry 3349 (class 2606 OID 25036)
-- Name: rsn_inventory fk_productid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_inventory
    ADD CONSTRAINT fk_productid FOREIGN KEY (productid) REFERENCES public.rsn_product(productid);


--
-- TOC entry 3350 (class 2606 OID 25064)
-- Name: rsn_wishlist fk_productid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_wishlist
    ADD CONSTRAINT fk_productid FOREIGN KEY (productid) REFERENCES public.rsn_product(productid);


--
-- TOC entry 3354 (class 2606 OID 25136)
-- Name: rsn_order_items fk_productid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_order_items
    ADD CONSTRAINT fk_productid FOREIGN KEY (productid) REFERENCES public.rsn_product(productid);


--
-- TOC entry 3345 (class 2606 OID 16524)
-- Name: rsn_admin fk_role_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_admin
    ADD CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES public.rsn_role(role_id);


--
-- TOC entry 3346 (class 2606 OID 24728)
-- Name: rsn_user fk_roleid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_user
    ADD CONSTRAINT fk_roleid FOREIGN KEY (role_id) REFERENCES public.rsn_role(role_id);


--
-- TOC entry 3347 (class 2606 OID 25019)
-- Name: rsn_cart fk_userid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_cart
    ADD CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES public.rsn_user(userid);


--
-- TOC entry 3351 (class 2606 OID 25069)
-- Name: rsn_wishlist fk_userid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_wishlist
    ADD CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES public.rsn_user(userid);


--
-- TOC entry 3352 (class 2606 OID 25119)
-- Name: rsn_order fk_userid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsn_order
    ADD CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES public.rsn_user(userid);


-- Completed on 2023-04-25 17:24:09

--
-- PostgreSQL database dump complete
--

