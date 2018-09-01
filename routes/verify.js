module.exports = function(app) {
    loggedin=function(app){
        if(vault.read(req)){
            return true;
        }
    }
}