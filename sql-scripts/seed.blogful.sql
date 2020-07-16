BEGIN;

INSERT INTO blogful_articles (title, date_published, content)
VALUES
    ('Article 1', '2016-01-16 12:00:00', 'Content 1'),
    ('Article 2', '2016-05-01 15:00:00', 'Content 2'),
    ('Article 3', '2017-02-22 12:00:00', 'Content 3'),
    ('Article 4', '2017-04-04 08:00:00', 'Content 4'),
    ('Article 5', '2017-04-23 15:00:00', 'Content 5'),
    ('Article 6', '2017-08-11 13:00:00', 'Content 6'),
    ('Article 7', '2017-12-09 17:00:00', 'Content 7'),
    ('Article 8', '2018-01-24 19:00:00', 'Content 8'),
    ('Article 9', '2018-01-29 11:00:00', 'Content 9'),
    ('Article 10', '2018-02-13 05:00:00', 'Content 10'),
    ('Article 11', now() - '29 days'::INTERVAL, 'Content 11'),
    ('Article 12', now() - '29 days'::INTERVAL, 'Content 12'),
    ('Article 13', now() - '29 days'::INTERVAL, 'Content 13'),
    ('Article 14', now() - '29 days'::INTERVAL, 'Content 14'),
    ('Article 15', now() - '29 days'::INTERVAL, 'Content 15'),
    ('Article 16', now() - '29 days'::INTERVAL, 'Content 16'),
    ('Article 17', now() - '28 days'::INTERVAL, 'Content 17'),
    ('Article 18', now() - '28 days'::INTERVAL, 'Content 18'),
    ('Article 19', now() - '28 days'::INTERVAL, 'Content 19'),
    ('Article 20', now() - '28 days'::INTERVAL, 'Content 20');

COMMIT;