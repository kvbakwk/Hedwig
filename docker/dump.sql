CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO public.users VALUES 
(default, 'j.kawka@zsp9.elodz.edu.pl', 'Jakub', 'Kawka', 'zaq1@WSX'),
(default, 'a.kowalski@zsp9.elodz.edu.pl', 'Adam', 'Kowalski', 'zaq1@WSX'),
(default, 'n.kwiatkowska@zsp9.elodz.edu.pl', 'Natalia', 'Kwiatkowska', 'zaq1@WSX');

CREATE TABLE IF NOT EXISTS public.users_devices (
    user_id INT,
    device_id VARCHAR(100) PRIMARY KEY,
    expire_date TIMESTAMP
);