-- writing comment

CREATE TABLE films (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(50) NOT NULL,
  genre varchar(20) NOT NULL,
  synopsis varchar(150),
  price varchar(10) NOT NULL
);

INSERT INTO films
  (title, genre, synopsis, price)
VALUES
('Unpredictable Nature', 'Docummentary', 'beautiful shots of America', '20'),
('Leon 2: Secret son', 'Action', 'Jean Renos son has to avenge his father', '30'),
('Alice and Friends', 'Women Drama', 'Four women are discussing  various forms of marriage','15'),
('It 3: Game Over', 'Horror Parody', 'Parody of the famous horror adaptation', '24');

SELECT * FROM films;
