CREATE TABLE 'user' (
    'username' VARCHAR(100) NOT NULL,
    'email' VARCHAR(100) NOT NULL,
    'password' VARCHAR(256) NOT NULL,
    CONSTRAINT 'user_pk' PRIMARY KEY ('username') 
);

CREATE TABLE 'folder' (
    'id' INT GENERATED ALWAYS as IDENTITY,
    'name' VARCHAR(100) NOT NULL,
    'parent_id' INT,
    'owner' VARCHAR(100) NOT NULL,
    'visibility' VARCHAR(20) NOT NULL,
    'createDate' DATETIME NOT NULL,
    CONSTRAINT 'folder_pk' PRIMARY KEY ('id'),
    CONSTRAINT 'folder_parent_fk' FOREIGN KEY ('parent_id') REFERENCES 'folder' ('id') ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT 'folder_owner_fk' FOREIGN KEY ('owner') REFERENCES 'user' ('username') ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE 'file' (
    'id' INT GENERATED ALWAYS as IDENTITY,
    'parent_id' INT,
    'owner' VARCHAR(100) NOT NULL,
    'name' VARCHAR(100) NOT NULL,
    'visibility' VARCHAR(20) NOT NULL,
    'createDate' DATETIME NOT NULL,
    'filetype' VARCHAR(10), 
    CONSTRAINT 'file_pk' PRIMARY KEY ('id'),
    CONSTRAINT 'file_parent_fk' FOREIGN KEY ('parent_id') REFERENCES 'folder' ('id') ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT 'file_owner_fk' FOREIGN KEY ('owner') REFERENCES 'user' ('username') ON DELETE CASCADE
);

CREATE TABLE 'comment' (
    'id' INT GENERATED ALWAYS as IDENTITY,
    'author' VARCHAR(100) NOT NULL,
    'file_id' INT NOT NULL,
    'text' VARCHAR(1000) NOT NULL,
    'createDate' DATETIME NOT NULL,
    CONSTRAINT 'comment_pk' PRIMARY KEY ('id'),
    CONSTRAINT 'comment_author_fk' FOREIGN KEY ('author') REFERENCES 'user' ('username') ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT 'comment_file_fk' FOREIGN KEY ('file_id') REFERENCES 'file' ('id') ON DELETE CASCADE
);

CREATE TABLE 'foldershare' (
    'username' VARCHAR(100) NOT NULL,
    'folderid' INT NOT NULL,
    CONSTRAINT 'foldershare_pk' PRIMARY KEY ('username', 'folderid'),
    CONSTRAINT 'foldershare_username_fk' FOREIGN KEY ('username') REFERENCES 'user' ('username') ON DELETE CASCADE,
    CONSTRAINT 'foldershare_folderid_fk' FOREIGN KEY ('folderid') REFERENCES 'folder' ('id') ON DELETE CASCADE
);

CREATE TABLE 'fileshare' (
    'username' VARCHAR(100) NOT NULL,
    'fileid' INT NOT NULL,
    CONSTRAINT 'fileshare_pk' PRIMARY KEY ('username', 'fileid'),
    CONSTRAINT 'fileshare_username_fk' FOREIGN KEY ('username') REFERENCES 'user' ('username') ON DELETE CASCADE,
    CONSTRAINT 'fileshare_fileid_fk' FOREIGN KEY ('fileid') REFERENCES 'file' ('id') ON DELETE CASCADE
);

CREATE TABLE 'bookmark' (
    'username' VARCHAR(100) NOT NULL,
    'fileid' INT NOT NULL,
    CONSTRAINT 'bookmark_pk' PRIMARY KEY ('username', 'fileid'),
    CONSTRAINT 'bookmark_username_fk' FOREIGN KEY ('username') REFERENCES 'user' ('username') ON DELETE CASCADE,
    CONSTRAINT 'bookmark_fileid_fk' FOREIGN KEY ('fileid') REFERENCES 'file' ('id') ON DELETE CASCADE
);

CREATE TABLE 'rating' (
    'username' VARCHAR(100) NOT NULL,
    'fileid' INT NOT NULL,
    'rate' INT NOT NULL,
    CONSTRAINT 'rating_pk' PRIMARY KEY ('username', 'fileid'),
    CONSTRAINT 'rating_username_fk' FOREIGN KEY ('username') REFERENCES 'user' ('username') ON DELETE CASCADE,
    CONSTRAINT 'rating_fileid_fk' FOREIGN KEY ('fileid') REFERENCES 'file' ('id') ON DELETE CASCADE
);

