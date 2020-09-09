CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    model TEXT NOT NULL,
    make TEXT NOT NULL,
    year INTEGER NOT NULL,
    description TEXT NOT NULL,
    manufacturer TEXT,
    scale TEXT
);