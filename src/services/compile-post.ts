// bboxed is too old to be TS compatible.
const bboxed = require('bboxed');

function compilePost(text: string): string {
    return bboxed(text.replace('<', '&lt').replace('>', '&gt;'));
}

export default compilePost;