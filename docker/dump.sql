CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.users_devices (
    user_id INT REFERENCES public.users(id) NOT NULL,
    device_id VARCHAR(100) NOT NULL,
    expire_date TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS public.posts (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES public.users(id) NOT NULL,
    content VARCHAR(255) NOT NULL,
    create_date TIMESTAMP NOT NULL,
    anonymous BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS public.likes (
    id SERIAL PRIMARY KEY NOT NULL,
    post_id INT REFERENCES public.posts(id) NOT NULL,
    user_id INT REFERENCES public.users(id) NOT NULL,
    date TIMESTAMP NOT NULL
);


INSERT INTO public.users VALUES 
(DEFAULT, 'j.kawka@zsp9.elodz.edu.pl', 'Jakub', 'Kawka', 'zaq1@WSX'),
(DEFAULT, 'a.kowalski@zsp9.elodz.edu.pl', 'Adam', 'Kowalski', 'zaq1@WSX'),
(DEFAULT, 'n.kwiatkowska@zsp9.elodz.edu.pl', 'Natalia', 'Kwiatkowska', 'zaq1@WSX');

INSERT INTO public.posts VALUES
(DEFAULT, 1, 'Siemano widzowie', '2023-10-10 12:00:00', false),
(DEFAULT, 2, 'xdddd', '2023-10-10 12:01:00', false),
(DEFAULT, 1, 'aha', '2023-10-12 12:00:00', false);

INSERT INTO public.likes VALUES
(DEFAULT, 1, 3, '2023-10-12 12:00:00'),
(DEFAULT, 1, 2, '2023-10-10 12:01:00'),
(DEFAULT, 2, 1, '2023-10-12 12:00:00'),
(DEFAULT, 2, 3, '2023-10-12 12:00:00');
