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

COMMIT;