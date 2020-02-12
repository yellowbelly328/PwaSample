var dbName = 'sampleDB';
var dbVersion = '1';
var storeName = 'counts';
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
    objectStore.createIndex("pic", "pic", { unique: false });

    console.log('db upgrade');
}

//onupgradeneededの後に実行。更新がない場合はこれだけ実行
openReq.onsuccess = function (event) {
    var db = event.target.result;
    var trans = db.transaction(storeName, 'readonly');
    var store = trans.objectStore(storeName);


    document.getElementById('pic1').addEventListener('change', function (e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var putReq = updatePicDb(db, storeName, 1, reader.result);
            putReq.onsuccess = function (event) {
                document.getElementById('preview1').src = URL.createObjectURL(new Blob([reader.result], { type: "image/jpeg" }));
                console.log('更新成功');
            }
            putReq.onerror = function (event) { console.log('更新失敗'); }
        }
        reader.readAsArrayBuffer(e.target.files[0]);
    });
    var getReq = store.get(1);
    getReq.onsuccess = function (event) {
        console.log('id:1' + '取得成功');
        if (typeof event.target.result !== 'undefined') {
            document.getElementById('preview1').src = URL.createObjectURL(new Blob([event.target.result.pic], { type: "image/jpeg" }));
        }
    }


    document.getElementById('pic2').addEventListener('change', function (e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var putReq = updatePicDb(db, storeName, 2, reader.result);
            putReq.onsuccess = function (event) {
                document.getElementById('preview2').src = URL.createObjectURL(new Blob([reader.result], { type: "image/jpeg" }));
                console.log('更新成功');
            }
            putReq.onerror = function (event) { console.log('更新失敗'); }
        }
        reader.readAsArrayBuffer(e.target.files[0]);
    });
    var getReq = store.get(2);
    getReq.onsuccess = function (event) {
        console.log('id:2' + '取得成功');
        if (typeof event.target.result !== 'undefined') {
            document.getElementById('preview2').src = URL.createObjectURL(new Blob([event.target.result.pic], { type: "image/jpeg" }));
        }
    }


    document.getElementById('pic3').addEventListener('change', function (e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var putReq = updatePicDb(db, storeName, 3, reader.result);
            putReq.onsuccess = function (event) {
                document.getElementById('preview3').src = URL.createObjectURL(new Blob([reader.result], { type: "image/jpeg" }));
                console.log('更新成功');
            }
            putReq.onerror = function (event) { console.log('更新失敗'); }
        }
        reader.readAsArrayBuffer(e.target.files[0]);
    });
    var getReq = store.get(3);
    getReq.onsuccess = function (event) {
        console.log('id:3' + '取得成功');
        if (typeof event.target.result !== 'undefined') {
            document.getElementById('preview3').src = URL.createObjectURL(new Blob([event.target.result.pic], { type: "image/jpeg" }));
        }
    }


    document.getElementById('pic4').addEventListener('change', function (e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var putReq = updatePicDb(db, storeName, 4, reader.result);
            putReq.onsuccess = function (event) {
                document.getElementById('preview4').src = URL.createObjectURL(new Blob([reader.result], { type: "image/jpeg" }));
                console.log('更新成功');
            }
            putReq.onerror = function (event) { console.log('更新失敗'); }
        }
        reader.readAsArrayBuffer(e.target.files[0]);
    });
    var getReq = store.get(4);
    getReq.onsuccess = function (event) {
        console.log('id:4' + '取得成功');
        if (typeof event.target.result !== 'undefined') {
            document.getElementById('preview4').src = URL.createObjectURL(new Blob([event.target.result.pic], { type: "image/jpeg" }));
        }
    }


    document.getElementById('pic5').addEventListener('change', function (e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var putReq = updatePicDb(db, storeName, 5, reader.result);
            putReq.onsuccess = function (event) {
                document.getElementById('preview5').src = URL.createObjectURL(new Blob([reader.result], { type: "image/jpeg" }));
                console.log('更新成功');
            }
            putReq.onerror = function (event) { console.log('更新失敗'); }
        }
        reader.readAsArrayBuffer(e.target.files[0]);
    });
    var getReq = store.get(5);
    getReq.onsuccess = function (event) {
        console.log('id:5' + '取得成功');
        if (typeof event.target.result !== 'undefined') {
            document.getElementById('preview5').src = URL.createObjectURL(new Blob([event.target.result.pic], { type: "image/jpeg" }));
        }
    }
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

function updatePicDb(db, store_name, id, pic) {
    var trans = db.transaction(store_name, "readwrite");
    var store = trans.objectStore(store_name);
    return store.put({
        id: id,
        pic: pic
    });
}