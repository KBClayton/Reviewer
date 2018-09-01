module.exports = function(app, vault) {
    loggedin=function(app, vault){
        if(vault.read(req)){
            return true;
        }
    }
}