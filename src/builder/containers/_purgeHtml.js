const htmlparser2 = require("htmlparser2-without-node-native");

const purgeHtml = (html) => {
  var collect = "";

  const parser = new htmlparser2.Parser(
    {
      //onopentag(name, attribs) {
      //
      //},
      ontext(text) {
        //
        collect += text;
      },
      //onclosetag(tagname) {
      //
      //}
    },
    { decodeEntities: true }
  );
  parser.write(html);
  parser.end();

  return collect;
};

export default purgeHtml;
