import psycopg2

conn = psycopg2.connect("dbname=ProjectDB user=postgres password=123 host=localhost")
cursor = conn.cursor()

query = '''CREATE TABLE Users (
    UId INT NOT NULL,
    Nickname VARCHAR(20),
    Email VARCHAR(50) NOT NULL,
    Phone VARCHAR(20),
    First_name VARCHAR(30),
    Last_name VARCHAR(40),
    Login VARCHAR(30) NOT NULL,
    Password VARCHAR(70) NOT NULL,
    Avatar BYTEA,
    PRIMARY KEY (UId)
    );
CREATE TABLE Friends (
    Friend1 INT NOT NULL,
    Friend2 INT NOT NULL,
    Friends_status INT,
    Request_date TIMESTAMP,
    PRIMARY KEY (Friend1, Friend2)
);
CREATE TABLE Posts (
    Post_id INT NOT NULL,
    Post_owner INT,
    Text TEXT,
    Image1 BYTEA,
    Image2 BYTEA,
    Image3 BYTEA,
    Location Point,
    Likes INT NOT NULL,
    PRIMARY KEY (Post_id),
    FOREIGN KEY (Post_owner) REFERENCES Users(Uid)
);
CREATE TABLE Posts_comments (
    Comment_id INT NOT NULL,
    Post_id INT NOT NULL,
    Sender_UId INT,
    Text TEXT,
    PRIMARY KEY (Comment_id),
    FOREIGN KEY (Post_id) REFERENCES Posts(Post_id),
    FOREIGN KEY (Sender_UId) REFERENCES Users(UId)
)
    '''
cursor.execute(query)
conn.commit()
cursor.close()
conn.close()
