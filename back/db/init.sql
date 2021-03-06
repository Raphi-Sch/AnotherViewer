CREATE DATABASE db;
USE db;

CREATE TABLE chat
(
    id         int(11)    NOT NULL,
    channel_id mediumtext NOT NULL,
    user_name  text       NOT NULL,
    datetime   datetime   NOT NULL,
    message    mediumtext NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

ALTER TABLE chat
    ADD PRIMARY KEY (`id`);

ALTER TABLE chat
    MODIFY id int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

CREATE TABLE channel (
    id varchar(255) NOT NULL,
    watch boolean not null
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

ALTER TABLE channel
    ADD PRIMARY KEY (id);

DROP TABLE streamer;
