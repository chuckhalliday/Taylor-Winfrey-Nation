--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: charlesclark
--

CREATE TABLE public.cart_items (
    id bigint NOT NULL,
    session_id integer,
    product_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    quantity integer
);


ALTER TABLE public.cart_items OWNER TO charlesclark;

--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: charlesclark
--

CREATE SEQUENCE public.cart_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_items_id_seq OWNER TO charlesclark;

--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: charlesclark
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: discount; Type: TABLE; Schema: public; Owner: charlesclark
--

CREATE TABLE public.discount (
    id bigint NOT NULL,
    name character varying,
    description text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    discount_percent numeric,
    active boolean
);


ALTER TABLE public.discount OWNER TO charlesclark;

--
-- Name: discount_id_seq; Type: SEQUENCE; Schema: public; Owner: charlesclark
--

CREATE SEQUENCE public.discount_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_id_seq OWNER TO charlesclark;

--
-- Name: discount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: charlesclark
--

ALTER SEQUENCE public.discount_id_seq OWNED BY public.discount.id;


--
-- Name: order_details; Type: TABLE; Schema: public; Owner: charlesclark
--

CREATE TABLE public.order_details (
    id bigint NOT NULL,
    user_id integer,
    payment_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    total numeric
);


ALTER TABLE public.order_details OWNER TO charlesclark;

--
-- Name: order_details_id_seq; Type: SEQUENCE; Schema: public; Owner: charlesclark
--

CREATE SEQUENCE public.order_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_details_id_seq OWNER TO charlesclark;

--
-- Name: order_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: charlesclark
--

ALTER SEQUENCE public.order_details_id_seq OWNED BY public.order_details.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: charlesclark
--

CREATE TABLE public.order_items (
    id bigint NOT NULL,
    order_id integer,
    product_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    quantity integer
);


ALTER TABLE public.order_items OWNER TO charlesclark;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: charlesclark
--

CREATE SEQUENCE public.order_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_items_id_seq OWNER TO charlesclark;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: charlesclark
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: payment_details; Type: TABLE; Schema: public; Owner: charlesclark
--

CREATE TABLE public.payment_details (
    id bigint NOT NULL,
    order_id integer,
    amount integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    provider character varying,
    status character varying
);


ALTER TABLE public.payment_details OWNER TO charlesclark;

--
-- Name: payment_details_id_seq; Type: SEQUENCE; Schema: public; Owner: charlesclark
--

CREATE SEQUENCE public.payment_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payment_details_id_seq OWNER TO charlesclark;

--
-- Name: payment_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: charlesclark
--

ALTER SEQUENCE public.payment_details_id_seq OWNED BY public.payment_details.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: charlesclark
--

CREATE TABLE public.product (
    id bigint NOT NULL,
    name character varying,
    description text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    sku character varying,
    price numeric,
    category_id integer,
    inventory_id integer,
    discount_id integer
);


ALTER TABLE public.product OWNER TO charlesclark;

--
-- Name: product_category; Type: TABLE; Schema: public; Owner: charlesclark
--

CREATE TABLE public.product_category (
    id bigint NOT NULL,
    name character varying,
    description text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.product_category OWNER TO charlesclark;

--
-- Name: product_category_id_seq; Type: SEQUENCE; Schema: public; Owner: charlesclark
--

CREATE SEQUENCE public.product_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_category_id_seq OWNER TO charlesclark;

--
-- Name: product_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: charlesclark
--

ALTER SEQUENCE public.product_category_id_seq OWNED BY public.product_category.id;


--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: charlesclark
--

CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO charlesclark;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: charlesclark
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: product_inventory; Type: TABLE; Schema: public; Owner: charlesclark
--

CREATE TABLE public.product_inventory (
    id bigint NOT NULL,
    quantity integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.product_inventory OWNER TO charlesclark;

--
-- Name: product_inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: charlesclark
--

CREATE SEQUENCE public.product_inventory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_inventory_id_seq OWNER TO charlesclark;

--
-- Name: product_inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: charlesclark
--

ALTER SEQUENCE public.product_inventory_id_seq OWNED BY public.product_inventory.id;


--
-- Name: shopping_session; Type: TABLE; Schema: public; Owner: charlesclark
--

CREATE TABLE public.shopping_session (
    id bigint NOT NULL,
    user_id integer,
    total numeric,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.shopping_session OWNER TO charlesclark;

--
-- Name: shopping_session_id_seq; Type: SEQUENCE; Schema: public; Owner: charlesclark
--

CREATE SEQUENCE public.shopping_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shopping_session_id_seq OWNER TO charlesclark;

--
-- Name: shopping_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: charlesclark
--

ALTER SEQUENCE public.shopping_session_id_seq OWNED BY public.shopping_session.id;


--
-- Name: user_address; Type: TABLE; Schema: public; Owner: charlesclark
--

CREATE TABLE public.user_address (
    id bigint NOT NULL,
    user_id integer,
    address_line1 character varying,
    address_line2 character varying,
    city character varying,
    postal_code character varying,
    country character varying,
    telephone integer,
    mobile integer
);


ALTER TABLE public.user_address OWNER TO charlesclark;

--
-- Name: user_address_id_seq; Type: SEQUENCE; Schema: public; Owner: charlesclark
--

CREATE SEQUENCE public.user_address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_address_id_seq OWNER TO charlesclark;

--
-- Name: user_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: charlesclark
--

ALTER SEQUENCE public.user_address_id_seq OWNED BY public.user_address.id;


--
-- Name: user_payment; Type: TABLE; Schema: public; Owner: charlesclark
--

CREATE TABLE public.user_payment (
    id bigint NOT NULL,
    user_id integer,
    payment_type character varying,
    provider character varying,
    account_no integer,
    expiration date
);


ALTER TABLE public.user_payment OWNER TO charlesclark;

--
-- Name: user_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: charlesclark
--

CREATE SEQUENCE public.user_payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_payment_id_seq OWNER TO charlesclark;

--
-- Name: user_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: charlesclark
--

ALTER SEQUENCE public.user_payment_id_seq OWNED BY public.user_payment.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: charlesclark
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying,
    passcode text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    first_name character varying,
    last_name character varying,
    telephone integer
);


ALTER TABLE public.users OWNER TO charlesclark;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: charlesclark
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO charlesclark;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: charlesclark
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: discount id; Type: DEFAULT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.discount ALTER COLUMN id SET DEFAULT nextval('public.discount_id_seq'::regclass);


--
-- Name: order_details id; Type: DEFAULT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.order_details ALTER COLUMN id SET DEFAULT nextval('public.order_details_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: payment_details id; Type: DEFAULT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.payment_details ALTER COLUMN id SET DEFAULT nextval('public.payment_details_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: product_category id; Type: DEFAULT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.product_category ALTER COLUMN id SET DEFAULT nextval('public.product_category_id_seq'::regclass);


--
-- Name: product_inventory id; Type: DEFAULT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.product_inventory ALTER COLUMN id SET DEFAULT nextval('public.product_inventory_id_seq'::regclass);


--
-- Name: shopping_session id; Type: DEFAULT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.shopping_session ALTER COLUMN id SET DEFAULT nextval('public.shopping_session_id_seq'::regclass);


--
-- Name: user_address id; Type: DEFAULT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.user_address ALTER COLUMN id SET DEFAULT nextval('public.user_address_id_seq'::regclass);


--
-- Name: user_payment id; Type: DEFAULT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.user_payment ALTER COLUMN id SET DEFAULT nextval('public.user_payment_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: charlesclark
--

COPY public.cart_items (id, session_id, product_id, created_at, modified_at, quantity) FROM stdin;
\.


--
-- Data for Name: discount; Type: TABLE DATA; Schema: public; Owner: charlesclark
--

COPY public.discount (id, name, description, created_at, modified_at, deleted_at, discount_percent, active) FROM stdin;
\.


--
-- Data for Name: order_details; Type: TABLE DATA; Schema: public; Owner: charlesclark
--

COPY public.order_details (id, user_id, payment_id, created_at, modified_at, total) FROM stdin;
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: charlesclark
--

COPY public.order_items (id, order_id, product_id, created_at, modified_at, quantity) FROM stdin;
\.


--
-- Data for Name: payment_details; Type: TABLE DATA; Schema: public; Owner: charlesclark
--

COPY public.payment_details (id, order_id, amount, created_at, modified_at, provider, status) FROM stdin;
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: charlesclark
--

COPY public.product (id, name, description, created_at, modified_at, deleted_at, sku, price, category_id, inventory_id, discount_id) FROM stdin;
\.


--
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: charlesclark
--

COPY public.product_category (id, name, description, created_at, modified_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: product_inventory; Type: TABLE DATA; Schema: public; Owner: charlesclark
--

COPY public.product_inventory (id, quantity, created_at, modified_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: shopping_session; Type: TABLE DATA; Schema: public; Owner: charlesclark
--

COPY public.shopping_session (id, user_id, total, created_at, modified_at) FROM stdin;
\.


--
-- Data for Name: user_address; Type: TABLE DATA; Schema: public; Owner: charlesclark
--

COPY public.user_address (id, user_id, address_line1, address_line2, city, postal_code, country, telephone, mobile) FROM stdin;
\.


--
-- Data for Name: user_payment; Type: TABLE DATA; Schema: public; Owner: charlesclark
--

COPY public.user_payment (id, user_id, payment_type, provider, account_no, expiration) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: charlesclark
--

COPY public.users (id, username, passcode, created_at, modified_at, first_name, last_name, telephone) FROM stdin;
1	chuckhalliday	April2022!	2022-04-12 17:46:04.435562-07	2022-04-12 17:46:04.435562-07	Charles	Clark	2034554279
\.


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: charlesclark
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- Name: discount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: charlesclark
--

SELECT pg_catalog.setval('public.discount_id_seq', 1, false);


--
-- Name: order_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: charlesclark
--

SELECT pg_catalog.setval('public.order_details_id_seq', 1, false);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: charlesclark
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- Name: payment_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: charlesclark
--

SELECT pg_catalog.setval('public.payment_details_id_seq', 1, false);


--
-- Name: product_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: charlesclark
--

SELECT pg_catalog.setval('public.product_category_id_seq', 1, false);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: charlesclark
--

SELECT pg_catalog.setval('public.product_id_seq', 1, false);


--
-- Name: product_inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: charlesclark
--

SELECT pg_catalog.setval('public.product_inventory_id_seq', 1, false);


--
-- Name: shopping_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: charlesclark
--

SELECT pg_catalog.setval('public.shopping_session_id_seq', 1, false);


--
-- Name: user_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: charlesclark
--

SELECT pg_catalog.setval('public.user_address_id_seq', 1, false);


--
-- Name: user_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: charlesclark
--

SELECT pg_catalog.setval('public.user_payment_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: charlesclark
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: discount discount_pkey; Type: CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.discount
    ADD CONSTRAINT discount_pkey PRIMARY KEY (id);


--
-- Name: order_details order_details_pkey; Type: CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: payment_details payment_details_pkey; Type: CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.payment_details
    ADD CONSTRAINT payment_details_pkey PRIMARY KEY (id);


--
-- Name: product_category product_category_pkey; Type: CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_pkey PRIMARY KEY (id);


--
-- Name: product_inventory product_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.product_inventory
    ADD CONSTRAINT product_inventory_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: shopping_session shopping_session_pkey; Type: CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.shopping_session
    ADD CONSTRAINT shopping_session_pkey PRIMARY KEY (id);


--
-- Name: user_address user_address_pkey; Type: CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.user_address
    ADD CONSTRAINT user_address_pkey PRIMARY KEY (id);


--
-- Name: user_payment user_payment_pkey; Type: CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.user_payment
    ADD CONSTRAINT user_payment_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: cart_items cart_items_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.shopping_session(id);


--
-- Name: order_details order_details_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payment_details(id);


--
-- Name: order_details order_details_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.order_details(id);


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: product product_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.product_category(id);


--
-- Name: product product_discount_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES public.discount(id);


--
-- Name: product product_inventory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_inventory_id_fkey FOREIGN KEY (inventory_id) REFERENCES public.product_inventory(id);


--
-- Name: shopping_session shopping_session_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.shopping_session
    ADD CONSTRAINT shopping_session_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_address user_address_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.user_address
    ADD CONSTRAINT user_address_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_payment user_payment_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: charlesclark
--

ALTER TABLE ONLY public.user_payment
    ADD CONSTRAINT user_payment_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

