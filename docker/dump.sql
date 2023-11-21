CREATE TABLE IF NOT EXISTS public.user (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_device (
    user_id INT REFERENCES public.user(id) NOT NULL,
    device_id VARCHAR(100) NOT NULL,
    expire_date TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS public.post (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES public.user(id) NOT NULL,
    content VARCHAR(255) NOT NULL,
    create_date TIMESTAMP NOT NULL,
    anonymous BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS public.like_user_post (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES public.user(id) NOT NULL,
    post_id INT REFERENCES public.post(id) NOT NULL,
    date TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS public.save_user_post (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES public.user(id) NOT NULL,
    post_id INT REFERENCES public.post(id) NOT NULL,
    date TIMESTAMP NOT NULL
);


INSERT INTO public.user VALUES 
(DEFAULT, 'j.kawka@zsp9.elodz.edu.pl', 'Jakub', 'Kawka', 'zaq1@WSX'),
(DEFAULT, 'o.konieczny@zsp9.elodz.edu.pl', 'Olaf', 'Konieczny', 'zaq1@WSX'),
(DEFAULT, 'a.grabarz@zsp9.elodz.edu.pl', 'Antoni', 'Grabarz', 'zaq1@WSX'),
(DEFAULT, 't.krol@zsp9.elodz.edu.pl', 'Tomasz', 'Krol', 'zaq1@WSX'),
(DEFAULT, 'k.kobalczyk@zsp9.elodz.edu.pl', 'Kacper', 'Kobalczyk', 'zaq1@WSX'),
(DEFAULT, 'j.kozlowski@zsp9.elodz.edu.pl', 'Jakub', 'Kozłowski', 'zaq1@WSX'),
(DEFAULT, 'm.garnys@zsp9.elodz.edu.pl', 'Michał', 'Garnys', 'zaq1@WSX'),
(DEFAULT, 'j.klepacz@zsp9.elodz.edu.pl', 'Jakub', 'Klepacz', 'zaq1@WSX'),
(DEFAULT, 'a.debczyk@zsp9.elodz.edu.pl', 'Aleksander', 'Dębczyk', 'zaq1@WSX'),
(DEFAULT, 'k.konopka@zsp9.elodz.edu.pl', 'Konrad', 'Konopka', 'zaq1@WSX');

INSERT INTO public.post VALUES
(DEFAULT, 1, 'Siemano widzowie', '2023-10-10 12:00:00', false),
(DEFAULT, 2, 'xdddd', '2023-10-10 12:01:00', false),
(DEFAULT, 1, 'aha', '2023-10-12 12:00:00', false);

INSERT INTO public.like_user_post VALUES
(DEFAULT, 3, 1, '2023-10-12 12:00:00'),
(DEFAULT, 2, 1, '2023-10-10 12:01:00'),
(DEFAULT, 1, 2, '2023-10-12 12:00:00'),
(DEFAULT, 3, 2, '2023-10-12 12:00:00');
