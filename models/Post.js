const db = require('../config/db'); 

class Post {
    constructor(title, body, created_at) {
        this.title = title;
        this.body = body;
        this.created_at = created_at;
    }

    save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();

        let createdAtDate = `${yyyy}-${mm}-${dd}`;

        let sql = `
        INSERT INTO posts(
            title,
            body,
            created_at
        )
        VALUES(
            '${this.title}',
            '${this.body}',
            '${createdAtDate}'
        )
        `;

        return db.execute(sql);
    }

    static findAll() {
        let sql = "SELECT * FROM posts;";

        return db.execute(sql);
    }

    static findById(id) {
        let sql = `SELECT * FROM posts WHERE id = ${id};`;

        return db.execute(sql);
    }

    static updateById(id, title, body, created_at) {
        let sql = `
            UPDATE posts
            SET title = ${title}, body = ${body}, created_at = ${created_at}
            WHERE id = ${id};
        `;

        return db.execute(sql);
    }
}

module.exports = Post;
