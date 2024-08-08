INSERT INTO 
    users (email, password)
VALUES
    ('a@gmail.com', '1234'),
    ('b@gmail.com', '1234');


INSERT INTO 
    products (title, price, description, image)
VALUES
    ('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
     '109.95',
     'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
     'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
     ),
    ('Solid Gold Petite Micropave',
     '168.00',
     'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
     'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg'
     );

INSERT INTO 
    carts (user_id, product_id, quantity)
VALUES
    ('1','1','1'),
    ('2','1','1'),
    ('2','2','1');