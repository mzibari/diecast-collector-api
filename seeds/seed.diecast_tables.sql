BEGIN;

TRUNCATE
cars,
users,
reviews,
images
RESTART IDENTITY CASCADE;

INSERT INTO cars (model, make, year, description, manufacturer, scale)
VALUES 
('Skyline', 'Nissan', '1992', 'Greatest Japanese car of the ninties', 'HotWheels', '1/64'),
('Supra', 'Toyota', '1992', 'Great Japanese car', 'HotWheels', '1/64'),
('R8', 'Audi', '2010', 'Great German car', 'HotWheels', '1/64'),
('DeLorean', 'DMC', '1981', 'Back to the future iconic Time Machine', 'HotWheels', '1/64');

INSERT INTO users (username, email, user_password, is_admin)
VALUES 
('Mahmood', 'm.zibari@gmail.com', 'password1', true),
('Katie', 'm.katie@gmail.com', 'password2', false),
('Falafel', 'm.falafel@gmail.com', 'password3', false);

INSERT INTO reviews (user_id, car_id, review)
VALUES
(1, 1, 'Great car'),
(1, 2, 'Awesome car'),
(2, 1, 'Awful car');


COMMIT;