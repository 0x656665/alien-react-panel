export function try_eval(command) {
    //console.log("Called: " + command);
    eval('try {' + command + '} catch (err) {  } ');
}