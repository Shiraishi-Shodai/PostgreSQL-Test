# pg

node.jsとPostgreSQLをつなぐインターフェース

## pgモジュールの使い方

1. モジュールのインポート

    const Pool = require('pg').Pool;

1. Poolのインスタンス化

    const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: '',
    port: 5432,
});

1. クエリの実行(クエリの実行にはコールバック関数を使う方法と、Promiseを使う方法がある。下記はコールバック関数を使用した例)

    const query = {
        text: "SELECT * FROM USERS WHERE ID = $1",
        values: [2],
    }
    pool.query(query, (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
    });

# 接続poolとは
データベースへの接続をプーリング（保持）して再利用する機能

## poolのメリット
* パフォーマンスを改善する
* リソースの使用を削減する
* 接続管理のオーバーヘッドを軽減する
* データ・アクセスの開発タスクを削減する

# その他必要な知識

## ミドルウェア
ミドルウェアとは、リクエストオブジェクトとレスポンスオブジェクトを受け取り、任意の処理を行う関数  

※ 頻繁に使うミドルウェア関数はサードパーティ関数として下記にまとまっている  
[サードパーティ一覧](https://expressjs.com/ja/resources/middleware.html)

## express.json()
Expressフレームワークの組み込みミドルウェア関数です。JSON形式のデータをリクエストから取得し、オブジェクトとして処理できるようにします。

express.json()をルーティングハンドラの前に記述することで、そのハンドラに渡されるリクエストのボディデータがJSON形式で解析されます。解析されたデータは、req.bodyオブジェクトに格納されます。

## httpステータスコード
HTTPレスポンスに含まれるwebサーバーの処理結果を表す3桁の数字(201番はPOSTリクエスト成功時に利用される)  
[詳しくはこちら](https://digiful.irep.co.jp/blog/76975541525#:~:text=HTTP%E3%82%B9%E3%83%86%E3%83%BC%E3%82%BF%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89%E3%81%A8%E3%81%AF%E3%80%81HTTP%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B9%E3%81%AB%E5%90%AB%E3%81%BE%E3%82%8C%E3%82%8B,%E3%81%AE%E3%81%93%E3%81%A8%E3%82%92%E6%8C%87%E3%81%97%E3%81%BE%E3%81%99%E3%80%82&text=3%E6%A1%81%E3%81%AE%E6%95%B0%E5%AD%97%E3%81%AF,%E6%84%8F%E5%91%B3%E3%82%92%E6%8C%81%E3%81%A3%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%80%82)

## !マークの意味

## !マーク2つ

真値の状態を確認できる  

let a = 100;
console.log(!!a); //true

## 暗黙的なfalse

0や空文字、null, undefinedは暗黙的にfalseとして利用できる

let a = 0;
console.log(!!a); //false


## HTTPメソッド
### PUTメソッド
データを追加、更新する際に利用される。リソースを追加するメソッドには「POSTメソッド」も存在するが、同じデータを何度もPOSTすると同じデータが何度も追加されるのに対し、PUTでは既存のデータが更新（上書き）される。

### DELETEメソッド
データの削除時に使うリクエスト

### PATCHメソッド
データを更新する場合にのみ、利用する。PUTとの違いは新規作成が可能かどうか。更新対象のデータが確実に存在する場合はPATCHを使うと良い
