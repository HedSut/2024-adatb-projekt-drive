CREATE TABLE "users" (
    "username" VARCHAR(100) NOT NULL PRIMARY KEY,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "usertype" VARCHAR(10) NOT NULL,
);

CREATE TABLE "folder" (
    "id" INTEGER GENERATED ALWAYS as IDENTITY PRIMARY KEY,
    "folder_name" VARCHAR(100) NOT NULL,
    "parent_id" INTEGER,
    "owner_user" VARCHAR(100) NOT NULL,
    "visibility" VARCHAR(20) NOT NULL,
    "createDate" TIMESTAMP NOT NULL,
    CONSTRAINT "folder_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "folder" ("id") ON DELETE CASCADE,
    CONSTRAINT "folder_owner_fk" FOREIGN KEY ("owner_user") REFERENCES "users" ("username") ON DELETE CASCADE
);

CREATE TABLE "file" (
    "id" INTEGER GENERATED ALWAYS as IDENTITY PRIMARY KEY,
    "parent_id" INTEGER NOT NULL,
    "owner_user" VARCHAR(100) NOT NULL,
    "file_name" VARCHAR(100) NOT NULL,
    "visibility" VARCHAR(20) NOT NULL,
    "createDate" TIMESTAMP NOT NULL,
    "filetype" VARCHAR(10) NOT NULL, 
    CONSTRAINT "file_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "folder" ("id") ON DELETE CASCADE,
    CONSTRAINT "file_owner_fk" FOREIGN KEY ("owner_user") REFERENCES "users" ("username") ON DELETE CASCADE
);

CREATE TABLE "comment" (
    "id" INTEGER GENERATED ALWAYS as IDENTITY PRIMARY KEY,
    "author" VARCHAR(100) NOT NULL,
    "file_id" INTEGER NOT NULL,
    "comment_text" VARCHAR(1000) NOT NULL,
    "createDate" TIMESTAMP NOT NULL,
    CONSTRAINT "comment_author_fk" FOREIGN KEY ("author") REFERENCES "users" ("username") ON DELETE CASCADE,
    CONSTRAINT "comment_file_fk" FOREIGN KEY ("file_id") REFERENCES "file" ("id") ON DELETE CASCADE
);

CREATE TABLE "foldershare" (
    "username" VARCHAR(100) NOT NULL,
    "folderid" INTEGER NOT NULL,
    CONSTRAINT "foldershare_pk" PRIMARY KEY ("username", "folderid"),
    CONSTRAINT "foldershare_username_fk" FOREIGN KEY ("username") REFERENCES "users" ("username") ON DELETE CASCADE,
    CONSTRAINT "foldershare_folderid_fk" FOREIGN KEY ("folderid") REFERENCES "folder" ("id") ON DELETE CASCADE
);

CREATE TABLE "fileshare" (
    "username" VARCHAR(100) NOT NULL,
    "fileid" INTEGER NOT NULL,
    CONSTRAINT "fileshare_pk" PRIMARY KEY ("username", "fileid"),
    CONSTRAINT "fileshare_username_fk" FOREIGN KEY ("username") REFERENCES "users" ("username") ON DELETE CASCADE,
    CONSTRAINT "fileshare_fileid_fk" FOREIGN KEY ("fileid") REFERENCES "file" ("id") ON DELETE CASCADE
);

CREATE TABLE "bookmark" (
    "username" VARCHAR(100) NOT NULL,
    "fileid" INTEGER NOT NULL,
    CONSTRAINT "bookmark_pk" PRIMARY KEY ("username", "fileid"),
    CONSTRAINT "bookmark_username_fk" FOREIGN KEY ("username") REFERENCES "users" ("username") ON DELETE CASCADE,
    CONSTRAINT "bookmark_fileid_fk" FOREIGN KEY ("fileid") REFERENCES "file" ("id") ON DELETE CASCADE
);

CREATE TABLE "rating" (
    "username" VARCHAR(100) NOT NULL,
    "fileid" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,
    CONSTRAINT "rating_pk" PRIMARY KEY ("username", "fileid"),
    CONSTRAINT "rating_username_fk" FOREIGN KEY ("username") REFERENCES "users" ("username") ON DELETE CASCADE,
    CONSTRAINT "rating_fileid_fk" FOREIGN KEY ("fileid") REFERENCES "file" ("id") ON DELETE CASCADE
);

INSERT INTO "users" ("username", "email", "password") VALUES ('tesztelek0', 'tesztelek0@gmail.com', 'Dv3xG03h6YnydzocazTL8PicZi7jTFxABchoiHg3FKBH57f8Lf3XHPYWQlsrzxkY');
INSERT INTO "users" ("username", "email", "password") VALUES ('tesztelek1', 'tesztelek1@gmail.com', '5DL3kfnHSIzSK7vTth65LpJ05AIJmwIF2u93Ul0gyV2MA2SwnVRgo48BtTs2hkss');
INSERT INTO "users" ("username", "email", "password") VALUES ('tesztelek2', 'tesztelek2@gmail.com', 'aBmAQATMg1Cvr8aMOBdtwzH7A6Ys4Ppn8YLaAmp1j7nYKKIBsV9Xj0xjn2tTkJBF');
INSERT INTO "users" ("username", "email", "password") VALUES ('tesztelek3', 'tesztelek3@gmail.com', 'Q9BHPsmzNP95t2Yp9ghaoQNopwpWF3W1tDHiaw3K8SMJQrVLfYLZyTo8sTbyMD6k');
INSERT INTO "users" ("username", "email", "password") VALUES ('tesztelek4', 'tesztelek4@gmail.com', 'QJP0CVosoUvkVpIxMHeND73DcjBJt0iXe3WeRbUoPvAgyrmdd3I3gigPWO5v8Kl1');
INSERT INTO "users" ("username", "email", "password") VALUES ('tesztelek5', 'tesztelek5@gmail.com', 'iuUAcQPqcLLWDqglEd2rezXwHvkNS4n0sXFmpNXIsEVGutQS4V6oA2LWrbEEcJCq');
INSERT INTO "users" ("username", "email", "password") VALUES ('tesztelek6', 'tesztelek6@gmail.com', 'ZraTFyb1w7sIhNBVpEsgtJslssBASuIcdExYVChOVPZfY1m3Pqh2K1C8uIRwczcA');
INSERT INTO "users" ("username", "email", "password") VALUES ('tesztelek7', 'tesztelek7@gmail.com', 'bJUbyDyamqXayRc0F21KPxi9HDmlthB5SgNRO20mP0uRKkCxhZ5k6ysOL5apC2Kw');
INSERT INTO "users" ("username", "email", "password") VALUES ('tesztelek8', 'tesztelek8@gmail.com', 'uK16eX8e07042O8GRjbdzTxQD8CJ8zykJhQ0Y3JOdDPAx7UN7X7WfkrryMVeQc3o');
INSERT INTO "users" ("username", "email", "password") VALUES ('tesztelek9', 'tesztelek9@gmail.com', 'lkJ1R26CvkOB5aymRtK0O9m0zkUosx8EDFzbnaUTfiO5GUuLQPdmgGawBX1PEDNC');

INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('tesztelek0', '', 'tesztelek0', 'private', TIMESTAMP '2018-11-8 3:30:44');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('tesztelek1', '', 'tesztelek1', 'private', TIMESTAMP '2005-9-20 9:4:12');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('tesztelek2', '', 'tesztelek2', 'private', TIMESTAMP '2021-10-7 3:30:31');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('tesztelek3', '', 'tesztelek3', 'private', TIMESTAMP '2011-9-18 20:48:9');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('tesztelek4', '', 'tesztelek4', 'private', TIMESTAMP '2001-2-2 7:49:19');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('tesztelek5', '', 'tesztelek5', 'private', TIMESTAMP '2022-3-3 19:29:30');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('tesztelek6', '', 'tesztelek6', 'private', TIMESTAMP '2002-11-5 6:14:45');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('tesztelek7', '', 'tesztelek7', 'private', TIMESTAMP '2003-9-17 13:37:12');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('tesztelek8', '', 'tesztelek8', 'private', TIMESTAMP '2002-9-4 1:48:8');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('tesztelek9', '', 'tesztelek9', 'private', TIMESTAMP '2003-4-14 16:45:26');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('Kepek', '1', 'tesztelek0', 'private', TIMESTAMP '2024-2-17 0:54:23');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('Doksik', '1', 'tesztelek0', 'private', TIMESTAMP '2005-12-1 15:34:30');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('Videok', '1', 'tesztelek0', 'private', TIMESTAMP '2024-2-3 0:52:27');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('Jatekok', '2', 'tesztelek1', 'private', TIMESTAMP '2019-1-2 4:45:55');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('hazik', '2', 'tesztelek1', 'private', TIMESTAMP '2024-9-20 12:1:14');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('kepeim', '3', 'tesztelek2', 'private', TIMESTAMP '2000-6-3 2:16:43');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('random_dolgok', '3', 'tesztelek2', 'private', TIMESTAMP '2005-5-1 2:34:18');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('hazi', '12', 'tesztelek0', 'private', TIMESTAMP '2002-6-3 1:21:8');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('beadando', '18', 'tesztelek0', 'private', TIMESTAMP '2016-2-14 0:38:56');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('kepek', '4', 'tesztelek3', 'private', TIMESTAMP '2009-5-28 8:48:36');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('video', '5', 'tesztelek4', 'private', TIMESTAMP '2004-11-9 9:14:12');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('doksi', '5', 'tesztelek4', 'private', TIMESTAMP '2001-8-10 17:56:23');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('jatekok', '6', 'tesztelek5', 'private', TIMESTAMP '2019-1-22 13:4:56');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('jatekaim', '7', 'tesztelek6', 'private', TIMESTAMP '2012-4-17 16:38:51');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('hazi_feladat', '7', 'tesztelek6', 'private', TIMESTAMP '2016-12-17 15:52:22');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('angol', '7', 'tesztelek6', 'private', TIMESTAMP '2013-10-13 14:1:50');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('suli', '8', 'tesztelek7', 'private', TIMESTAMP '2010-7-13 19:35:38');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('nemet', '9', 'tesztelek8', 'private', TIMESTAMP '2010-9-18 12:25:14');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('ballagas', '10', 'tesztelek9', 'private', TIMESTAMP '2003-12-3 2:0:24');
INSERT INTO "folder" ("folder_name", "parent_id", "owner_user", "visibility", "createDate") VALUES ('erettsegi', '10', 'tesztelek9', 'private', TIMESTAMP '2022-8-16 9:10:1');

INSERT INTO "file" ("parent_id", "owner_user", "file_name", "visibility", "createDate", "filetype") VALUES ('1', 'tesztelek0', 'en.jpg', 'private', TIMESTAMP '2021-8-27 0:40:50', 'jpg');
INSERT INTO "file" ("parent_id", "owner_user", "file_name", "visibility", "createDate", "filetype") VALUES ('1', 'tesztelek1', 'bizonyitvany.jpg', 'private', TIMESTAMP '2007-1-15 22:24:46', 'jpg');
INSERT INTO "file" ("parent_id", "owner_user", "file_name", "visibility", "createDate", "filetype") VALUES ('1', 'tesztelek2', 'pisti.jpg', 'private', TIMESTAMP '2010-7-21 15:7:25', 'jpg');
INSERT INTO "file" ("parent_id", "owner_user", "file_name", "visibility", "createDate", "filetype") VALUES ('12',  'tesztelek3', 'hazi.docx', 'private', TIMESTAMP '2014-10-26 14:46:3', 'docx');
INSERT INTO "file" ("parent_id", "owner_user", "file_name", "visibility", "createDate", "filetype") VALUES ('15', 'tesztelek4', 'hazi.xlsx', 'private', TIMESTAMP '2002-12-28 13:49:42', 'xlsx');
INSERT INTO "file" ("parent_id", "owner_user", "file_name", "visibility", "createDate", "filetype") VALUES ('12', 'tesztelek5', 'angol_hazi.docx', 'private', TIMESTAMP '2021-2-16 12:50:22', 'docx');
INSERT INTO "file" ("parent_id", "owner_user", "file_name", "visibility", "createDate", "filetype") VALUES ('15', 'tesztelek6', 'fogalmazas.docx', 'private', TIMESTAMP '2003-9-21 8:23:0', 'docx');
INSERT INTO "file" ("parent_id", "owner_user", "file_name", "visibility", "createDate", "filetype") VALUES ('17', 'tesztelek7', 'jelszavak.txt', 'private', TIMESTAMP '2006-5-3 15:9:57', 'txt');
INSERT INTO "file" ("parent_id", "owner_user", "file_name", "visibility", "createDate", "filetype") VALUES ('17', 'tesztelek8', 'random.txt', 'private', TIMESTAMP '2018-5-24 17:58:55', 'txt');
INSERT INTO "file" ("parent_id", "owner_user", "file_name", "visibility", "createDate", "filetype") VALUES ('3',  'tesztelek9', 'jatek.exe', 'private', TIMESTAMP '2022-2-12 12:16:48', 'exe');

INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek0', '1', '1aHDrzzoLkj9tE7WUUS6cY8XR54OWCLJIQ4ma7tBBA1o7THBBYEdEReklMb3oCdCUGMz92ezsd25L2klyYwBoA5m4bQqKtY15VfEFD4YEpDsI5mNmVCuTjSJK3bb7TcOYTsJbCMI7CDJlYMOSRY5MG7iqDhn6YB2k5nc97PB8B47jR0T4TO7LiG5io7KD6I3O1T7lodY', TIMESTAMP '2009-3-5 17:25:26');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek1', '2', 'LBLuMhO0qMLeBzZvKB9jDYGpYwykt2U8BN5UpokuRG8MKwYHxphb9SoXjyNbelKokYFjRt3t6LthEdDHaMX9Oo2FI3l1iiKZWQBDFNHsvvG0aetcf3Xlj6wTtXlGBt6xCqbK9Uwxdv6GnX6EWMZzNNb130FAwBo1RrIm9HtGZAPpVFABaQep9kY0mP16iz1iuQztOjGU', TIMESTAMP '2021-1-10 20:6:3');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek2', '3', '41RbKhe7hqr2S5rsC8LWnekGX9RPDnUHu0HwbfI2vS6oPqrIKHRTw1GV3V7Cl3ZdJVAcl2LqW7RhZljPxmTOsudiwIXjw15Gzw30YjWH0kkowHUXdo1dwJTrZXtnMybEoiWrWMKsEFPNtpRjAGPUn1qfuzUiDVCh0c3xxuPU5ffv8u6t0nt6hfFNBqMiFTq8rTa1yyCu', TIMESTAMP '2001-12-11 14:35:21');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek3', '4', 'jR99qZ8wyrxZQj7LO6QRrTmtvVxIEBX0mSTkJt1MxAlfSj1kFWil4QYE7xlOTN5pHgLeqC6dCxEi4OIuLpXQ15UJJe5zbinxihevMOxtrBRraObsRdaBIBsaZg7v5YBfpOaGLH9aMI9MhDDeFX4hqDJJFr0je4motegsA9PL0ZEwG2phILplS9ENgKBOzmJw9SZF41G8', TIMESTAMP '2006-2-15 12:42:11');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek4', '5', 'e8uUT5B7GcKBnnkwqKbRFKhU9yIuWwUNVL9HHtU9hT0VuBqES8IOdKztNFTAjGsJjQOjrvZw0i4X8kJZ5s8iey15PRSODw0VkVlhfJwzbdHyyjqD0px46IUdQ8RsLBhi35ANPOiEK0HUGZlQ0btG6ChHeognX1RsBWerEUL2EPp5S1p2N9fTiNOfJcXzMxs9n8M068Vv', TIMESTAMP '2012-10-2 12:35:12');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek5', '6', 'ENqZXHrdc51U4lMQWyxegKLeZb1Lb5EAbPhCQTPqzmwGHmb5lSHTJh0n9O0MLhKB7PMIa4MMklUPWNCb5AuupYcZnx1TjPgiecm4DN9w7xmM0jx2FLL950x58ZuK909IY2KBCzGl03cLrvxHwp9I8fVrGj5W8RaR4YSd8OXAWCIzbwQlpoDU8FqAtcsrDxlaRX6Bsl2R', TIMESTAMP '2015-5-3 11:10:38');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek6', '7', 'YHKqaExT4qQLwH7IxgDvK4LAPp0mPhgpfFZkWFw5WZO3g5N67hSX2mTTPfazlwAyfdrtcWluXHPdHFG8Se7qcUkUp4QlSUD7jO0za2m4EUlA0NOZ7UGRY4cWn1u35vsYhXY0JHu16z5fb6ig366BxHGkObimN2WKmMb6naiB483ghwuUzlYK5ipnNPqDYnlVLDlkpVP8', TIMESTAMP '2022-6-21 3:43:42');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek7', '8', '1IcNjyyhlivnuqu3mTT3JpPytRc6pEIeZDRd0rKPO62JJL4MQhjYuNhGf5yzxku7OFvN7rEjkoG66bGrfE1a3KZzY60lADiIMdwjc9QUwwolUBPkFYHU99lnUif5LXGBaodnNjsz6iNfjLCB3eXqo5yhttuWuW8YLyQNQ9ElHdEQMpEAGKdNXdUh1ABeHGtVQS8dzute', TIMESTAMP '2018-1-19 12:14:7');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek8', '9', '6oNEBWzw6C7GDlqS8eKJLgcRVCyZsd65tLbYBZdEmJ9OxscfUu5yDIjkGpYNRVhFyRb1iSab2Uc7KCg4Ddj4PXbS6WLXuwSUNJPBCjM9HEWI4S3mE8We8UXyO7x85q6KuyajsO8Rpdfh0nb88pDS5zHF4zCtbH3B0aU5dZzxathth5sfoo1pH3FZA4RA7midRE7QQpoX', TIMESTAMP '2003-3-22 18:13:16');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek3', '1', 'I1u49gquDE1MJxyYNyHjCpHNq0ElV0QXjX8xDsf8ke7fiumTB77FSD9Mu3wQelB0m31gEq2IT45ptrjBLc5jFtZbRx9QkCNtlUfruoTYPkgJMVMn55eEhj34T8ynBstbZT3pCKZXhx73ExaIzQSz2DcCjyv9JUKmnsIwemxuPQ2AtBVweqGwXufS5xWrjaLxzYO1GlFK', TIMESTAMP '2001-1-5 16:16:3');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek2', '2', '9K50K754l2BkWtGhFeSS9WfxIMBWYQPawqFxXxgIAbq9KhLjn471BmEVuN1AaJ6MJ53SLQ5YGhR8twEH1Fa60XOPbQwPSy7UuBcQqKPhGr8IrGGMTSPGB0noRnMzUaekrYpvRSlDyHLY8uinhIEX9gweIYNfRVtFwY0aaJ2QFydTdbE2esW9sfAu5A6KPGGuGK2acHU3', TIMESTAMP '2002-4-16 15:11:6');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek4', '3', 'ayBsUw61tTFXwaXMEKEyxqPROeCkwFFKKvhXpA0C5p89Lc6tB6gn1LJE3t77ReFbEzB3xftQuXtU9Ldirrr32qoBlZuI8HG54fM94zAJrDj73D5HZLeQDb7xDhcXWeyvLyBMuP1lVhqaOeePPVHBfJUtBkx3AIpl9ANRPqSe8W8YEr7BQDvbLoeHnUmqZuVF2EqkPz3U', TIMESTAMP '2014-10-12 17:59:9');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek6', '4', 'p74ZQAC1keYeeP7E94WT9oAw4EDONrS06nJuVYTwU9BZN7cI5WdHOsAUNvAljatP6GTbmfS7RjiLdkZUDhKXmyQMcHwXFXapG7mlJGZKpjqTS7Zmdy5WdNTsiCQYA8PLu9lCpHDIqKMVDA0lkjCotWwb9gSco5KJAXpZxpVYAvpbKQLA5e1yDAnk4GGosutL5y2SwCVP', TIMESTAMP '2005-9-4 8:16:17');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek7', '5', 'l5NjAEq4ASWuDAzM1gjjP3CpnwB6KAYai4az1XD20J9Z6TvstdBA0U2Pa5seQpwJaqIaAOM1Qn9HVBo53gNDmhHUW7IrwDQlcoZ4XfRVCWGmViYTTkMYdm554hCME8kyiMrzWC6fgGTvpI4DiTtwl40cxx4UtWWefATiukjFF1JcbMGyPmwn8YuPAQcEPHMFqHWDzTdn', TIMESTAMP '2021-9-20 10:37:53');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek8', '6', 'BusJiyg7LWmwPG5iXggJWl6Jl72bAUuzkmpGG8AOZAKpcKRiP1uiYbCLmr5xtV1FvjFi2B7ian23B1fc8w5yVjbqZv0ebWxPM2P4oaRNaW6hmB2H1FUEUN0rbjZ5oLV3vhprTS9d4mCv8SKzWaUfe36Y2rGqbYlSnvJhsugf14RjaejYEeTTv1hCQWn1qbtr5T91W8ub', TIMESTAMP '2012-11-10 10:6:27');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek2', '7', 'W7uWlbmIern0p33FW7xboo529ETPolQ0QeKAXaT5jpbAZka8tLb7Mw1ylJeSbPZruKG4a91l5azqxPulZkI2lRz3KZnAyJ5ulAouN0Sp8Paa2OMBZRlnancK6HUn9dlVnKqQx4zLF7NIgwj1woPcKwfWHZjYJW0bpXGIQKbNOQJmuG5rnbDvWWhtWZibixeT6SvbEtOQ', TIMESTAMP '2020-10-17 15:14:46');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek1', '8', 'GanDa3ksQvD9k8qkq2XDMYWaNMKImPWJHyeQmMdxchrjZsfM0ui53ndZuJZuOkuJLtkUAA7XviMRqTjXpySdbfQ6a7VQtUdLR6jAgzvhPaUQJ1Rpm7rQFtaGUneb5qrKBTrl2bquMh6H55LhE7ve2XE6jto4KLLUAdPU0mWLVNOByO70my1OWZ7JS4QOTFa6qM0ZSWFG', TIMESTAMP '2004-8-20 1:1:1');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek9', '9', 'qZWQvB0dq5aG58AtfKD6OEBzBAeiadTXZxEbifDRySgbpz7USCq68F802DJrSZDp4xdgNxVZbbgf2pQ7xQZD1k6OmLWk9WeG6mtNNlhn9KPxnbVHllUPMrQo6aTjiYvdHZJZzkIHC9YJyMpYN1c2cN9zQnPwMhTx0Oejbnaz7BnrnWGeQhw6GiHhlFfgG6GOAkCTR3qH', TIMESTAMP '2004-6-18 7:50:17');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek3', '10', 'aDzPGJgm2F7pOH0o34OgJqfiHG54xXiVBw3xZlRhFuBWCoOaVlOzhf3UHMRShDkuFEmiZvbkaQrCXriSOehEihQUMfX3PJPAkQZHbgdq917o6aC28SKiUP8EUuXNzhfvXC1Q1BxsBi98Dv1FRea1Lvj7BBqAw7TTO8cmpQekAtWuCRhuApA1H7eWS1mPn7uXLiuY7X6w', TIMESTAMP '2007-11-12 11:46:23');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek4', '2', 'K9cPIplLtUrUukvez4ZbbKqxDuzA9Gsmhk9JMNRPnPI8iKFwX6vERlQmoyXhfMxWN6s0fJ4xDAsMG5x5WjuQ6uonBgVleB3B2A9TpXeMmStr2W7JTWFdCmkzNutWou3qGvgLaESIsKhEDxyvM5fjsj0MHcr2wJnQF7q5NcV5cYts5mkSAIw5Un7btZ7hwmU3Typt3kmR', TIMESTAMP '2024-6-25 2:4:33');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek5', '3', 'ZYeklAPG73Ojq5oMPyJWGNwLmwAizT3ZfkTCVDjkznkAZhc1DnCw1KIcuKjGLS3gnmz6KAoASiGT7R31dKHsiXtWvahkCgAszvVYFNyXvpbTDFJUPT6UAraiIpHS7Hg7UPAv7fiCHibPQNWFIpaT4Y6pTbOHhXH5eLgNgdND02C37ABAtsJBFfSs1jdQ136fum7V8Lfr', TIMESTAMP '2003-1-24 2:50:56');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek2', '4', 'LKd0nkJ10VDRYX314bg26GTsmrtXzZIQ8YqkmlBJ7jClnz0ckGyQUaCbg7ltTQWkagZvBx8uUIaGxa6sHQjFiJJVlycE3aKOrgVLTYNcbadLGbAnrRbnGkJf9vqF6oObdKofwkeuELSa1uGnwCuQTBCA3SxhBVbuaTc6DvQikBY7rhdNPxDMbY25eGqaSydcAZl8aUid', TIMESTAMP '2012-11-2 11:0:8');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek1', '1', 'xhCT3sxbkqBtUb3e2ueINnJBNjPYrTFtIGbPbodXeTIQAanTgxSh3xyTRRGFaIIDRSTc1WJJNzBJsSocpoYGIPTEYAg5NqB8gSuMnfmbcxudLx6015rOpRwoEETgN3pF5a0DdnaeodlSsTLTo3k5tNWsCroYo26kYcqTCLqqzClo0rdgqcr2v19ojdhIHdmWGft9UZRK', TIMESTAMP '2006-3-28 12:36:25');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek3', '4', 'it7oHjIFNnCoDznwMmKdY6rHjkMU7bZRyfqKYG6ccDJegkfixZ7INFQFTcBarzMDdOfkzjzsK8LYkrbNqcz96XM4Fqr0WHWcmdvnw56xMZfGSu0KZAG090KttXWN1ffLGHzg1xgHFfpJgeDpCfpbF9a2AQDqKmcfQvw4Yv3kZbhRUXwikQbqVEyjdYIk5Bxe0Dl2u0X8', TIMESTAMP '2015-8-2 1:36:9');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek4', '3', 'FdsgPM3s07tIfMT13RUyQ1qfSo4JbmocJ9kZTt3ILpeJH7L9EWOhKAywrPdiWH3SV3KKjdWnSWBRnwzW0F6C6UUl9wkG6BTESr7wM437vHRNf4F8JuoXOZYsu6wnUfqDuObFdadvshXVs1zX7BRUw8bgeUaGtxSHlieYhz6NhNGhTku0Wq2iVUBep5AGYSuXbkic1bRu', TIMESTAMP '2010-8-22 4:58:26');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek5', '5', 'c7m0iEu5LqPbebksZX0Kbl8xNNCEoQEHEr8WfwMyUCYulwhQdCgYETtWXjlnSxhkRsOcqMIroc18B8sgEokUyHJIeYpRKdFL95GxLvfLJx0GE1FfatQHBkHtI8bdLznaTV65tM59UeGkHXUxH4Ip659SOssSZi20P70whrJ4ofSw58Js1BAaKKI4CLeSLxIZ4OFlmuNU', TIMESTAMP '2012-5-6 10:44:3');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek1', '6', 'k56E49WMQYkF8PI7DI3pck8wASbSYLfBG3cHz206OR4jIblE7wMyGhOzyk0PkzXwQn2UZFFVn5G5u947muAhzK6itOWeaVAd1qxQM64cJk1eaFk7wd2y1aPz9OYwKGbXNwTp6EAYugttLXLz4FI39tseBxhvIRmdewDAIRJKlrPJ4O6wWSaxWFgGU5VflDwK0AJWXvkX', TIMESTAMP '2017-3-11 11:26:8');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek2', '7', '03MCaOxlqfdqtdkbRXe7NREwbZlwOm9ATzL1RbwV2W2Yo34IFYPeOOETUlz4roY1Ufch9kUPZGV9T30gA6yws33CQch5TglCUYUpwbC58x65DJIGNCkuUr1VAkB5pAuzmWKA8TMloNVE5QLTyoLFRpw2MNtiIAC7KtEbe5KCus55tIPP8OkFuxKBmst6y4dx0ye0YqMg', TIMESTAMP '2010-2-22 8:51:44');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek3', '8', 'owdOROrgbu2XSq1XIIWzZc6yoQEiqsACixU0vCsdcBZbYprS5qbwLoP42jxeZtuwNvrNX1mIHldQ6sBWAErf7UGDMlVhN4251wL9MDnd4Y5cu5Y5eRpn9acA1P6O8Wl5qTu3sU1qPfaph41gNJd0TXLp7fSUs3GCOZ3AVS9fRUsYSLEFcUzT1hcO8OaBLWUsnqb41J1w', TIMESTAMP '2017-11-13 22:21:24');
INSERT INTO "comment" ("author", "file_id", "comment_text", "createDate") VALUES ('tesztelek4', '9', 'NouRe5wFq4z2Mf81zz9RF2W3OvlXSjmsv1RByCcg7l5msY84WXnL0qbi6KHy9RftQHXVMomXQLEHYTqPtvqgkkre91HP6OwqkIfVjwGOwiLIuBIpZuxhRIoYz6GnbxeltrG61KO4n9b4FhQy1Saatd1q7dz6CMzeIBC1vNAki3ResvSbV48BeUdGd1MtFTfdCXQNOs6Q', TIMESTAMP '2014-2-6 22:53:20');

INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek0', '2');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek1', '3');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek2', '4');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek3', '5');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek4', '6');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek5', '7');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek6', '8');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek7', '9');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek8', '10');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek9', '1');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek0', '30');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek1', '29');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek2', '28');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek3', '27');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek4', '26');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek5', '25');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek6', '11');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek7', '12');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek8', '13');
INSERT INTO "foldershare" ("username", "folderid") VALUES ('tesztelek9', '14');

INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek0', '2');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek1', '4');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek2', '6');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek3', '7');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek4', '8');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek5', '3');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek6', '1');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek7', '2');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek8', '4');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek9', '6');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek0', '7');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek1', '5');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek2', '1');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek3', '6');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek4', '2');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek5', '4');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek6', '4');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek7', '3');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek8', '5');
INSERT INTO "fileshare" ("username", "fileid") VALUES ('tesztelek9', '2');

INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek0', '2');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek0', '3');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek0', '4');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek1', '6');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek1', '7');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek2', '4');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek2', '5');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek2', '6');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek2', '2');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek3', '3');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek3', '4');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek3', '5');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek4', '1');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek4', '2');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek5', '1');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek5', '2');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek5', '3');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek5', '4');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek6', '5');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek6', '6');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek6', '7');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek6', '8');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek6', '9');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek7', '2');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek7', '3');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek7', '6');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek7', '7');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek7', '8');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek8', '1');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek8', '2');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek9', '3');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek9', '4');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek9', '5');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek9', '6');
INSERT INTO "bookmark" ("username", "fileid") VALUES ('tesztelek9', '7');

INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek0', '3', '1');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek1', '4', '2');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek2', '5', '3');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek3', '6', '4');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek4', '7', '5');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek5', '8', '2');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek6', '9', '3');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek7', '10', '4');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek8', '1', '2');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek9', '2', '1');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek0', '4', '3');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek1', '5', '4');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek2', '6', '5');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek3', '7', '2');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek4', '8', '1');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek5', '9', '1');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek6', '10', '2');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek7', '6', '2');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek8', '5', '3');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek9', '3', '2');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek0', '5', '2');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek1', '6', '3');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek2', '7', '4');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek3', '8', '5');
INSERT INTO "rating" ("username", "fileid", "rate") VALUES ('tesztelek4', '9', '4');
