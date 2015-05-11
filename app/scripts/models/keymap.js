var toml = require('toml');
var reqwest = require('reqwest');
var store = require('store');


class Keymap {
    constructor() {
        this.tomlKeymap = undefined;
        this.jsonKeymap = undefined;
        this.errors = [];
        this.name = undefined;
        this.desc = undefined;
    }
    
    fromTOML(tomlData) {
        this.tomlKeymap = tomlData;
        try {
            this.jsonKeymap = toml.parse(tomlData);
            this.errors = [];
        } catch (e) {
            this.errors.push(e);
        }
    }
    
    success() {
        return (this.jsonKeymap != undefined) && (this.errors.length == 0)
    }
    
    saveKeymapToStorage(key) {
        if (store.enabled) {
            store.save(key, this.jsonKeymap);
        } else {
            console.log("[Error] Local storage not enabled.  Unable to save keymap.");
        }
    }
    
    loadKeymapFromStorage(key) {
        if (store.enabled) {
            this.jsonKeymap = store.load(key);
        } else {
            console.log("[Error] Local storage not enabled.  Unable to load keymap.");
        }
    }
    
    loadKeymapFromURL(url, cb) {
        
        var updateKeymap = function(keymap) {
            this.jsonKeymap = keymap;
            this.errors = [];
            return this;
        }.bind(this);
        
        reqwest({
              url: url,
              type: 'json',
              contentType: 'application/json',
        }).then(function(resp) {
              console.log("resp", resp);
              var km = updateKeymap(resp);
              cb(km);
        });
    }
    
}

module.exports = Keymap;