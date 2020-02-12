var dbName = 'sampleDB';
var dbVersion = '1';
var storeName = 'counts';
var text = "";
var piv = null;
//　DB名を指定して接続
var openReq = indexedDB.open(dbName, dbVersion);

// エラー時
openReq.onerror = function (event) {
    // 接続に失敗
    console.log('db open error');
}

//DBのバージョン更新(DBの新規作成も含む)時のみ実行
openReq.onupgradeneeded = function (event) {
    var db = event.target.result;
    const objectStore = db.createObjectStore(storeName, { keyPath: 'id' })
    objectStore.createIndex("id", "id", { unique: true });
    objectStore.createIndex("text", "text", { unique: false });
    objectStore.createIndex("pic", "pic", { unique: false });

    console.log('db upgrade');
}

//onupgradeneededの後に実行。更新がない場合はこれだけ実行
openReq.onsuccess = function (event) {
    var db = event.target.result;
    var trans = db.transaction(storeName, 'readonly');
    var store = trans.objectStore(storeName);
    var getReq = store.get(1);

    getReq.onerror = function (event) {
        text = 0;
        console.log('取得失敗');
    }
    getReq.onsuccess = function (event) {
        console.log('取得成功');
        if (typeof event.target.result === 'undefined') {
            text = "";
        } else {
            text = event.target.result.text;
            console.log(text);
        }
        document.getElementById('textDisplay').innerHTML = text;
    }

    document.getElementById('save').addEventListener('click', function () {
        text = document.getElementById('text1').value;
        pic = document.getElementById('pic').value;
        var putReq = updateDb(db, storeName, text);

        putReq.onsuccess = function (event) {
            console.log('更新成功');
            document.getElementById('textDisplay').innerHTML = text;
        }
        putReq.onerror = function (event) {
            console.log('更新失敗');
        }
    });

    document.getElementById('pic').addEventListener('change', function (e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview').src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    });
}

function updateDb(db, store_name, text, pic) {
    var trans = db.transaction(store_name, "readwrite");
    var store = trans.objectStore(store_name);
    return store.put({
        id: 1,
        text: text,
        pic: pic
    });
}