const { error } = require("console");
const express = require("express");
const app = express();
const PORT = 5000;
const pool = require("./db")

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello");
});

// ユーザー情報を全て取得する
app.get("/users", (req, res) => {

    pool.query("SELECT * FROM USERS", (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
    });
});

// 特定のユーザーを取得する
app.get("/users/:id", (req, res) => {

    const id = req.params.id;

    pool.query("SELECT * FROM USERS WHERE ID = $1", [id], (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
    });
});

// // ユーザーを追加する
app.post("/users", (req, res) => {
    const {name, email, age} = req.body;

    // ユーザーが既に存在するか確認
    pool.query("SELECT s FROM USERS s WHERE s.email = $1",
        [email],
        (error, results) => {
        if(results.rows.length) {
            return res.send("既にユーザーが存在しています");
        }

        pool.query("INSERT INTO USERS(name, email, age) VALUES($1, $2, $3)",
            [name, email, age,],
            (error, results) => {
            if(error) throw error;
            res.status(201).send("ユーザー作成に成功しました");
        });
        });
});

// //ユーザーを削除する(1)
// app.post("/users/delete", (req, res) => {

//     const {id} = req.body;

//     // // idを整数に変換
//     // id = parseInt(id, 10);
//     // console.log(id);

//     pool.query("SELECT s FROM USERS s WHERE s.id = $1",
//     [id],
//     (error, results) => {
//         // console.log(results.rows.length);
//         if(results.rows.length == false) {
//             return res.send(`id${id}のユーザーは存在しません`);
//         }

//         pool.query("DELETE FROM USERS WHERE ID = $1",
//         [id],
//         (error, results) => {

//             if(error) throw error;
//             res.status(201).send(`id${id}のデータを削除しました`);

//         });
//     });

// });

// //ユーザーを削除する(2)
app.delete("/users/:id", (req, res) => {

    const id = req.params.id;
    pool.query("SELECT s FROM USERS s WHERE s.id = $1",
    [id],
    (error, results) => {
        // console.log(results.rows.length);
        if(results.rows.length == false) {
            return res.send(`id${id}のユーザーは存在しません`);
        }

        pool.query("DELETE FROM USERS WHERE ID = $1",
        [id],
        (error, results) => {

            if(error) throw error;
            res.status(201).send(`id${id}のデータを削除しました`);

        });
    });
});

// ユーザー情報の更新
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

    // ユーザーが既に存在するか確認
    pool.query("SELECT s FROM USERS s WHERE s.id = $1",
        [id],
        (error, results) => {
        if(results.rows.length == false) {
            return res.send("ユーザーが存在しません");
        }

        pool.query("UPDATE USERS SET name = $1 WHERE id = $2",
            [name, id],
            (error, results) => {
            if(error) throw error;
            res.status(201).send("ユーザー更新に成功しました");
        });
        });
});

app.listen(PORT, () => {
    console.log("Hello");
});