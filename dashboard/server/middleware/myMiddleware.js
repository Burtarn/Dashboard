function myMiddleware(req, res, next) {
    console.log('Middleware körs!');
    next(); 
}
module.exports = myMiddleware;
